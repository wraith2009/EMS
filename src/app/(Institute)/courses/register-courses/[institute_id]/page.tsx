import CourseRegistration from "@/src/components/institute/courses/courseRegistration";
const RegisterCourses = ({ params }: { params: { institute_id: string } }) => {
  const { institute_id } = params;

  if (!institute_id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CourseRegistration instituteId={institute_id} />
    </>
  );
};

export default RegisterCourses;
