import React from 'react';
import LoginForm from '@/components/custom/Signin';
import { getServerSession } from 'next-auth/next';

import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';

export default async function Signin() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return <LoginForm />;
}
