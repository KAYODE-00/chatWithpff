import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, User, Bot, Sparkles } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }
  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-zinc-500 space-y-3">
        <Sparkles className="w-8 h-8 text-zinc-600" />
        <p className="text-sm">Your conversation starts here.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {messages.map((message) => {
        const isUser = message.role === "user";
        return (
          <div
            key={message.id}
            className={cn("flex items-start gap-2.5", {
              "flex-row-reverse": isUser,
              "flex-row": !isUser,
            })}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold border shadow-sm",
                {
                  "bg-zinc-100 text-zinc-900 border-zinc-300": isUser,
                  "bg-zinc-800 text-zinc-200 border-zinc-700": !isUser,
                }
              )}
            >
              {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={cn(
                "rounded-2xl px-4 py-2 text-sm shadow-sm max-w-[85%] leading-relaxed border",
                {
                  "bg-zinc-100 text-zinc-900 border-zinc-200 rounded-tr-none font-medium": isUser,
                  "bg-zinc-900 text-zinc-200 border-zinc-800 rounded-tl-none": !isUser,
                }
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
