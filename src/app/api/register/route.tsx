import prisma from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

// New format for route configuration
export const segmentConfig = {
  runtime: 'nodejs', // Can also be 'edge' if you're using edge functions
  api: {
    bodyParser: false, // Disable Next.js bodyParser since we are using formData
  },
};

export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { message: "You must be logged in." },
    //     { status: 401 },
    //   );
    // }

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
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
