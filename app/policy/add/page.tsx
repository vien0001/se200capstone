"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  policyNumber: z.string().min(1, "Policy number is required."),
  name: z.string().min(1, "Policy name is required."),
  basePrice: z.string().min(1, "Price is required."),
  typeOfPolicy: z.string().min(1, "Type of policy is required."),
});

export default function AddPolicyPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const response = await fetch("/api/policies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/policy");
    } else {
      alert("Failed to add policy.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Policy</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label>Policy Number</label>
            <input
              type="text"
              {...register("policyNumber")}
              className="w-full p-2 border rounded"
            />
            {errors.policyNumber && <p>{errors.policyNumber.message}</p>}
          </div>

          <div>
            <label>Policy Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label>Price (SGD)</label>
            <input
              type="text"
              {...register("basePrice")}
              className="w-full p-2 border rounded"
            />
            {errors.basePrice && <p>{errors.basePrice.message}</p>}
          </div>

          <div>
            <label>Policy Type</label>
            <select
              {...register("typeOfPolicy")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Travel Insurance">Travel Insurance</option>
              <option value="Home Insurance">Home Insurance</option>
              <option value="Business Insurance">Business Insurance</option>
              <option value="Car Insurance">Car Insurance</option>
              <option value="Personal Accident">Personal Accident</option>
              <option value="Critical Illness">Critical Illness</option>
              <option value="Life Insurance">Life Insurance</option>
            </select>
            {errors.typeOfPolicy && <p>{errors.typeOfPolicy.message}</p>}
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
