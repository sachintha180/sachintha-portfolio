import Perceptron from "./Perceptron";

export default function CentralCanvas() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="border-b-2 border-gray-300 text-lg font-semibold">
        Visualization
      </h2>

      <Perceptron />
    </div>
  );
}
