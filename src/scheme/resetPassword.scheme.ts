// scheme/resetPassword.scheme.ts
import * as z from "zod";

export const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const verifySchema = z.object({
  resetCode: z.string().min(3, "Reset code is too short"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Not valid Password'),
    confirmPassword: z.string(),
  })
  .refine((val) => val.newPassword === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotForm = z.infer<typeof forgotSchema>;
export type VerifyForm = z.infer<typeof verifySchema>;
export type ResetForm = z.infer<typeof resetPasswordSchema>;
