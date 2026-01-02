import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chatwithpdf - Chat with any PDF",
  description: "Instantly analyze and talk to your PDFs using AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" className="dark">
          <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
            {children}
            <Toaster toastOptions={{ style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #27272a" } }} />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
