// SidebarLeft.tsx

export default function SidebarLeft() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold border-b-2 border-gray-300 mb-4">
        Initialization
      </h2>

      <label htmlFor="model" className="block text-sm font-medium">
        Model
      </label>
      <select
        id="model"
        className="w-full p-2 border-2 border-gray-400 rounded"
      >
        <option value="perceptron">Perceptron</option>
      </select>

      <label htmlFor="dataset" className="block text-sm font-medium">
        Dataset
      </label>
      <select
        id="dataset"
        className="w-full p-2 border-2 border-gray-400 rounded"
      >
        <option value="and">AND</option>
        <option value="or">OR</option>
        <option value="linear">Linearly Separable</option>
        <option value="xor">XOR (for failure demo)</option>
      </select>

      <label htmlFor="numberOfPoints" className="block text-sm font-medium">
        Number of Points
      </label>
      <input
        id="numberOfPoints"
        type="number"
        min={10}
        max={500}
        defaultValue={100}
        className="w-full p-2 border-2 border-gray-400 rounded"
      />

      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Generate Dataset
      </button>
    </div>
  );
}
