"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, Sparkles, MessageSquare } from "lucide-react";
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
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      {/* header */}
      <div className="p-4 bg-zinc-900/90 backdrop-blur border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-zinc-300" />
          <h3 className="text-lg font-bold text-zinc-100">Chat Assistant</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700">
          <Sparkles className="w-3 h-3 text-zinc-300" />
          <span>Groq Engine</span>
        </div>
      </div>

      {/* message list */}
      <div className="flex-1 overflow-y-auto" id="message-container">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* input form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-zinc-950 border-t border-zinc-800"
      >
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question about this PDF..."
            className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-500 rounded-xl"
          />
          <Button type="submit" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold rounded-xl px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
