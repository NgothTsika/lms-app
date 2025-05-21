"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import * as z from "zod";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-updoad";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string; // ✅ camelCase consistency
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        videoUrl: values.videoUrl,
      });

      toast.success("Chapter video updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading the video.");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : initialData.videoUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add video
            </>
          )}
        </Button>
      </div>

      {/* === DISPLAY VIDEO PLAYER === */}
      {!isEditing &&
        (initialData.videoUrl ? (
          <div className="relative aspect-video mt-2 overflow-hidden rounded-md">
            <MuxPlayer
              playbackId={initialData.muxData?.playbackId || ""}
              className="rounded-md w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-2">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ))}

      {/* === EDIT MODE === */}
      {isEditing && (
        <form onSubmit={(e) => e.preventDefault()}>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <p className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </p>
        </form>
      )}

      {/* === PROCESSING NOTE === */}
      {initialData.videoUrl && !isEditing && (
        <p className="text-xs text-muted-foreground mt-2">
          Video can take a few minutes to process. Refresh the page if video
          does not appear.
        </p>
      )}
    </div>
  );
};

export default ChapterVideoForm;
