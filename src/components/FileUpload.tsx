"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud, Loader2, FileUp } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// https://github.com/aws/aws-sdk-js-v3/issues/4126

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("Chat created!");
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-zinc-700 hover:border-zinc-500 rounded-xl cursor-pointer bg-zinc-950/80 hover:bg-zinc-900 transition-colors py-8 flex justify-center items-center flex-col space-y-2",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-9 w-9 text-zinc-300 animate-spin" />
            <p className="mt-2 text-sm font-medium text-zinc-300">
              Processing & Analyzing Document...
            </p>
          </>
        ) : (
          <>
            <div className="p-3 bg-zinc-800 rounded-full border border-zinc-700">
              <UploadCloud className="w-8 h-8 text-zinc-200" />
            </div>
            <p className="text-sm font-medium text-zinc-200">
              Drop your PDF here or click to browse
            </p>
            <p className="text-xs text-zinc-500">PDF up to 10MB</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
