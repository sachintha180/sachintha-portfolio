import { useLayoutEffect, useState, type RefObject } from "react";
import type { Side } from "../../types/Connector";
import { getCoords } from "../../lib/utils";

type ConnectorProps = {
  refA: RefObject<HTMLDivElement | null>;
  refB: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  from?: Side;
  to?: Side;
  label?: string;
  fontSize: number;
  inputCount?: number; // Used to trigger re-rendering for input connectors
};

const LABEL_Y_OFFSET = 10;

export default function Connector({
  refA,
  refB,
  containerRef,
  from,
  to,
  label,
  fontSize,
  inputCount,
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

    // Using requestAnimationFrame to wait until after first paint
    const raf = requestAnimationFrame(updateLine);

    // Add resize listener
    window.addEventListener("resize", updateLine);

    // Add scroll listener
    // useCapture = true for bubbling elements
    window.addEventListener("scroll", updateLine, true);

    // Add resize observer
    const observer = new ResizeObserver(updateLine);
    if (containerRef.current) observer.observe(containerRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateLine);
      window.removeEventListener("scroll", updateLine);
      observer.disconnect();
    };

    //
  }, [refA, refB, containerRef, from, to, inputCount]);

  // Pre-render text element (with optional numeric subscript)
  const TextElement = () => {
    const match = label?.match(/^(\D+)(\d+)$/);
    if (match) {
      const [, base, subscript] = match;
      return (
        <text
          x={(lineCoords.x1 + lineCoords.x2) / 2}
          y={(lineCoords.y1 + lineCoords.y2) / 2 - LABEL_Y_OFFSET}
          textAnchor="middle"
          fill="black"
          fontSize={fontSize}
          className="select-none"
        >
          <tspan>{base}</tspan>
          <tspan dy="0.4em" fontSize={fontSize * 0.7}>
            {subscript}
          </tspan>
        </text>
      );
    }

    return (
      <text
        x={(lineCoords.x1 + lineCoords.x2) / 2}
        y={(lineCoords.y1 + lineCoords.y2) / 2 - LABEL_Y_OFFSET}
        textAnchor="middle"
        fill="black"
        fontSize={fontSize}
        className="select-none"
      >
        {label}
      </text>
    );
  };

  // Draw SVG line connecting the two refs together
  return (
    <svg className="pointer-events-none absolute top-0 left-0 h-full w-full">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="5"
          markerHeight="4"
          refX="3.5"
          refY="2"
          orient="auto-start-reverse"
        >
          <polygon points="0 0, 5 2, 0 4" fill="black" />
        </marker>
      </defs>
      <line
        x1={lineCoords.x1}
        y1={lineCoords.y1}
        x2={lineCoords.x2}
        y2={lineCoords.y2}
        stroke="black"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <TextElement />
    </svg>
  );
}
