import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  return { userId: session.userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Image uploaded:", file);
      // Send a callback request to your Next.js API route
      await fetch(
        `${process.env.UPLOADTHING_CALLBACK_URL}/api/uploadthing/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file }),
        }
      );
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Attachment uploaded:", file);
      // Send a callback request to your Next.js API route
      await fetch(
        `${process.env.UPLOADTHING_CALLBACK_URL}/api/uploadthing/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file }),
        }
      );
    }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Chapter video uploaded:", file);
      // Send a callback request to your Next.js API route
      await fetch(
        `${process.env.UPLOADTHING_CALLBACK_URL}/api/uploadthing/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file }),
        }
      );
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
