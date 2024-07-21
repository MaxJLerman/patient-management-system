import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid phpone number",
    ),
});
export type FormType = z.infer<typeof formSchema>;
