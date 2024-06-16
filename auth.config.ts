import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';

// MongoDB User schema
const userSchema = new mongoose.Schema({
  authType: String,
  name: String,
  email: String,
  password: String,
  image: String
});

const User = mongoose?.models?.User || mongoose.model('User', userSchema);

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI as string, {});
};

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      async profile(profile) {
        await connectToDatabase();

        const users = await User.find({});

        let user = await User.findOne({ email: profile.email });
        if (!user) {
          if (users.length >= 20) {
            throw new Error(
              'You cannot signup at this time. Please try again later.'
            );
          }
          user = new User({
            image: profile.avatar_url,
            name: profile.name,
            email: profile.email,
            password: '',
            authType: 'github'
          });
          await user.save();
        }

        return {
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const user = {
          id: '1',
          name: 'John',
          email: credentials?.email as string
        };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/' // Sign-in page
  }
} satisfies NextAuthConfig;

export default authConfig;
