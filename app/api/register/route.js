import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '@/models/user';
import { connectToDatabase } from '@/lib/mongodb';
import { getPasswordHTML } from '@/utils/mails/password';

const sendEmail = async (email, password) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'iCloud',
      auth: {
        user: 'ranjhaniharshal@icloud.com',
        pass: process.env.APP_PASSWORD
      }
    });

    let mailDetails = {
      from: 'Athena<noreply@harshalranjhani.in>',
      to: email,
      subject: `Hey there! Welcome to Athena - Yug Foundation!`,
      html: getPasswordHTML(password)
    };

    const info = await mailTransporter.sendMail(mailDetails);
    console.log('Email sent: ' + info.response);
  } catch (e) {
    throw new Error(e.message);
  }
};

export async function POST(req) {
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
  } catch (e) {
    // delete user if email sending fails
    console.error(e);
    await User.deleteOne({ email });
    return NextResponse.json(
      { error: e.message, success: false },
      { status: 500 }
    );
  }
}
