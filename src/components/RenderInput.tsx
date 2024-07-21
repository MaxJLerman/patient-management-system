import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { FieldType } from "@/types/FieldType.type";
import { FormType } from "@/schemas/patientForm.schema";
import { FormControl } from "./ui/form";
import { Input } from "./ui/input";

import "react-phone-number-input/style.css";

interface Props {
  field: ControllerRenderProps<FormType>;
  fieldType: FieldType;
  iconSrc?: string;
  iconAlt?: string;
  placeholder?: string;
}

export const RenderField = ({
  field,
  fieldType,
  iconSrc,
  iconAlt,
  placeholder,
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
            />
          </FormControl>
        </div>
      );

    case "phoneInput":
      return (
        <FormControl>
          <PhoneInput
            defaultCountry={"GB"}
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className={"input-phone"}
          />
        </FormControl>
      );
  }
};
