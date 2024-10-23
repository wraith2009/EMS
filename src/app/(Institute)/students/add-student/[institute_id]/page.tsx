"use client"
import React from "react";
import StudentRegistration from "@/src/components/institute/student/studentRegistration";
const RegisterStudent = ({ params }: { params: { institute_id: string } }) => {
  const { institute_id } = params;

  if (!institute_id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StudentRegistration instituteId={institute_id} />
    </>
  );
};

export default RegisterStudent;
