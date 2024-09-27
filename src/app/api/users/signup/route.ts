import prisma from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exist",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      return NextResponse.json(
        {
          message: "User created successfully",
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "User not created",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
