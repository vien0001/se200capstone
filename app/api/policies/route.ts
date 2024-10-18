import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  const newCustomer = await prisma.customer.create({
    data: {
      nric: body.nric,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      ...(body.policies ? { policies: { connect: body.policies } } : {}),
    },
  });

  return NextResponse.json(newCustomer);
}
