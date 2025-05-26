import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !isTeacher(currentUser.id))
      return new NextResponse("Unauthorized", { status: 401 });

    const { title } = await req.json();

    const course = await prisma.course.create({
      data: {
        userId: currentUser.id,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
