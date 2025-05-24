import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { isCompleted } = await req.json();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: currentUser.id,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: currentUser.id,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("CHAPTER_ID_PROGRESSS", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
