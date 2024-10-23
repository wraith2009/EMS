"use server"
import prisma from "../db/db";
import { StudentSchema } from "../lib/validators/student.validator";
import bcryptjs from "bcryptjs";
export const RegisterStudent = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log("Received form data:", data); // Log form data
  
  // Validate input data
  const parsedData = StudentSchema.safeParse(data);
  if (!parsedData.success) {
    console.log("Validation errors:", parsedData.error.errors); // Log validation errors
    return { error: parsedData.error.errors };
  }
  console.log("Parsed data:", parsedData.data); // Log successfully parsed data

  const {
    firstName,
    lastName,
    email,
    password,
    address,
    dateOfBirth,
    status,
    CurrentYear,
    CurrentSemester,
    courseID,
    enrollmentNumber,
    rollNumber,
    instituteID,
  } = parsedData.data;

  // Check if user already exists
  let existingUser = await prisma.user.findFirst({
    where: { email },
  });
  console.log("Existing user found:", existingUser); // Log existing user if found

  // If user doesn't exist, create a new one
  if (!existingUser) {
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Hashed password generated:", hashedPassword); // Log hashed password

    const name = `${firstName} ${lastName}`;
    console.log("Generated full name:", name); // Log the full name of the user

    existingUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "student",
      },
    });
    console.log("New user created:", existingUser); // Log the newly created user
  }

  // Proceed if user exists
  if (existingUser) {
    // Check if student already exists
    const existingStudent = await prisma.student.findFirst({
      where: {
        enrollmentNumber,
        institute_id: instituteID,
      },
    });
    console.log("Existing student found:", existingStudent); // Log if student exists

    if (existingStudent) {
      console.log("Student already exists, returning error."); // Log duplicate student error
      return {
        status: 400,
        json: {
          success: false,
          message: "Student already exists",
        },
      };
    }

    // Try to register the student
    try {
      const newStudent = await prisma.student.create({
        data: {
          firstName,
          lastName,
          address: address || null,
          dateOfBirth: new Date(dateOfBirth),
          status,
          CurrentYear: CurrentYear || null,
          CurrentSemester: CurrentSemester || null,
          enrollmentNumber,
          rollNumber: rollNumber || null,
          institute_id: instituteID,
          course_id: courseID,
        },
      });
      console.log("New student created:", newStudent); // Log the newly registered student

      return {
        status: 200,
        json: {
          success: true,
          message: "Student Registered Successfully",
        },
      };
    } catch (error) {
      console.error("Error while creating student:", error); // Log error if creation fails
      return {
        status: 500,
        json: {
          success: false,
          message: "Server Error",
          error: error instanceof Error ? error.message : String(error),
        },
      };
    }
  } else {
    console.log("User not found after creation attempt."); // Log user creation failure
    return { success: false, message: "User not defined" };
  }
};
