import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Journal — Devyanshu Jadon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#faf9f7",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "auto",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              color: "#8a847a",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Journal
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: "84px",
              fontWeight: 500,
              lineHeight: 1.05,
              color: "#1a1814",
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            Notes from building.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#4f4a43",
              marginTop: "28px",
              maxWidth: "700px",
              lineHeight: 1.4,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Engineering logs and field notes by Devyanshu Jadon.
          </div>
          <div
            style={{
              marginTop: "40px",
              fontSize: "18px",
              color: "#0d5c63",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            blog.devyanshu.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
