import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '@/models/user';
import { connectToDatabase } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

const sendEmail = async (email: string, password: string) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'iCloud',
      auth: {
        user: 'ranjhaniharshal@icloud.com',
        pass: process.env.APP_PASSWORD
      }
    });

    let mailDetails = {
      from: 'noreply@harshalranjhani.in',
      to: email,
      subject: `Hey there! Welcome to Athena - Yug Foundation!`,
      text: `
              Hi there!
              Your password is: ${password}
              Please note that this password cannot be changed. Please keep it safe.
              Continue to login at https://web-dashboard-athena-hr64.vercel.app/signin
            `
    };

    const info = await mailTransporter.sendMail(mailDetails);
    console.log('Email sent: ' + info.response);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export async function POST(req: any) {
  const { email } = await req.json();
  try {
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({ email, authType: 'credentials' });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists', success: false },
        { status: 400 }
      );
    }

    const password = Math.random().toString(36).slice(-8);

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      email,
      name: email,
      image: '',
      password: hashedPassword,
      authType: 'credentials'
    });

    await newUser.save();

    await sendEmail(email, password);

    return NextResponse.json(
      { message: 'Check your email for more details!', success: true },
      { status: 200 }
    );
  } catch (e: any) {
    // delete user if email sending fails
    await User.deleteOne({ email });
    return NextResponse.json(
      { error: e.message, success: false },
      { status: 500 }
    );
  }
}
