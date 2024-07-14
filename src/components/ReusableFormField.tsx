import { Control } from "react-hook-form";

import { FormType } from "@/schemas/patientForm.schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  control: Control<FormType>;
  fieldType: "input" | "";
  name: string;
  label: string;
  placeholder: string;
  iconSrc?: string;
  description?: string;
  errorMessage?: string; //? might not need
}

export const ReusableFormField = ({
  control,
  fieldType,
  name,
  label,
  placeholder,
  iconSrc,
  description,
  errorMessage,
}: Props) => {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
