import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const email = cookieStore.get("userEmail");

  if (email) {
    return NextResponse.json({ email: email.value }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Email not found" }, { status: 404 });
  }
}
