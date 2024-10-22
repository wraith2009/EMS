import TeacherRegistration from "@/src/components/institute/teachers/teacherRegistration";
const RegisterTeacher = ({
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
        <TeacherRegistration instituteId={institute_id} />
      </>
    );
  };
  
  export default RegisterTeacher;
  