import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    });

    if (!course) {
      return new Response("Unauthorized", { status: 404 });
    }

    const unpublishedCourse = await prisma.course.update({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSES_UNCHAPTER_ID]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
