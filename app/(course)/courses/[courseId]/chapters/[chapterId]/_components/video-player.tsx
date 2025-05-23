"use client";

import { Loader2, Lock } from "lucide-react";

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
  return (
    <div className=" relative aspect-video">
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 ">
          <Loader2 className=" h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary ">
          <Lock className=" h-8 w-8" />
          <p className="text-sm text-slate-400">
            This chapter is locked. You need to purchase the course to unlock
            this chapter.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
