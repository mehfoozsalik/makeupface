/** Stylized face-shape silhouettes for the homepage grid. */

type FaceShapeName =
  | "Oval"
  | "Round"
  | "Square"
  | "Heart"
  | "Diamond"
  | "Oblong";

const SHAPES: FaceShapeName[] = [
  "Oval",
  "Round",
  "Square",
  "Heart",
  "Diamond",
  "Oblong",
];

export { SHAPES };
export type { FaceShapeName };

function FaceFeatures() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.45"
    >
      <path d="M22 30c2.2 1.4 4.8 1.4 7 0" />
      <path d="M35 30c2.2 1.4 4.8 1.4 7 0" />
      <path d="M30 36.5c1.6 1.4 4.4 1.4 6 0" opacity="0.7" />
    </g>
  );
}

export function FaceShapeIcon({
  shape,
  className,
}: {
  shape: string;
  className?: string;
}) {
  const common = {
    fill: "color-mix(in srgb, var(--dusty-rose) 12%, transparent)",
    stroke: "var(--dusty-rose)",
    strokeWidth: 1.75,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 64 80"
      className={className ?? "h-16 w-12"}
      aria-hidden
    >
      {shape === "Round" ? (
        <path
          {...common}
          d="M32 12c13.5 0 22.5 10.5 22.5 25.5S45.5 68 32 68 9.5 52.5 9.5 37.5 18.5 12 32 12Z"
        />
      ) : shape === "Square" ? (
        <path
          {...common}
          d="M14 14h36c2.2 0 4 1.8 4 4v40c0 4.4-3.6 8-8 8H18c-4.4 0-8-3.6-8-8V18c0-2.2 1.8-4 4-4Z"
        />
      ) : shape === "Heart" ? (
        <path
          {...common}
          d="M32 72C18 56 8 42 8 28c0-8.5 6.5-15 14.5-15 5.2 0 9.8 2.6 12.5 6.6C37.7 15.6 42.3 13 47.5 13 55.5 13 62 19.5 62 28c0 14-10 28-30 44Z"
        />
      ) : shape === "Diamond" ? (
        <path
          {...common}
          d="M32 8l18 22c2.8 3.4 2.8 8.2 0 11.6L32 72 14 41.6c-2.8-3.4-2.8-8.2 0-11.6L32 8Z"
        />
      ) : shape === "Oblong" ? (
        <path
          {...common}
          d="M22 6h20c4.4 0 8 3.6 8 8v52c0 4.4-3.6 8-8 8H22c-4.4 0-8-3.6-8-8V14c0-4.4 3.6-8 8-8Z"
        />
      ) : (
        <path
          {...common}
          d="M32 8c12.5 0 21 11.2 21 28.5S44.5 72 32 72 11 53.8 11 36.5 19.5 8 32 8Z"
        />
      )}
      <path
        d={
          shape === "Heart"
            ? "M14 24c6-8 14-11 18-11s12 3 18 11"
            : shape === "Diamond"
              ? "M20 22c4-8 8-12 12-12s8 4 12 12"
              : shape === "Oblong"
                ? "M18 14h28"
                : shape === "Square"
                  ? "M16 18h32"
                  : "M14 20c5-7 12-10 18-10s13 3 18 10"
        }
        fill="none"
        stroke="var(--champagne)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <FaceFeatures />
    </svg>
  );
}
