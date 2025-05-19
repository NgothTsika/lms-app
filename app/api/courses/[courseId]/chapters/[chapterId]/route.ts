import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { isPublished, ...values } = await req.json();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 401 });
    }
    const ownCourse = await prisma.course.findFirst({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    });

    if (!ownCourse) {
      return new Response("Unauthorized", { status: 401 });
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
