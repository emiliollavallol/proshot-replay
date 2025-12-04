export type ShotInput = {
  courseName?: string;
  holeNumber?: number;
  par?: number;
  yardage?: number;
  weather?: string;
  lie?: string;
};

export async function generateHoleDescription(input: ShotInput): Promise<string> {
  const courseName = input.courseName || "an iconic course";
  const holeNumber = input.holeNumber ? `hole ${input.holeNumber}` : "a signature hole";
  const par = input.par ? `a par ${input.par}` : "a demanding par";
  const yardage = input.yardage ? `${input.yardage} yards` : "stretching out";
  const weather = input.weather || "calm, clear";
  const lie = input.lie || "a pristine lie";

  return `A picturesque ${par} at ${courseName}, ${holeNumber} playing ${yardage} in ${weather} conditions. The shot is played from ${lie}, with the green framed by natural contours and gallery energy building.`;
}
