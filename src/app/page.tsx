"use client"

import { Chat } from "@/components/Chat/Chat";
import { Message } from "../types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFeedback = async (messageId: string, isGood: boolean) => {
    const timestamp = new Date();
    
    setMessages(prevMessages => {
      // Find the assistant message and the user query that preceded it
      const assistantMessageIndex = prevMessages.findIndex(msg => 
        msg.content === messageId && msg.role === 'assistant'
      );
      const userQuery = assistantMessageIndex > 0 ? prevMessages[assistantMessageIndex - 1].content : '';
      
      // Update the message with feedback
      return prevMessages.map(msg => 
        msg.content === messageId 
          ? { ...msg, feedback: { isGood, timestamp } }
          : msg
      );
    });

    // If the feedback is negative, log it to Google Sheets
    if (!isGood) {
      try {
        // Find the associated user query
        const assistantMessageIndex = messages.findIndex(msg => 
          msg.content === messageId && msg.role === 'assistant'
        );
        const userQuery = assistantMessageIndex > 0 ? messages[assistantMessageIndex - 1].content : '';

        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userQuery,
            botResponse: messageId,
            timestamp: timestamp.toISOString(),
          }),
        });

        if (!response.ok) {
          console.error('Failed to log negative feedback');
        }
      } catch (error) {
        console.error('Error logging negative feedback:', error);
      }
    }
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      console.log(response.statusText);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue,
          },
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue,
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! How can I help you today?`,
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! How can I help you today?`,
      },
    ]);
  }, []);

  return (
    <>    
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] sm:mx-auto mt-4 sm:mt-12 mx-2">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
              onFeedback={handleFeedback}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}