'use client';

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Google from '@/components/icons/google';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SignupSchema } from '@/lib/validations/auth-schemas';
import { authClient } from '@/lib/auth/auth-client';

type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: true,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const toastId = toast('Signing up...', {
      description: 'Please wait while we sign you up.',
    });

    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          reset();

          toast.success('Sign up successful!', {
            description: 'You have successfully signed up.',
          });

          router.push('/dashboard');
          toast.dismiss(toastId);
        },
        onError(context) {
          toast.error('Sign up failed.', {
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
            <h1 className="mt-6 text-2xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Start scheduling your cron jobs in minutes</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name')} placeholder="John Doe" className="bg-background" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} placeholder="johndoe@example.com" className="bg-background" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  autoComplete="new-password"
                  placeholder="password"
                  className="bg-background"
                />
                {!errors.password && (
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters and include a number and a special character</p>
                )}
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-primary underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                )}
              />
              {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>

            <Button variant="outline" className="w-full" onClick={() => toast('Google sign in coming soon!')} disabled={isSubmitting}>
              <Google className="mr-2" /> Sign in with Google'
            </Button>

            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
