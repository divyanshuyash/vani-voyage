import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background:
            "linear-gradient(180deg, rgba(250, 246, 240, 1) 0%, rgba(237, 232, 223, 1) 100%)",
          border: "1px solid rgba(193, 123, 60, 0.22)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          boxShadow: "0 6px 18px rgba(26, 22, 18, 0.12)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -8,
            background:
              "radial-gradient(circle at 30% 25%, rgba(193, 123, 60, 0.18), transparent 42%)",
          }}
        />
        {[5, 9, 14, 9, 5].map((h, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: h,
              backgroundColor: i === 2 ? "#C17B3C" : "#2C3E35",
              borderRadius: 2,
              position: "relative",
              boxShadow: i === 2 ? "0 0 10px rgba(193, 123, 60, 0.35)" : "none",
            }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
