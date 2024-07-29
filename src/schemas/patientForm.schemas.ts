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
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Must select a gender option.",
  }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." })
    .max(150, { message: "Address cannot exceed 150 characters." }),
  occupation: z
    .string()
    .min(5, { message: "Occupation must be at least 5 characters." })
    .max(100, { message: "Occupation cannot exceed 100 characters." }),
  emergencyContactName: z
    .string()
    .min(5, {
      message: "Emergency contact name must be at least 5 characters.",
    })
    .max(50, {
      message: "Emergency contact name cannot exceed 50 characters.",
    }),
  emergencyContactNumber: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid emergency contact number",
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor."),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters.")
    .max(50, "Insurance name cannot exceed 50 characters."),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters.")
    .max(50, "Policy number cannot exceed 50 characters."),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed.",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed.",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed.",
    }),
});

export type FormType = z.infer<typeof formSchema>;

export const reducedFormSchema = z.object({
  name: formSchema.shape.name,
  email: formSchema.shape.email,
  phone: formSchema.shape.phone,
});

export type PickFormType = Pick<FormType, "name" | "email" | "phone">;
