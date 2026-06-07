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
          backgroundColor: "#f0f0e8",
          backgroundImage:
            "radial-gradient(#0d0d0d 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          padding: "60px",
          fontFamily: "monospace",
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
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#ff4d00",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#0d0d0d",
            }}
          >
            JOURNAL — EST. 2024
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
              fontSize: "120px",
              fontWeight: 700,
              lineHeight: 0.9,
              color: "#0d0d0d",
              letterSpacing: "-0.04em",
            }}
          >
            WRITINGS.
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#2a2a2a",
              marginTop: "24px",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Engineering logs, ideas, and field notes from building software.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "4px",
                backgroundColor: "#0d0d0d",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#0d0d0d",
              }}
            >
              DEVYANSHU JADON
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
