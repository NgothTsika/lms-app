import { createUploadthing, type FileRouter } from "uploadthing/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { isTeacher } from "@/lib/teacher";

const f = createUploadthing();

const handleAuth = async () => {
  try {
    const currentUser = await getCurrentUser();
    const isAuthorized = isTeacher(currentUser?.id);
    if (!currentUser?.id || !isAuthorized) throw new Error("Unauthorized");
    return { currentUser: currentUser };
  } catch (error) {
    console.error("UploadThing Auth Error:", error);
    throw error;
  }
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Image uploaded:", file);
    }),

  courseAttachment: f(["image", "video", "pdf", "text", "audio"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Attachment uploaded:", file);
    }),

  chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Chapter video uploaded:", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
