import { useEffect, useRef, useState } from "react";
import SkillBatches from "./SkillBatches";

const SPEED_PX_PER_SEC = 50;

export default function SkillCarousel() {
  const batchesRef = useRef<HTMLDivElement>(null);
  const [batchesWidth, setBatchesWidth] = useState(0);

  // For demonstration, we scroll at 100px per second
  const duration = batchesWidth ? batchesWidth / SPEED_PX_PER_SEC : 20; // Fallback duration

  useEffect(() => {
    // Re-measure on resize or content change
    function measure() {
      if (batchesRef.current) {
        setBatchesWidth(batchesRef.current.scrollWidth);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative w-full overflow-hidden px-4 whitespace-nowrap">
      <div
        className="animate-infinite-scroll flex w-max gap-4"
        style={
          {
            "--scroll-amount": `-${batchesWidth + 16}px`,
            animationDuration: `${duration}s`,
          } as React.CSSProperties
        }
      >
        {/* Batch 1 (with ref for width) */}
        <SkillBatches batchesRef={batchesRef} />

        {/* Batch 2 (duplicate) */}
        <SkillBatches />
      </div>
    </div>
  );
}
