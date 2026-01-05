# chatwithpdf

`chatwithpdf` is a full-stack PDF assistant built with Next.js. Upload a PDF, create a chat session, and ask questions about the document using AI.

## Features

- PDF upload and document chat interface
- Groq-powered chat completions
- OpenAI embeddings with Pinecone vector search
- AWS S3 document storage
- Neon PostgreSQL with Drizzle ORM
- Clerk authentication
- Stripe subscriptions

## Tech stack

- Next.js 13 and React 18
- TypeScript and Tailwind CSS
- Groq, OpenAI, and Pinecone
- AWS S3, Neon, Drizzle, Clerk, and Stripe

## Getting started

### Requirements

- Node.js 18 or newer
- A configured PostgreSQL database
- Credentials for the services listed in `.env.example`

### Installation

```bash
npm install
```

Copy the example environment file and fill in your own credentials:

```bash
copy .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local` instead.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If the browser reports missing `/_next` JavaScript files after switching between development and production, stop the server and run `npm run dev:clean` once. This clears the generated `.next` cache before starting again.

## Environment variables

All required variable names are documented in `.env.example`. Keep `.env` and `.env.local` private. Pinecone uses `PINECONE_API_KEY` and `PINECONE_INDEX_NAME`; `PINECONE_ENVIRONMENT` is not required.

## Scripts

```bash
npm run dev      # Start the development server
npm run dev:clean # Clear generated assets and start development
npm run clean     # Remove the generated Next.js cache
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run Next.js linting
```
