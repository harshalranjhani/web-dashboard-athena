import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { User } from './models/user';
import { connectToDatabase } from './lib/mongodb';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      async profile(profile) {
        await connectToDatabase();

        const user = await User.findOne({ email: profile.email });
        if (!user) {
          const users = await User.find({});
          // const existingUser = await User.findOne({ email: profile.email, authType: 'credentials'});

          // if(existingUser) {
          //   throw new Error('User already exists with the same email. Please try logging in.');
          // }

          if (users.length >= 20) {
            throw new Error(
              'You cannot signup at this time. Please try again later.'
            );
          }
          const newUser = new User({
            image: profile.avatar_url,
            name: profile.name,
            email: profile.email,
            password: '',
            authType: 'github'
          });
          await newUser.save();
        }

        return {
          id: user?._id.toString(),
          name: user?.name,
          email: user?.email,
          image: user?.image
        };
      }
    }),
    CredentialProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        try {
          await connectToDatabase();
          const user = await User.findOne({
            email: credentials.email as string,
            authType: 'credentials'
          });

          if (user) {
            const isValid = bcrypt.compareSync(
              credentials.password as string,
              user.password
            );
            if (isValid) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                image: user.image
              };
            } else {
              throw new Error('Check your email and password and try again.');
            }
          } else {
            throw new Error('No user found with the provided credentials.');
          }
        } catch (error: any) {
          console.error('Authorization error: ', error);
          throw new Error(
            error.message || 'Authentication failed. Please try again.'
          );
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  }
} satisfies NextAuthConfig;

export default authConfig;
