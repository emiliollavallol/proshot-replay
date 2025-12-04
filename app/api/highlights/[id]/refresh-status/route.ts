import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import * as videoProvider from "@/lib/video-provider";

interface Params {
  params: { id: string };
}

export async function POST(_request: Request, { params }: Params) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const highlight = await prisma.shotHighlight.findUnique({ where: { id: params.id } });
  if (!highlight || highlight.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!highlight.providerJobId) {
    return NextResponse.json({ error: "No provider job" }, { status: 400 });
  }

  const jobStatus = await videoProvider.getJobStatus(highlight.providerJobId);

  const updated = await prisma.shotHighlight.update({
    where: { id: highlight.id },
    data: {
      status: jobStatus.status,
      videoUrl: jobStatus.videoUrl,
      thumbnailUrl: jobStatus.thumbnailUrl,
    },
  });

  return NextResponse.json({ highlight: updated });
}
