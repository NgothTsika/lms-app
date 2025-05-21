export const runtime = "nodejs";

import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  Files,
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-from";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-from";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;

  if (!courseId) return redirect("/");

  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/");

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: currentUser.id,
    },
    include: {
      chapters: { orderBy: { position: "asc" } },
      attachments: { orderBy: { createAt: "desc" } },
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!course) return redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${requiredFields.length})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListCheck} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Files} />
              <h2 className="text-xl">Resources & Attachment</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
