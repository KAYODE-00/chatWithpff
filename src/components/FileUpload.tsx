"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud, Loader2 } from "lucide-react";
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-1">
      <div
        {...getRootProps({
          className:
            "flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-950 py-10 transition-colors hover:border-zinc-500 hover:bg-zinc-900",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-9 w-9 text-zinc-300 animate-spin" />
            <p className="mt-2 text-sm font-medium text-zinc-300">
              Processing document
            </p>
          </>
        ) : (
          <>
            <div className="p-3 bg-zinc-800 rounded-full border border-zinc-700">
              <UploadCloud className="w-8 h-8 text-zinc-200" />
            </div>
            <p className="text-sm font-medium text-zinc-200">
              Add a PDF
            </p>
            <p className="text-xs text-zinc-500">PDF up to 10MB</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
