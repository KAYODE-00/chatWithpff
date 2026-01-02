import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full h-full rounded-xl border border-zinc-800 bg-zinc-900 shadow-md"
    ></iframe>
  );
};

export default PDFViewer;
