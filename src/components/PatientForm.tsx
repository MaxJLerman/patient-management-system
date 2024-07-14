"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, FormType } from "@/schemas/patientForm.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/ReusableFormField";

export const PatientForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: FormType) => {
    console.log(values);
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
          name={""}
          label={""}
          placeholder={""}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
