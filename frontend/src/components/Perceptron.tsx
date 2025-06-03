import { useRef } from "react";
import Connector from "./ui/Connector";

export default function Perceptron() {
  // Initialize refs to model components
  const inputRef = useRef<HTMLDivElement>(null);
  const biasRef = useRef<HTMLDivElement>(null);
  const sumRef = useRef<HTMLDivElement>(null);
  const activationRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Initialize ref to main container (for connectors)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative border-2 border-gray-200 rounded-md font-math"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16">
        {/* Input */}
        <div ref={inputRef} className="p-2">
          <p>x</p>
        </div>

        {/* Perceptron */}
        <div className="bg-red-200 rounded-full border-2 border-red-300 w-40 h-40 flex flex-col items-center justify-center">
          {/* Bias */}
          <div ref={biasRef} className="p-2 text-sm">
            <p>b</p>
          </div>

          <div className="flex items-center justify-between gap-4 w-full p-4">
            {/* Weighted Sum */}
            <div
              ref={sumRef}
              className="w-10 h-10 flex items-center justify-center bg-red-300 border-2 border-red-400 rounded-full"
            >
              <p>&Sigma;</p>
            </div>

            {/* Activation Function */}
            <div
              ref={activationRef}
              className="w-10 h-10 flex items-center justify-center bg-red-300 border-2 border-red-400 rounded-full"
            >
              <p>&phi;</p>
            </div>
          </div>
        </div>

        {/* Output */}
        {/* Input */}
        <div ref={outputRef} className="p-2">
          <p>y</p>
        </div>
      </div>

      {/* Connectors between model components */}
      <Connector
        containerRef={containerRef}
        refA={inputRef}
        refB={sumRef}
        from="right"
        to="left"
        label="w"
      />
      <Connector
        containerRef={containerRef}
        refA={biasRef}
        refB={sumRef}
        from="left"
        to="top"
      />
      <Connector
        containerRef={containerRef}
        refA={sumRef}
        refB={activationRef}
        from="right"
        to="left"
        label="z"
      />
      <Connector
        containerRef={containerRef}
        refA={activationRef}
        refB={outputRef}
        from="right"
        to="left"
      />
    </div>
  );
}
