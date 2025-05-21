import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    });
    if (!ownCourse) {
      return new Response("Unauthorized", { status: 401 });
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const muxData = await prisma.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing requerid feilds", { status: 400 });
    }

    const publishedChapter = await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
