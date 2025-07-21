import { z } from "zod";

export const validationFormLogin = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .pipe(z.email({ message: "Invalid email address" })),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type FormLoginType = z.infer<typeof validationFormLogin>;
