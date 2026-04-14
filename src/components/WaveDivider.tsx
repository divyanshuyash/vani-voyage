export default function WaveDivider({
  variant = "navy",
  flip = false,
}: {
  variant?: "navy" | "coal" | "cloud" | "teal";
  flip?: boolean;
}) {
  const colors: Record<string, string> = {
    navy: "var(--navy)",
    coal: "var(--coal)",
    cloud: "var(--cloud)",
    teal: "var(--teal)",
  };

  const fill = colors[variant] || colors.navy;

  return (
    <div
      className="wave-divider"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={fill}
          opacity="0.15"
        />
        <path
          d="M0,50 C360,10 720,70 1080,30 C1260,10 1380,40 1440,50 L1440,80 L0,80 Z"
          fill={fill}
          opacity="0.08"
        />
      </svg>
    </div>
  );
}
