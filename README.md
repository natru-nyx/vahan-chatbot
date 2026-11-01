# Vahan Policy Assistant

A chatbot that answers employee questions about company policy (leave, expenses, WFH, compensation, conduct, etc.) and cites the exact policy code it's answering from.

**Live demo:** https://vahan-chatbot-iog3.vercel.app

Try: *"How many sick days do I get?"*, *"Can I work from abroad for two weeks?"*, *"What's the travel reimbursement limit?"*

## How it works

- The policy handbook is passed to **Gemini 2.5 Flash-Lite** as grounding context, with instructions to answer only from it and name the section it used. If something isn't covered, it says so instead of guessing.
- Replies stream token-by-token into the chat UI.
- A 👎 on an answer logs the question and reply to a Google Sheet, so weak answers can be reviewed and the handbook improved.

> The policy content is a **fictional** handbook written for this demo; it isn't any real company's internal policy.

## Stack

Next.js 15 (App Router) · React 18 · TypeScript · Tailwind · Google Gemini API · Google Sheets API · Vercel

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Variable | Needed for |
| --- | --- |
| `GEMINI_API_KEY` | Chat (free key from Google AI Studio) |
| `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID` | Optional – feedback logging |

## Layout

```
src/app/api/chat       streaming chat endpoint
src/app/api/feedback   logs 👎 answers to Google Sheets
src/components/Chat    chat UI
src/utils              Gemini call + policy handbook
```
