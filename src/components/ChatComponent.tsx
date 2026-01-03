"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, FileText } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen flex-col bg-[#090909] text-zinc-100">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div className="flex items-center gap-2.5"><FileText className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-medium">Document chat</h3></div>
        <span className="text-[11px] uppercase tracking-widest text-zinc-600">AI assistant</span>
      </div>

      {/* message list */}
      <div className="flex-1 overflow-y-auto" id="message-container">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* input form */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-zinc-800 bg-[#090909] p-4"
      >
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question about this PDF..."
            className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-500 rounded-xl"
          />
          <Button aria-label="Send message" type="submit" className="rounded-xl bg-white px-4 text-zinc-950 hover:bg-zinc-200">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
