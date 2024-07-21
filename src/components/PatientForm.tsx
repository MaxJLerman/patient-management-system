"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema, FormType } from "@/schemas/patientForm.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/ReusableFormField";
import { SubmitButton } from "./SubmitButton";

export const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({ name, email, phone }: FormType) => {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className={"mb-12 space-y-4"}>
          <h1 className={"header"}>Hi there!</h1>
          <p className={"text-dark-700"}>Schedule your first appointment.</p>
        </section>
        <ReusableFormField
          control={form.control}
          fieldType={"input"}
          name={"name"}
          label={"Full name"}
          placeholder={"John Smith"}
          iconSrc={"/assets/icons/user.svg"}
          iconAlt={"user"}
        />
        <ReusableFormField
          control={form.control}
          fieldType={"input"}
          name={"email"}
          label={"Email address"}
          placeholder={"johnsmith@gmail.com"}
          iconSrc={"/assets/icons/email.svg"}
          iconAlt={"email"}
        />
        <ReusableFormField
          control={form.control}
          fieldType={"phoneInput"}
          name={"phone"}
          label={"Phone number"}
          placeholder={"07123456789"}
          iconSrc={"/assets/icons/email.svg"}
          iconAlt={"email"}
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
