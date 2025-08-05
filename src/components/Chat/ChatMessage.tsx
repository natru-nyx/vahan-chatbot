import { Message } from "@/types";
import { FC } from "react";
import { FeedbackButtons } from "./FeedbackButtons";

interface Props {
  message: Message;
  onFeedback: (messageId: string, isGood: boolean) => void;
}

export const ChatMessage: FC<Props> = ({ message, onFeedback }) => {
  const handleFeedback = (isGood: boolean) => {
    onFeedback(message.content, isGood);
  };

  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`flex flex-col ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-orange-500 text-white"} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        {message.content}
      </div>
      {message.role === "assistant" && message.content !== "Hi there! How can I help you today?" && (
        <div className="ml-2 mt-1">
          <FeedbackButtons onFeedback={handleFeedback} />
        </div>
      )}
    </div>
  );
};
