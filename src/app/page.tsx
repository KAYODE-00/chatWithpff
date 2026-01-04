import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, FileText, Github, Lock, LogIn, Search, ShieldCheck, Sparkles, Upload } from "lucide-react";
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
    const userChats = await db.select().from(chats).where(eq(chats.userId, userId));
    firstChat = userChats[0];
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] px-5 py-6 text-zinc-100 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-950"><FileText className="h-5 w-5" /></span>
            <span className="text-sm font-semibold tracking-tight">chatwithpdf</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </header>

        <section className="grid flex-1 gap-3 py-12 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-7 sm:p-10 lg:col-span-8">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl" />
            <div className="relative max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"><span className="h-1.5 w-1.5 rounded-full bg-white" />Your quiet space for PDFs</div>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl sm:leading-[0.95]">Read less.<br /><span className="text-zinc-500">Understand more.</span></h1>
              <p className="mt-7 max-w-md text-base leading-7 text-zinc-500">Turn dense documents into focused conversations, useful answers, and clear next steps.</p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                {isAuth && firstChat ? <Link href={`/chat/${firstChat.id}`} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">Continue reading <ArrowRight className="h-4 w-4" /></Link> : <Link href="/sign-in" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"><LogIn className="h-4 w-4" />Start reading</Link>}
                <span className="inline-flex items-center gap-2 text-xs text-zinc-600"><ShieldCheck className="h-4 w-4" />Private by design</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 lg:col-span-4">
            <div className="flex h-full min-h-[300px] flex-col justify-between border border-zinc-800/80 bg-[#0b0b0b] p-6 sm:p-8">
              <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-zinc-950"><Upload className="h-5 w-5" /></div><span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Workspace</span></div>
              <div>
                <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-medium text-zinc-200">Add a document</p><p className="mt-1 text-xs text-zinc-600">PDF · max 10 MB</p></div>{isAuth && <SubscriptionButton isPro={isPro} />}</div>
                {isAuth ? <FileUpload /> : <Link href="/sign-in"><Button className="h-12 w-full rounded-lg bg-white text-sm font-semibold text-zinc-950 hover:bg-zinc-200"><LogIn className="mr-2 h-4 w-4" />Sign in to upload</Button></Link>}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-12">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"><Search className="h-5 w-5 text-zinc-400" /><p className="mt-8 text-sm font-medium text-zinc-200">Ask precisely</p><p className="mt-2 text-xs leading-5 text-zinc-600">Find the signal without scanning every page.</p></div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"><Sparkles className="h-5 w-5 text-zinc-400" /><p className="mt-8 text-sm font-medium text-zinc-200">Think with context</p><p className="mt-2 text-xs leading-5 text-zinc-600">Keep every answer grounded in your document.</p></div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"><Lock className="h-5 w-5 text-zinc-400" /><p className="mt-8 text-sm font-medium text-zinc-200">Stay in control</p><p className="mt-2 text-xs leading-5 text-zinc-600">Your workspace is built around your files.</p></div>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-zinc-800 py-4 text-xs text-zinc-600"><span>Built for focused reading.</span><a href="https://github.com/KAYODE-00/chatWithpff" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-zinc-300"><Github className="h-3.5 w-3.5" />Repository</a></footer>
      </div>
    </main>
  );
}
