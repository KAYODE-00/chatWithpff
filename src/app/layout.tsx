import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "chatwithpdf - Chat with any PDF",
  description: "Instantly analyze and talk to your PDFs using AI.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <ClerkProvider>
          <Providers>
            {children}
            <Toaster toastOptions={{ style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #27272a" } }} />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
