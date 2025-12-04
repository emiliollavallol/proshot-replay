import type { ShotHighlight } from "@prisma/client";

export function buildVideoPrompt(shot: ShotHighlight): string {
  const details = [
    shot.llmHoleDescription,
    shot.club ? `The player hits a ${shot.club}.` : null,
    shot.yardage ? `Distance: ${shot.yardage} yards.` : null,
    shot.par ? `Par ${shot.par}.` : null,
    shot.courseName ? `Course: ${shot.courseName}.` : null,
    shot.weather ? `Weather: ${shot.weather}.` : null,
    shot.emotion ? `Emotion: ${shot.emotion}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    "Cinematic professional golf broadcast, vertical 9:16, 4K. " +
    "Show the hole as follows: " +
    details +
    " Realistic ball flight physics, dynamic camera tracking, shallow depth of field, PGA-style overlays."
  );
}
