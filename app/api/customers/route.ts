import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newCustomer = await prisma.customer.create({
      data: {
        nric: body.nric,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error("Error adding customer:", error);
    return NextResponse.json(
      { error: "Failed to add customer" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        policies: true,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
