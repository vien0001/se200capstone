"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  nric: z.string().min(1, "NRIC is required."),
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
});

export default function AddCustomerPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/customers");
    } else {
      alert("Failed to add customer.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Customer</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label>NRIC</label>
            <input
              type="text"
              {...register("nric")}
              className="w-full p-2 border rounded"
            />
            {errors.nric && <p>{errors.nric.message}</p>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="text"
              {...register("email")}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label>First Name</label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full p-2 border rounded"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full p-2 border rounded"
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
