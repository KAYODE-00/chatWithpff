"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Plus, FileText, PanelLeftClose } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "./SubscriptionButton";
import { Tooltip } from "./ui/tooltip";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  return (
    <aside className="flex h-screen w-full flex-col justify-between overflow-hidden border-r border-zinc-800 bg-[#0b0b0b] p-3 text-zinc-200">
      <div>
        <div className="mb-5 flex items-center justify-between px-2">
          <Link href="/" className="text-sm font-semibold tracking-tight text-white">chatwithpdf</Link>
          <Tooltip label="Collapse sidebar"><button aria-label="Collapse sidebar" className="text-zinc-600 transition hover:text-zinc-300"><PanelLeftClose className="h-4 w-4" /></button></Tooltip>
        </div>
        <Link href="/" className="block">
          <Button className="h-10 w-full rounded-lg border border-zinc-700 bg-white text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"><Plus className="mr-2 h-4 w-4" />New chat</Button>
        </Link>

        <div className="mt-6 flex max-h-[calc(100vh-160px)] flex-col gap-1 overflow-y-auto pr-1 scrollbar-thin">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  {
                    "bg-zinc-800 text-white border border-zinc-700 shadow-sm":
                      chat.id === chatId,
                    "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80":
                      chat.id !== chatId,
                  }
                )}
              >
                <FileText className="mr-2.5 h-4 w-4 flex-shrink-0 text-zinc-500" />
                <p className="w-full overflow-hidden truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
        <SubscriptionButton isPro={isPro} />
      </div>
    </aside>
  );
};

export default ChatSideBar;
