"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageSquare, PlusCircle, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "./SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  return (
    <div className="w-full h-screen overflow-hidden p-4 text-zinc-200 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between">
      <div>
        <Link href="/">
          <Button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 font-semibold py-5 rounded-xl shadow-sm transition-colors flex items-center justify-center">
            <PlusCircle className="mr-2 w-4 h-4 text-zinc-300" />
            New Chat
          </Button>
        </Link>

        <div className="flex overflow-y-auto max-h-[calc(100vh-140px)] pb-6 flex-col gap-2 mt-4 pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 flex items-center transition-all cursor-pointer text-sm font-medium",
                  {
                    "bg-zinc-800 text-white border border-zinc-700 shadow-sm":
                      chat.id === chatId,
                    "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80":
                      chat.id !== chatId,
                  }
                )}
              >
                <FileText className="mr-2.5 w-4 h-4 flex-shrink-0 text-zinc-400" />
                <p className="w-full overflow-hidden truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default ChatSideBar;
