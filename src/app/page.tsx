import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn, FileText, ShieldCheck } from "lucide-react";
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
    <main className="min-h-screen bg-[#090909] px-5 py-6 text-zinc-100 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-950">
              <FileText className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold tracking-tight">chatwithpdf</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-300" />
              Private document workspace
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl sm:leading-[1.05]">Understand every page.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-zinc-500">Upload a PDF and get clear answers from your document in seconds.</p>
            {isAuth && firstChat && (
              <Link href={`/chat/${firstChat.id}`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white">
                Continue reading <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/30">
            <div className="border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div><p className="text-sm font-medium text-zinc-200">New document</p><p className="mt-1 text-xs text-zinc-600">PDF · max 10 MB</p></div>
                {isAuth && <SubscriptionButton isPro={isPro} />}
              </div>
              {isAuth ? <FileUpload /> : <Link href="/sign-in"><Button className="h-12 w-full rounded-lg bg-white text-sm font-semibold text-zinc-950 hover:bg-zinc-200"><LogIn className="mr-2 h-4 w-4" />Sign in to upload</Button></Link>}
            </div>
          </div>
        </section>
        <footer className="border-t border-zinc-800 py-4 text-xs text-zinc-600">Built for focused reading.</footer>
      </div>
    </main>
  );
}
