type MouseFollowerProps = {
  zIndex: number;
  position: { x: number; y: number };
  radius: number;
};

export default function MouseFollower({
  zIndex,
  position,
  radius,
}: MouseFollowerProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: radius,
        height: radius,
        border: "3px solid #e5e7eb",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex,
        boxShadow: "0 0 24px 0 #e5e7eb",
      }}
    />
  );
}
