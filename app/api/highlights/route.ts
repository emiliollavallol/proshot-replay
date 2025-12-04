import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateHoleDescription } from "@/lib/hole-description-llm";
import { buildVideoPrompt } from "@/lib/prompt-builder";
import * as videoProvider from "@/lib/video-provider";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const highlights = await prisma.shotHighlight.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ highlights });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { courseName, holeNumber, par, yardage, club, weather, lie, emotion, description } = body as Record<string, any>;

  const shotInput = {
    courseName: courseName || undefined,
    holeNumber: holeNumber ? Number(holeNumber) : undefined,
    par: par ? Number(par) : undefined,
    yardage: yardage ? Number(yardage) : undefined,
    weather: weather || undefined,
    lie: lie || undefined,
  };

  const llmHoleDescription = await generateHoleDescription(shotInput);

  let highlight = await prisma.shotHighlight.create({
    data: {
      userId: user.id,
      courseName: shotInput.courseName,
      holeNumber: shotInput.holeNumber,
      par: shotInput.par,
      yardage: shotInput.yardage,
      club: club || null,
      weather: weather || null,
      lie: lie || null,
      emotion: emotion || null,
      description,
      llmHoleDescription,
      status: "pending",
    },
  });

  const prompt = buildVideoPrompt(highlight);
  const providerJob = await videoProvider.createShotHighlight(prompt);

  highlight = await prisma.shotHighlight.update({
    where: { id: highlight.id },
    data: { providerJobId: providerJob.jobId, status: "processing" },
  });

  return NextResponse.json({ highlight });
}
