import { Control, ControllerRenderProps } from "react-hook-form";

import { FormType } from "@/schemas/patientForm.schema";
import { FieldType } from "@/types/FieldType.type";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RenderField } from "./RenderInput";

interface Props {
  control: Control<FormType>;
  fieldType: FieldType;
  name: keyof FormType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  value?: string;
  description?: string; //? might not need
  errorMessage?: string; //? might not need
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<FormType>) => React.ReactNode;
}

export const ReusableFormField = ({
  control,
  fieldType,
  name,
  label,
  placeholder,
  iconSrc,
  iconAlt,
  value,
  description,
  errorMessage,
  disabled,
  dateFormat,
  showTimeSelect,
  children,
  renderSkeleton,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"flex-1"}>
          {fieldType !== "checkbox" && label && <FormLabel>{label}</FormLabel>}
          <RenderField
            field={field}
            fieldType={fieldType}
            iconSrc={iconSrc}
            iconAlt={iconAlt}
            value={value}
            name={name}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            dateFormat={dateFormat}
            showTimeSelect={showTimeSelect}
            renderSkeleton={renderSkeleton}
          >
            {children}
          </RenderField>
          <FormDescription>{description}</FormDescription>
          <FormMessage className={"shad-errore"} />
        </FormItem>
      )}
    />
  );
};
