import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(6, "Password must be alteast 6 digits/characters"),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ProfileSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Name should be atleast 3 charactters"),
  gender: z.string({ message: "gender is required" }),
  phoneNumber: z
    .string({ message: "Contact Number is required" })
    .min(10, "Number should be of 10 digits"),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    )
    .optional()
    .nullable(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

export const RegisterBusinessSchema = z.object({
  businessName: z
    .string({ message: "Business Name is required" })
    .min(2, "Please Input a valid businessName"),
  businessAddress: z
    .string({ message: "Address is required" })
    .min(5, "Input proper address"),
  contactNumber: z
    .string({ message: "ContactNumber is required" })
    .min(10, "Invalid"),
  email: z.string({ message: "email is required " }).min(1, "Invalid Email"),
  registrationNumber: z
    .string({ message: "Registration Number is mendatory" })
    .min(1, "Required"),
});
export const getUserByIdSchema = z.object({
  userId: z.string().min(1, "Please Enter Your ID"),
});
export type BusinessRegistrationType = z.infer<typeof RegisterBusinessSchema>;
