'use server';

import { z } from 'zod';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { SigninSchema, SignupSchema } from '@/lib/validations/auth-schemas';

export const signUpEmail = async (data: z.infer<typeof SignupSchema>) => {
  await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

  redirect('/profile');
};

export const signInEmail = async ({ email, password }: z.infer<typeof SigninSchema>) => {
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect('/profile');
};

export const session = await auth.api.getSession({
  headers: await headers(),
});
