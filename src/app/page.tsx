import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn, FileText, Sparkles, MessageSquare } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial gradient subtle detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center space-y-6 border border-zinc-800 bg-zinc-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
            <FileText className="w-8 h-8 text-zinc-100" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">chatwithpdf</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium bg-zinc-800/80 text-zinc-300 rounded-full border border-zinc-700">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Powered by Groq High-Speed AI</span>
        </div>

        <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
          Join millions of students, researchers and professionals to instantly
          analyze, summarize, and understand PDFs with AI.
        </p>

        {isAuth && firstChat && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href={`/chat/${firstChat.id}`}>
              <Button className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-semibold px-5">
                <MessageSquare className="w-4 h-4 mr-2" />
                Go to Chats
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <SubscriptionButton isPro={isPro} />
          </div>
        )}

        <div className="w-full pt-2">
          {isAuth ? (
            <FileUpload />
          ) : (
            <Link href="/sign-in">
              <Button className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-semibold py-6 text-base rounded-xl">
                Login to get Started
                <LogIn className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
