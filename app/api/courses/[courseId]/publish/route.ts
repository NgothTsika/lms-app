import getCurrentUser from "@/app/actions/getCurrentUser";
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
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new Response("Unauthorized", { status: 404 });
    }

    const hasPublishChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishChapter
    ) {
      return new NextResponse("Missing required feild", { status: 401 });
    }

    const publishedCourse = await prisma.course.update({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
