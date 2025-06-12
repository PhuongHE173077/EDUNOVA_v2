// src/app/(admin)/manage-courses/[id]/add-students/page.tsx
import AddStudentsToCourse from "../../components/AddStudentsToCourse";

interface Props {
  params: {
    id: string;
  };
}

export default function AddStudentsPage({ params }: Props) {
  return <AddStudentsToCourse courseId={params.id} />;
}
