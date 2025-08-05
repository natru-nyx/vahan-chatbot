import { Message } from "@/types";
import { IconArrowUp } from "@tabler/icons-react";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
  onSend: (message: Message) => void;
}

export const ChatInput: FC<Props> = ({ onSend }) => {
  const [content, setContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        onSend({ role: "user", content: `Document uploaded: ${file.name}\n\n${text}` });
      }
    };
    reader.readAsText(file);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content });
    setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="relative w-full bg-white rounded-lg border-2 border-neutral-200 hover:border-neutral-300 transition-colors">
      <div className="flex items-center p-2 gap-2">
        <label htmlFor="file-upload" className="flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full cursor-pointer transition-colors shrink-0">
          <span className="text-xl font-medium">+</span>
          <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf,.doc,.docx,.md,.csv,.json"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            className="w-full min-h-[40px] py-2 px-3 focus:outline-none rounded-md bg-neutral-50"
            style={{ resize: "none" }}
            placeholder="Type a message..."
            value={content}
            rows={1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {fileName && (
            <span className="absolute -top-5 left-0 text-xs text-gray-500">{fileName}</span>
          )}
        </div>
        
        <button 
          onClick={() => handleSend()} 
          className="shrink-0 rounded-full p-2 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          <IconArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
