// CentralCanvas.tsx

import Perceptron from "./Perceptron";

export default function CentralCanvas() {
  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-lg font-semibold border-b-2 border-gray-300">
        Visualization
      </h2>

      <Perceptron />
    </div>
  );
}
