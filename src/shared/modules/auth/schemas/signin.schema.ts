import { z } from 'zod';

export const signinSchema = z.object({
	name: z.string().min(3).max(24),
	password: z.string().min(8).max(255)
});

export type SigninSchema = typeof signinSchema;

export type SigninInput = z.infer<SigninSchema>;
