import prisma from "@/src/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import formidable from "formidable";
import cloudinary from "@/lib/cloudinary"; // Cloudinary configuration

// Disable body parsing to let formidable handle it
export const config = {
  api: {
    bodyParser: false,
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any, res: any) {
  try {
    const session = await getServerSession(req, res, authOptions);

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

    const ExistingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!ExistingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }

    const form = new formidable.IncomingForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        return NextResponse.json(
          { message: "Error parsing form data" },
          { status: 500 },
        );
      }

      const { name, gender, phoneNumber } = fields;

      let avatarUrl;

      if (files.avatar) {
        const file = files.avatar as formidable.File;
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "user_avatars",
        });
        avatarUrl = result.secure_url; // Store the uploaded file URL
      }

      // Update user profile in the database
      await prisma.user.update({
        where: { email: userEmail },
        data: {
          name: name?.toString() || ExistingUser.name,
          gender: gender?.toString() || ExistingUser.gender,
          phoneNumber: phoneNumber?.toString() || ExistingUser.phoneNumber,
          avatar: avatarUrl,
          isvarified: true,
        },
      });

      return NextResponse.json(
        { message: "User updated successfully" },
        { status: 200 },
      );
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 },
    );
  }
}
