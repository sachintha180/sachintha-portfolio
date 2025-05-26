import { useRef, useState } from "react";
import Connector from "./ui/Connector";

type NeuronConfigType = {
  inputSize: number;
  neuronSize: number;
  outputSize: number;
};

export default function Perceptron() {
  // Initialize refs to model components
  const inputRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Initialize ref to main container (for connectors)
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize neuron style configuration
  const [neuronConfig, _setNeuronConfig] = useState<NeuronConfigType>({
    inputSize: 40,
    neuronSize: 60,
    outputSize: 40,
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 relative border-2 border-gray-200 rounded-md"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16">
        <div
          ref={inputRef}
          className="bg-blue-200 rounded-full border-2 border-blue-300"
          style={{
            width: `${neuronConfig.inputSize}px`,
            height: `${neuronConfig.inputSize}px`,
          }}
        />
        <div
          ref={hiddenRef}
          className="bg-red-200 rounded-full border-2 border-red-300"
          style={{
            width: `${neuronConfig.neuronSize}px`,
            height: `${neuronConfig.neuronSize}px`,
          }}
        />
        <div
          ref={outputRef}
          className="bg-green-200 rounded-full border-2 border-green-300"
          style={{
            width: `${neuronConfig.outputSize}px`,
            height: `${neuronConfig.outputSize}px`,
          }}
        />
      </div>

      {/* Connectors between neurons */}
      <Connector
        containerRef={containerRef}
        refA={inputRef}
        refB={hiddenRef}
        from="right"
        to="left"
      />
      <Connector
        containerRef={containerRef}
        refA={hiddenRef}
        refB={outputRef}
        from="right"
        to="left"
      />
    </div>
  );
}
