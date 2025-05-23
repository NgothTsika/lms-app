import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

const CoursesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/");

  const courses = await prisma.course.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
