import { Message } from "@/types";
import GeminiStream from "@/utils";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();
    const messages = body.messages as Message[];

    const charLimit = 12000;
    let charCount = 0;
    let messagesToSend: Message[] = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }

    const stream = await GeminiStream(messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;