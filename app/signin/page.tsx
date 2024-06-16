'use client';
import React, { useState } from 'react';
import GithubSignInButton from '@/components/github-auth-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result?.error) {
      // Handle error
      toast({
        duration: 2000,
        title: 'Trouble signing in',
        description: result.error,
        variant: 'destructive'
      });
    } else {
      // Handle success (e.g., redirect to a different page)
      toast({
        duration: 2000,
        title: 'Signed in',
        description: 'You have been signed in successfully',
      });
    }
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSignIn}>
            Sign in
          </Button>
          <Link href="/signup" className="m-3 w-full">
            <Button variant="outline" className="w-full">
              Create an Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <div className="relative m-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="">
        <GithubSignInButton />
      </div>
    </div>
  );
}
