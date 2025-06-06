import { useRef } from "react";
import Connector from "../ui/Connector";

// Configuration for Perceptron component styling
const perceptronConfig = {
  neuronSize: 220,
  neuronPadding: 50,
};

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
    <div ref={containerRef} className="font-math relative flex-1">
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-20">
        {/* Input */}
        <div
          ref={inputRef}
          className="p-3"
          style={{
            fontSize: perceptronConfig.neuronPadding / 3,
          }}
        >
          <p>x</p>
        </div>

        {/* Perceptron */}
        <div
          className="flex flex-col items-center justify-center rounded-full border-2 border-red-300 bg-red-200"
          style={{
            height: perceptronConfig.neuronSize,
            width: perceptronConfig.neuronSize,
          }}
        >
          {/* Bias */}
          <div
            ref={biasRef}
            className="p-2"
            style={{
              fontSize: perceptronConfig.neuronPadding / 3,
            }}
          >
            <p>b</p>
          </div>

          <div className="flex w-full items-center justify-between gap-4 p-4">
            {/* Weighted Sum */}
            <div
              ref={sumRef}
              className="flex items-center justify-center rounded-full border-2 border-red-400 bg-red-300"
              style={{
                height:
                  perceptronConfig.neuronSize / 2 -
                  perceptronConfig.neuronPadding,
                width:
                  perceptronConfig.neuronSize / 2 -
                  perceptronConfig.neuronPadding,
              }}
            >
              <p
                style={{
                  fontSize: perceptronConfig.neuronPadding / 3,
                }}
              >
                &Sigma;
              </p>
            </div>

            {/* Activation Function */}
            <div
              ref={activationRef}
              className="flex items-center justify-center rounded-full border-2 border-red-400 bg-red-300"
              style={{
                height:
                  perceptronConfig.neuronSize / 2 -
                  perceptronConfig.neuronPadding,
                width:
                  perceptronConfig.neuronSize / 2 -
                  perceptronConfig.neuronPadding,
              }}
            >
              <p
                style={{
                  fontSize: perceptronConfig.neuronPadding / 3,
                }}
              >
                &phi;
              </p>
            </div>
          </div>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="p-3"
          style={{
            fontSize: perceptronConfig.neuronPadding / 3,
          }}
        >
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
        fontSize={perceptronConfig.neuronPadding / 3}
      />
      <Connector
        containerRef={containerRef}
        refA={biasRef}
        refB={sumRef}
        from="left"
        to="top"
        fontSize={perceptronConfig.neuronPadding / 3}
      />
      <Connector
        containerRef={containerRef}
        refA={sumRef}
        refB={activationRef}
        from="right"
        to="left"
        label="z"
        fontSize={perceptronConfig.neuronPadding / 3}
      />
      <Connector
        containerRef={containerRef}
        refA={activationRef}
        refB={outputRef}
        from="right"
        to="left"
        fontSize={perceptronConfig.neuronPadding / 3}
      />
    </div>
  );
}
