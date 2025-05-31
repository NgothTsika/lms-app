import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string | null;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  author: {
    name: string;
    image: string | null;
  };
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  author,
}: CourseCardProps) => {
  const fallbackImage = "/images/avatar.png";
  const authorImage = author?.image || "/images/avatar.png";

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full shadow-md flex flex-col">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl || fallbackImage}
          />
        </div>

        <div className="flex flex-col flex-1 p-3">
          {/* ✅ Title with minimum height for alignment */}
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 min-h-[48px]">
            {title}
          </div>
          <div className=" flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{category}</p>
            <div className="flex items-center gap-2">
              <Image
                src={authorImage}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <span className="text-xs text-slate-600 line-clamp-1">
                {author.name}
              </span>
            </div>
          </div>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {/* price or empty spacer to push progress down */}
          {progress === null && (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}

          <div className="flex-1" />

          {progress !== null && (
            <CourseProgress
              size="sm"
              value={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          )}
        </div>
      </div>
    </Link>
  );
};
