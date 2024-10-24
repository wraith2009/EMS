// import ClassR from "@/src/components/institute/courses/courseRegistration";
import ClassRegistration from "@/src/components/institute/classroom/classRegistration";
const RegisterClass = ({ params }: { params: { institute_id: string } }) => {
  const { institute_id } = params;

  if (!institute_id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ClassRegistration instituteId={institute_id} />
    </>
  );
};

export default RegisterClass;
