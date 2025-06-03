// Connector.tsx

import React, { useLayoutEffect, useState } from "react";
import type { Side } from "../../types/Connector";
import { getCoords } from "../../lib/utils";

type ConnectorProps = {
  refA: React.RefObject<HTMLDivElement | null>;
  refB: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  from?: Side;
  to?: Side;
  label?: string;
};

const LABEL_Y_OFFSET = 7;

export default function Connector({
  refA,
  refB,
  containerRef,
  from,
  to,
  label,
}: ConnectorProps) {
  // Initialize state for the lines' coordinates
  const [lineCoords, setLineCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  // Update the lines' coordinates on update
  useLayoutEffect(() => {
    const updateLine = () => {
      const a = refA.current?.getBoundingClientRect();
      const b = refB.current?.getBoundingClientRect();
      const container = containerRef.current?.getBoundingClientRect();

      if (a && b && container) {
        const fromCoords = getCoords(a, from);
        const toCoords = getCoords(b, to);

        setLineCoords({
          x1: fromCoords.x - container.left,
          y1: fromCoords.y - container.top,
          x2: toCoords.x - container.left,
          y2: toCoords.y - container.top,
        });
      }
    };
    updateLine();

    // Using requestAnimationFrame to wait until after first paint
    const raf = requestAnimationFrame(updateLine);

    // Add a "resize" event listener after first paint
    window.addEventListener("resize", updateLine);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateLine);
    };
  }, [refA, refB, containerRef, from, to]);

  // Draw SVG line connecting the two refs together
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <line
        x1={lineCoords.x1}
        y1={lineCoords.y1}
        x2={lineCoords.x2}
        y2={lineCoords.y2}
        stroke="black"
        strokeWidth="3"
      />

      {label && (
        <text
          x={(lineCoords.x1 + lineCoords.x2) / 2}
          y={(lineCoords.y1 + lineCoords.y2) / 2 - LABEL_Y_OFFSET}
          textAnchor="middle"
          fill="black"
          className="text-sm select-none"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
