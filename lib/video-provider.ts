export async function createShotHighlight(prompt: string): Promise<{ jobId: string }> {
  console.log("Creating mock video with prompt", prompt);
  return { jobId: `mock-job-${Math.floor(Math.random() * 100000)}` };
}

export async function getJobStatus(jobId: string): Promise<{
  status: "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
}> {
  console.log("Polling mock video job", jobId);
  return {
    status: "completed",
    videoUrl: "/sample-highlight.mp4",
    thumbnailUrl: "/sample-thumbnail.jpg",
  };
}
