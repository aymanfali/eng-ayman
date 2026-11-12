import { z } from "zod";

export function createContactFormSchema(messages: {
  nameMin: string;
  nameMax: string;
  emailInvalid: string;
  messageMin: string;
  messageMax: string;
}) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin).max(100, messages.nameMax),
    email: z.string().trim().email(messages.emailInvalid),
    message: z.string().trim().min(10, messages.messageMin).max(2000, messages.messageMax),
  });
}

export const contactFormSchema = createContactFormSchema({
  nameMin: "Name must be at least 2 characters",
  nameMax: "Name must be 100 characters or fewer",
  emailInvalid: "Enter a valid email address.",
  messageMin: "Message must be at least 10 characters",
  messageMax: "Message must be 2000 characters or fewer",
});

export const loginFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const registrationFormSchema = loginFormSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
});
