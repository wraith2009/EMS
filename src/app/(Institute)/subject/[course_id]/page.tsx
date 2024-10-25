"use client";
import AddSubject from "@/src/components/subject/page";

const Add_Subject = ({ params }: { params: { course_id: string } }) => {
  console.log("params", params);
  return (
    <div className="p-4">
      <AddSubject course_id={params.course_id} />
    </div>
  );
};

export default Add_Subject;
