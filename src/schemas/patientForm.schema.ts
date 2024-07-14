import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(50, { message: "Username cannot exceed 50 characters." }),
});
export type FormType = z.infer<typeof formSchema>;
