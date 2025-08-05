export interface Message {
  role: Role;
  content: string;
  feedback?: {
    isGood: boolean;
    timestamp: Date;
  };
}

export type Role = "assistant" | "user";