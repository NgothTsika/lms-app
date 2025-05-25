"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

const VideoPlayer = ({
  title,
  courseId,
  playbackId,
  chapterId,
  completeOnEnd,
  isLocked,
  nextChapterId,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          { isCompleted: true }
        );
        if (!nextChapterId) {
          confetti.onOpen();
        }
        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          setTimeout(() => {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
          }, 1500); // 1.5 seconds delay
        }
      }
    } catch (error) {
      console.error("Video end error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" relative aspect-video">
      {!isReady && !isLocked && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-slate-800 transition-opacity duration-300",
            isReady && "opacity-0 pointer-events-none"
          )}
        >
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {!isLocked && (
        <div className={cn(!isReady && "pointer-events-none")}>
          <MuxPlayer
            title={title}
            className={cn(!isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            autoPlay
            playbackId={playbackId}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
