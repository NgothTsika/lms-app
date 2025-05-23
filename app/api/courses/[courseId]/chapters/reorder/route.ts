import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    });

    if (!ownCourse) {
      return new NextResponse("UNauthorized", { status: 401 });
    }

    for (let item of list) {
      await prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("REORDER", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
