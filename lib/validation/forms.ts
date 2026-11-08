import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export const loginFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const registrationFormSchema = loginFormSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
});
