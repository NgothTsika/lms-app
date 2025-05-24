import getCurrentUser from "@/actions/getCurrentUser";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/");
  }

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: currentUser.id,
        courseId: course.id,
      },
    },
  });

  return (
    <div className=" h-full border-r flex flex-col overflow-y-auto">
      <div className="p-7 flex flex-col border-b">
        <h1 className=" font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className=" flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            id={chapter.id}
            key={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
