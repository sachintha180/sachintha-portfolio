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
      className="font-math relative flex-1 rounded-md border-2 border-gray-200"
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-16">
        {/* Input */}
        <div ref={inputRef} className="p-2">
          <p>x</p>
        </div>

        {/* Perceptron */}
        <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-red-300 bg-red-200">
          {/* Bias */}
          <div ref={biasRef} className="p-2 text-sm">
            <p>b</p>
          </div>

          <div className="flex w-full items-center justify-between gap-4 p-4">
            {/* Weighted Sum */}
            <div
              ref={sumRef}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-400 bg-red-300"
            >
              <p>&Sigma;</p>
            </div>

            {/* Activation Function */}
            <div
              ref={activationRef}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-400 bg-red-300"
            >
              <p>&phi;</p>
            </div>
          </div>
        </div>

        {/* Output */}
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
