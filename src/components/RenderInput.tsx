import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { CheckedState } from "@radix-ui/react-checkbox";

import { FieldType } from "@/types/FieldType.type";
import { FormType } from "@/schemas/patientForm.schemas";
import { FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  field: ControllerRenderProps<FormType>;
  fieldType: FieldType;
  iconSrc?: string;
  iconAlt?: string;
  value?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<FormType>) => React.ReactNode;
}

export const RenderField = ({
  field,
  fieldType,
  iconSrc,
  iconAlt,
  value,
  name,
  label,
  placeholder,
  disabled,
  dateFormat,
  showTimeSelect,
  children,
  renderSkeleton,
}: Props) => {
  switch (fieldType) {
    case "input":
      return (
        <div className={"flex rounded-md border border-dark-500 bg-dark-400"}>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className={"ml-2"}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={"shad-input border-0"}
              value={value}
            />
          </FormControl>
        </div>
      );

    case "textarea":
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            value={field.value as string}
            className={"shad-textArea"}
            disabled={disabled}
          />
        </FormControl>
      );

    case "phoneInput":
      return (
        <FormControl>
          <PhoneInput
            defaultCountry={"GB"}
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={value ?? (field.value as string)}
            onChange={field.onChange}
            className={"input-phone"}
          />
        </FormControl>
      );

    case "datePicker":
      return (
        <div className={"flex rounded-md border border-dark-500 bg-dark-400"}>
          <Image
            src={"/assets/icons/calendar.svg"}
            height={24}
            width={24}
            alt={"calendar"}
            className={"ml-2"}
          />
          <FormControl>
            <DatePicker
              selected={field.value as Date}
              onChange={(date) => field.onChange(date)}
              wrapperClassName={"date-picker"}
            />
          </FormControl>
        </div>
      );

    case "select":
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value as string}
          >
            <FormControl>
              <SelectTrigger className={"shad-select-trigger"}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={"shad-select-content"}>
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case "skeleton":
      return renderSkeleton ? renderSkeleton(field) : null;

    case "checkbox":
      return (
        <FormControl>
          <div className={"flex items-center gap-4"}>
            <Checkbox
              id={name}
              checked={field.value as CheckedState}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className={"checkbox-label"}>
              {label}
            </label>
          </div>
        </FormControl>
      );

    default:
      break;
  }
};
