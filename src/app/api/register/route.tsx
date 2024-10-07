import prisma from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    console.log("formdata", formData);

    // Parsing formData and converting registration number to an integer
    const reg_no = formData.get("registrationNumber") as string;
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const contactNumber = formData.get("institueContactNumber") as string; // This should match the model
    const insEmail = formData.get("institueEmail") as string;

    console.log({
      reg_no,
      name,
      address,
      contactNumber,
      insEmail,
    });

    const InstitueData = await prisma.institute.create({
      data: {
        reg_no: reg_no,
        name: name,
        address: address,
        contactNumber: contactNumber, // Make sure this matches the Prisma model
        insEmail: insEmail,
      },
    });

    console.log("registered Institute", InstitueData);

    return NextResponse.json(
      {
        message: "Institute Registered successfully",
        user: InstitueData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

