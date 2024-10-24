import React from "react";
import DepartmentRegistration from "@/src/components/institute/department/departmentForm";

const RegisterDepartment = ({
  params,
}: {
  params: { institute_id: string };
}) => {
  const { institute_id } = params;

  if (!institute_id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DepartmentRegistration instituteId={institute_id} />
    </>
  );
};

export default RegisterDepartment;
