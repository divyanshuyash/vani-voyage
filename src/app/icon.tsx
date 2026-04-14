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
          backgroundColor: "#080808",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {[5, 9, 14, 9, 5].map((h, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: h,
              backgroundColor: "#F0C060",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
