"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { formSchema, FormType } from "@/schemas/patientForm.schemas";
import { Form, FormControl } from "@/components/ui/form";
import { ReusableFormField } from "@/components/ReusableFormField";
import { SubmitButton } from "./SubmitButton";
import { createUser } from "@/database/actions/patient.actions";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "./ui/label";
import { SelectItem } from "./ui/select";
import { FileUploader } from "./FileUploader";

interface Props {
  user: User;
}

export const RegisterForm = ({ user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: new Date(Date.now()),
      gender: "Male" as Gender,
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    },
  });

  const onSubmit = async ({ name, email, phone }: FormType) => {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className={"space-y-4"}>
          <h1 className={"header"}>Welcome!</h1>
          <p className={"text-dark-700"}>Tell us more about yourself.</p>
        </section>
        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Personal Information</h2>
          </div>
        </section>
        <ReusableFormField
          control={form.control}
          fieldType={"input"}
          name={"name"}
          label={"Full name"}
          placeholder={"John Smith"}
          iconSrc={"/assets/icons/user.svg"}
          iconAlt={"user"}
          value={user.name}
        />
        <div className={"flex flex-col gap-6 xl:grid xl:grid-cols-2"}>
          <ReusableFormField
            control={form.control}
            fieldType={"input"}
            name={"email"}
            label={"Email address"}
            placeholder={"johnsmith@gmail.com"}
            iconSrc={"/assets/icons/email.svg"}
            iconAlt={"email"}
            value={user.email}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"phoneInput"}
            name={"phone"}
            label={"Phone number"}
            placeholder={"07123456789"}
            iconSrc={"/assets/icons/email.svg"}
            iconAlt={"phone"}
            value={user.phone}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <ReusableFormField
            control={form.control}
            fieldType={"datePicker"}
            name={"birthDate"}
            label={"Date of Birth"}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"skeleton"}
            name={"gender"}
            label={"Gender"}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className={"flex h-11 gap-6 xl:justify-between"}
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className={"radio-group"}>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className={"cursor-pointer"}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:grid xl:grid-cols-2"}>
          <ReusableFormField
            control={form.control}
            fieldType={"input"}
            name={"address"}
            label={"Address"}
            placeholder={"123 Random Avenue, Throckley"}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"input"}
            name={"occupation"}
            label={"Occupation"}
            placeholder={"Software Engineer"}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:grid xl:grid-cols-2"}>
          <ReusableFormField
            control={form.control}
            fieldType={"input"}
            name={"emergencyContactName"}
            label={"Emergency contact name"}
            placeholder={"Theodore Waterhouse"}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"phoneInput"}
            name={"emergencyContactNumber"}
            label={"Emergency contact number"}
            placeholder={"07987654321"}
          />
        </div>
        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Medical Information</h2>
          </div>
        </section>
        <ReusableFormField
          control={form.control}
          fieldType={"select"}
          name={"primaryPhysician"}
          label={"Primary Physician"}
          placeholder={"Select a physician"}
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className={"flex cursor-pointer items-center gap-2"}>
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className={"rounded-full border border-dark-500"}
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </ReusableFormField>
        <div className={"flex flex-col gap-6 xl:grid xl:grid-cols-2"}>
          <ReusableFormField
            control={form.control}
            fieldType={"input"}
            name={"insuranceProvider"}
            label={"Insirance provider"}
            placeholder={"BlueCross BlueShield"}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"input"}
            name={"insurancePolicyNumber"}
            label={"Insurance policy number"}
            placeholder={"ABC87654321"}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:grid xl:grid-cols-2"}>
          <ReusableFormField
            control={form.control}
            fieldType={"textarea"}
            name={"allergies"}
            label={"Allergies (if any)"}
            placeholder={"Peanuts, pollen"}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"textarea"}
            name={"currentMedication"}
            label={"Current medication (if any)"}
            placeholder={"Paracetamol 500mg"}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:grid xl:grid-cols-2"}>
          <ReusableFormField
            control={form.control}
            fieldType={"textarea"}
            name={"familyMedicalHistory"}
            label={"Family medical history"}
            placeholder={"Mother had brain cancer, father had heart disease"}
          />
          <ReusableFormField
            control={form.control}
            fieldType={"textarea"}
            name={"pastMedicalHistory"}
            label={"Past medical history"}
            placeholder={"Appendectomy, Tonsillectomy"}
          />
        </div>
        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Identification & Verification</h2>
          </div>
        </section>
        <ReusableFormField
          control={form.control}
          fieldType={"select"}
          name={"identificationType"}
          label={"Identification type"}
          placeholder={"Select identification type"}
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </ReusableFormField>
        <ReusableFormField
          control={form.control}
          fieldType={"input"}
          name={"identificationNumber"}
          label={"Identification number"}
          placeholder={"987654321"}
        />
        <ReusableFormField
          control={form.control}
          fieldType={"skeleton"}
          name={"identificationDocument"}
          label={"Scanned copy of Identification document"}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value as File[] | undefined}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />
        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Consent & Privacy</h2>
          </div>
        </section>
        <ReusableFormField
          control={form.control}
          fieldType={"checkbox"}
          name={"treatmentConsent"}
          label={"I consent to treatment"}
        />
        <ReusableFormField
          control={form.control}
          fieldType={"checkbox"}
          name={"disclosureConsent"}
          label={"I consent to disclosure of information"}
        />
        <ReusableFormField
          control={form.control}
          fieldType={"checkbox"}
          name={"privacyConsent"}
          label={"I agree with the privacy policy"}
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
