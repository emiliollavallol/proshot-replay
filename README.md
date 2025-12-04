# ProShot Replay

ProShot Replay turns your golf shots into TV-style highlights. This MVP wires up authentication, mocked LLM hole descriptions, and a mocked video pipeline so you can experience the full flow locally.

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment
   Create a `.env` file with:
   ```bash
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="dev-secret-change-me"
   ```
3. Run the Prisma migrations (creates SQLite db)
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start the dev server
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 to use the app.

## How auth works
- Simple email + password authentication using bcrypt for hashing.
- On sign-up/login we issue a JWT (HS256, 7-day expiry) and store it in an `auth-token` httpOnly cookie (sameSite=lax, secure in production).
- `lib/auth.ts` exposes helpers for hashing, verifying, issuing tokens, and fetching the current user from the cookie, backed by Prisma.

## Mocked services
- **Hole description LLM**: `lib/hole-description-llm.ts` fabricates a cinematic hole intro string based on the shot inputs. Swap this out to call a real LLM.
- **Video provider**: `lib/video-provider.ts` returns a fake job id and always reports `completed` with static assets located at `public/sample-highlight.mp4` and `public/sample-thumbnail.jpg`. Replace with your real provider integration.
- **Prompt builder**: `lib/prompt-builder.ts` combines the hole description and shot details into a descriptive prompt that you can send to your video generator.

## Project structure
- Next.js 14 App Router with Tailwind CSS for styling.
- API routes under `app/api` for auth and highlight creation/status updates.
- Protected pages under `app/highlights` plus a form at `app/new` for creating highlights.

## Swapping in real providers
- Replace `generateHoleDescription` with an LLM client (OpenAI, etc.).
- Update `video-provider.ts` to call your video generation service and poll job status.
- Point the prompt builder to whatever schema your provider expects.
