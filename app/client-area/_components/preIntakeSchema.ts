import { z } from "zod";

export const preIntakeSchema = z.discriminatedUnion("preferredContact", [
  z.object({
    fullName: z.string().min(1, "Full name is required"),
    preferredContact: z.literal("email"),
    emailAddress: z.email("Enter a valid email address"),
  }),
  z.object({
    fullName: z.string().min(1, "Full name is required"),
    preferredContact: z.literal("phone"),
    phoneNumber: z.string().min(7, "Enter a valid phone number"),
  }),
]);

export type PreIntakeData = z.infer<typeof preIntakeSchema>;
