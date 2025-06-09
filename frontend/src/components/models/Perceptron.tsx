import { createRef, useMemo, useRef, type RefObject } from "react";
import Connector from "../ui/Connector";

// Perceptron props
type PerceptronProps = {
  inputCount: number;
  labels?: {
    x: string[];
    w: string[];
    b: string;
    z: string;
    y_hat: string;
  };
};

// Configuration for Perceptron component styling
const perceptronConfig = {
  neuronSize: 220,
  neuronPadding: 50,
};

export default function Perceptron({ inputCount, labels }: PerceptronProps) {
  // Initialize refs to model components
  const biasRef = useRef<HTMLDivElement>(null);
  const sumRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Initialize an array of input refs
  const inputRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  // Populate or reuse refs based on inputCount
  useMemo(() => {
    inputRefs.current = Array.from(
      { length: inputCount },
      (_, i) => inputRefs.current[i] || createRef<HTMLDivElement>(),
    );
  }, [inputCount]);

  // Initialize ref to main container (for connectors)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="font-math relative flex-1">
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-20">
        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: inputCount }).map((_, i) => (
            <div
              key={`input-${i}`}
              ref={inputRefs.current[i]}
              className="min-w-20 p-3"
              style={{
                fontSize: perceptronConfig.neuronPadding / 3,
              }}
            >
              <p className="text-right">
                {labels ? (
                  labels.x[i]
                ) : (
                  <>
                    x<sub>{i + 1}</sub>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Perceptron */}
        <div
          className="flex flex-col items-center justify-center rounded-full border-2 border-blue-300 bg-blue-200"
          style={{
            height: perceptronConfig.neuronSize,
            width: perceptronConfig.neuronSize,
          }}
        >
          {/* Bias */}
          <div
            ref={biasRef}
            className="min-w-20 p-2"
            style={{
              fontSize: perceptronConfig.neuronPadding / 3,
            }}
          >
            <p>{labels ? labels.b : "b"}</p>
          </div>

          <div className="flex w-full items-center justify-between gap-4 p-4">
            {/* Weighted Sum */}
            <div
              ref={sumRef}
              className="flex items-center justify-center rounded-full border-2 border-blue-400 bg-blue-300"
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

            {/* Step Function */}
            <div
              ref={stepRef}
              className="flex items-center justify-center rounded-full border-2 border-blue-400 bg-blue-300"
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
                &phi;(z)
              </p>
            </div>
          </div>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="min-w-20 p-3"
          style={{
            fontSize: perceptronConfig.neuronPadding / 3,
          }}
        >
          {labels ? labels.y_hat : <p>y&#770;</p>}
        </div>
      </div>

      {/* Weight Connectors */}
      {Array.from({ length: inputCount }).map((_, i) => (
        <Connector
          key={`weight-connector-${i}`}
          containerRef={containerRef}
          refA={inputRefs.current[i]}
          refB={sumRef}
          from="right"
          to="left"
          label={labels ? labels.w[i] : `w${i + 1}`}
          fontSize={perceptronConfig.neuronPadding / 3}
          inputCount={inputCount}
        />
      ))}

      {/* Bias-Sum Connector */}
      <Connector
        containerRef={containerRef}
        refA={biasRef}
        refB={sumRef}
        from="left"
        to="top"
        fontSize={perceptronConfig.neuronPadding / 3}
      />

      {/* Sum-Step Connector */}
      <Connector
        containerRef={containerRef}
        refA={sumRef}
        refB={stepRef}
        from="right"
        to="left"
        label={labels ? labels.z : "z"}
        fontSize={perceptronConfig.neuronPadding / 3}
      />

      {/* Step-Output Connector */}
      <Connector
        containerRef={containerRef}
        refA={stepRef}
        refB={outputRef}
        from="right"
        to="left"
        fontSize={perceptronConfig.neuronPadding / 3}
      />
    </div>
  );
}
