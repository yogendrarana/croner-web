'use client';

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Google from '@/components/icons/google';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { SigninSchema } from '@/lib/validations/auth-schemas';
import { authClient } from '@/lib/auth/auth-client';

type SigninFormValues = z.infer<typeof SigninSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    const toastId = toast('Signing in...', {
      description: 'Please wait while we sign you in.',
    });

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          reset();

          toast.success('Sign in successful!', {
            description: 'You have successfully signed in.',
          });

          router.push('/dashboard');
          toast.dismiss(toastId);
        },
        onError(context) {
          toast.error('Sign in failed.', {
            description: context.error.message,
          });

          toast.dismiss(toastId);
        },
      },
    );
  };

  return (
    <Container className="bg-muted/50">
      <div className="h-screen relative flex justify-center items-center">
        <div className="flex justify-start py-4 absolute top-0 left-0">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="mt-6 text-2xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="bg-background"
                  {...register('email')}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/reset-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="password"
                  className="bg-background"
                  required
                  {...register('password')}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <Button variant="outline" className="w-full" onClick={() => toast('Google sign in coming soon!')} disabled={isSubmitting}>
              <Google className="mr-2" /> Sign in with Google'
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
