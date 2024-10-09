import { v2 as cloudinary } from "cloudinary";
import prisma from "@/src/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { NextResponse, NextRequest } from "next/server";
import { ProfileSchema } from "@/src/lib/validators/auth.validator";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js bodyParser since we are using formData
  },
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 },
      );
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    const name = formData.get("name") as string;
    const gender = formData.get("gender") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    const validateData = ProfileSchema.safeParse({
      file,
      name,
      gender,
      phoneNumber,
    });
    if (!validateData.success) {
      return NextResponse.json(validateData.error.issues, { status: 400 });
    }

    let avatarUrl;
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = `data:${mimeType};base64,${base64Data}`;

      const res = await cloudinary.uploader.upload(fileUri, {
        folder: "user_avatars",
        use_filename: true,
        invalidate: true,
      });

      if (res) {
        avatarUrl = res.secure_url;
      }
    }

    console.log("formData", formData);
    // Update user details in the database
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        name: name || existingUser.name,
        gender: gender || existingUser.gender,
        phoneNumber: phoneNumber || existingUser.phoneNumber,
        avatar: avatarUrl || existingUser.avatar,
        isvarified: true,
      },
    });
    console.log("updated user:", updatedUser);
    // Return updated user data as response
    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 },
    );
  }
};
