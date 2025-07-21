import { z } from "zod";

// email: "",
// password: "",
// firstName: "",
// lastName: "",
// age: 1,
// phoneNumber: "",
// birthday: "",

export const validationFormRegister = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .pipe(z.email({ message: "Invalid email address" })),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number().min(1, "Age must be at least 1"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  birthday:  z.date().min(new Date("1900-01-01"), "Birthday must be at least 1900-01-01"),
});

export type FormRegisterType = z.infer<typeof validationFormRegister>;
