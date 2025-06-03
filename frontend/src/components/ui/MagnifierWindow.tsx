type MagnifierWindowProps = {
  x: number;
  y: number;
  radius: number;
  src: string;
  className?: string;
  zIndex?: number;
};

export default function MagnifierWindow({
  x,
  y,
  radius,
  src,
  className,
  zIndex = 25,
}: MagnifierWindowProps) {
  return (
    <img
      src={src}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex,
        // use a circular clip-path at the mouse coordinates
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        WebkitClipPath: `circle(${radius}px at ${x}px ${y}px)`,
        transition: "clip-path 0.05s", // smoothness
      }}
      className={className}
      alt=""
    />
  );
}
