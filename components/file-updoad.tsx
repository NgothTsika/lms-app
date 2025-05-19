// "use client";
// import toast from "react-hot-toast";

// import { UploadDropzone } from "@/lib/uploadthing";
// import { ourFileRouter } from "@/app/api/uploadthing/core";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   endpoint: keyof typeof ourFileRouter;
// }
// export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
//   return (
//     <UploadDropzone
//       endpoint={endpoint}
//       onClientUploadComplete={(res: { url: string }[]) => {
//         onChange(res?.[0].url);
//       }}
//       onUploadError={(error: Error) => {
//         toast.error(`${error?.message}`);
//       }}
//     />
//   );
// };

"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: "courseImage" | "courseAttachment" | "chapterVideo";
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          onChange(res[0].url);
        } else {
          toast.error("Upload failed. No file returned.");
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message || "Upload failed");
      }}
    />
  );
};
