import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Journal - Devyanshu Jadon";
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
          backgroundColor: "#f1f1ec",
          padding: "64px",
          fontFamily: "Arial Black, Helvetica, sans-serif",
          border: "16px solid #111111",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "auto",
            fontFamily: "ui-monospace, monospace",
            fontSize: "18px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5a5a54",
          }}
        >
          <span>Journal</span>
          <span style={{ color: "#e61919" }}>Open</span>
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
              width: "96px",
              height: "8px",
              backgroundColor: "#e61919",
              marginBottom: "28px",
            }}
          />
          <div
            style={{
              fontSize: "76px",
              fontWeight: 400,
              lineHeight: 0.9,
              color: "#111111",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              maxWidth: "980px",
            }}
          >
            Notes from building
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#3a3a35",
              marginTop: "28px",
              maxWidth: "700px",
              lineHeight: 1.4,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Engineering logs and field notes by Devyanshu Jadon.
          </div>
          <div
            style={{
              marginTop: "36px",
              fontSize: "16px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#111111",
              fontFamily: "ui-monospace, monospace",
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
