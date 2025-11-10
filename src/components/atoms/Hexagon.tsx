import React from "react";

export interface HexagonProps {
  size?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  children?: React.ReactNode;
  className?: string;
  orientation?: "flat" | "pointy";
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
}

const CLIP = {
  flat: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  pointy: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
};

const SVG_POINTS = {
  flat: "25 0, 75 0, 100 50, 75 100, 25 100, 0 50",
  pointy: "50 0, 100 25, 100 75, 50 100, 0 75, 0 25",
};

export default function Hexagon({
  size = 200,
  color,
  borderColor,
  borderWidth = 4,
  children,
  className = "",
  orientation = "flat",
  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
}: HexagonProps) {
  const clip = CLIP[orientation];
  const svgPoints = SVG_POINTS[orientation];
  const stroke = borderColor;
  const strokeWidth = borderWidth;

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    position: "relative",
    display: "inline-block",
    transform: `scaleX(${orientation === "pointy" ? "90%" : "110%"})`,
};

const clippedBgStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    clipPath: clip,
    WebkitClipPath: clip,
    backgroundColor: color,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat: "no-repeat",
};

const contentStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    boxSizing: "border-box",
    clipPath: clip,
    WebkitClipPath: clip,
    transform: `scaleX(${orientation === "pointy" ? "110%" : "90%"})`
  };

  return (
    <div className={`${className}`} style={containerStyle}>
      <div style={clippedBgStyle} />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
        }}
        aria-hidden
      >
        <polygon
          points={svgPoints}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth / (size / 100)}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
