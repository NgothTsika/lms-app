import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { url } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await prisma.course.findMany({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 500 });
    }

    const attachment = await prisma.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
