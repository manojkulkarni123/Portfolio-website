import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Manoj Kulkarni: AI agents, ML systems and infrastructure";

export default function Image() {
  return ogImage("I build AI agents, ML systems and the infra they run on.", "whoami");
}
