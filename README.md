# KuralApp – Tamil Voice-to-App

KuralApp is an AI-powered web application that converts **Tamil voice commands into a working business web application**. Users can speak naturally in Tamil, and GPT-5 generates a structured application with dashboard, CRUD operations, reports, and export functionality.

## Features

* Tamil voice recognition
* AI requirement analysis (GPT-5)
* Dynamic application generation
* Dashboard UI
* Customer CRUD
* PDF report export
* Local persistence
* Responsive production-style UI

## Tech stack

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* OpenAI GPT-5
* Prisma
* SQLite
* jsPDF

## Prerequisites

Install the following before running the project:

* Node.js 20 LTS
* npm 10+

Verify:

```bash
node -v
npm -v
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/prabuSP/tamil-voice-to-app.git

cd tamil-voice-to-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a file named:

```text
.env.local
```

Add:

```env
OPENAI_API_KEY=your_openai_api_key
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Create the local database

```bash
npx prisma migrate dev --name init
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## How to use

### Generate an application

1. Click **Start Recording**
2. Speak in Tamil

Example:

```text
ஒரு grocery billing app வேண்டும்
```

3. Click **Stop**
4. Click **Analyze & Generate App**
5. The application preview will open automatically

### Preview

The generated application includes:

* Dashboard
* Customer management
* Add/Delete customer
* Report export

### Export

Click **Export PDF** to download a professional report.

## Project structure

```text
app/
  page.tsx
  preview/page.tsx
  api/
components/
  voice/
  generated/
lib/
prisma/
public/
```

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Production build

```bash
npm run build

npm run start
```

## Deployment (Vercel)

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add `OPENAI_API_KEY`
4. Deploy

## Demo flow

Tamil Voice

↓

Speech Recognition

↓

GPT-5 Analysis

↓

Structured App Specification

↓

Dynamic UI Generation

↓

Dashboard + CRUD + Reports

## License

MIT
