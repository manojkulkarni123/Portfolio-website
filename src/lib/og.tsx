import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, background: "#09090b", color: "#e7e5e4", fontFamily: "sans-serif",
          backgroundImage: "radial-gradient(circle at 15% 0%, rgba(94,234,212,0.18), transparent 50%)",
        }}
      >
        <div style={{ fontSize: 28, color: "#5eead4", fontFamily: "monospace" }}>{`$ ${kicker}`}</div>
        <div style={{ fontSize: title.length > 40 ? 64 : 80, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8b8b94" }}>
          <span>Manoj Kulkarni</span>
          <span>AI agents · ML systems · Infra</span>
        </div>
      </div>
    ),
    ogSize
  );
}
