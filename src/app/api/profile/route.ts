import { v2 as cloudinary } from "cloudinary";
import prisma from "@/src/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import { NextResponse, NextRequest } from "next/server";
import { ProfileSchema } from "@/src/lib/validators/auth.validator";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    // Verify Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing Cloudinary credentials");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 }
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
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File;
    const name = formData.get("name") as string;
    const gender = formData.get("gender") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    // Validate incoming data
    const validateData = ProfileSchema.safeParse({
      file,
      name,
      gender,
      phoneNumber,
    });

    if (!validateData.success) {
      return NextResponse.json(validateData.error.issues, { status: 400 });
    }

    // Handle avatar upload if a file is provided
    let avatarUrl = existingUser.avatar; // Default to existing avatar
    if (file) {
      // Validate file size (optional)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }

      try {
        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = `data:${mimeType};base64,${base64Data}`;

        const uploadResult = await cloudinary.uploader.upload(fileUri, {
          folder: "user_avatars",
          use_filename: true,
          invalidate: true,
          transformation: [
            { width: 400, height: 400, crop: "fill" }, // Resize to standard size
          ],
        });

        avatarUrl = uploadResult.secure_url;

        // Optional: Delete old avatar from Cloudinary if it exists
        if (existingUser.avatar && existingUser.avatar.includes('cloudinary')) {
          const oldPublicId = existingUser.avatar.split('/').pop()?.split('.')[0];
          if (oldPublicId) {
            await cloudinary.uploader.destroy(`user_avatars/${oldPublicId}`);
          }
        }
      } catch (cloudinaryError) {
        console.error("Error uploading avatar to Cloudinary:", cloudinaryError);
        return NextResponse.json(
          { message: "Error uploading avatar: " + (cloudinaryError as Error).message },
          { status: 500 }
        );
      }
    }

    // Update user information
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        name: name || existingUser.name,
        gender: gender || existingUser.gender,
        phoneNumber: phoneNumber || existingUser.phoneNumber,
        avatar: avatarUrl,
        isvarified: true,
      },
    });

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user: " + (error as Error).message },
      { status: 500 }
    );
  }
};