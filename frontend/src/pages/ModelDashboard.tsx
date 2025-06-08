import { useState } from "react";
import ModelDashboardHeader from "../components/modelDashboard/ModelDashboardHeader";
import { models } from "../lib/model";
import ModelForm from "../components/modelDashboard/ModelForm";
import ScatterPlot from "../components/ui/ScatterPlot";
import LinePlot from "../components/ui/LinePlot";
import { type Dataset, type TrainItem } from "../types/Model";
import Perceptron from "../components/models/Perceptron";
import { FaPlay, FaQuestion, FaStepForward, FaUndo } from "react-icons/fa";
import { useToast } from "../contexts/ToastContext";

function formatTrainingLog(trace: TrainItem[]) {
  if (!trace || trace.length === 0) return "No training steps recorded yet.";

  return trace
    .map((step, index) => {
      return `Step ${index + 1}: ŷ = ${step.y_hat}, Accuracy = ${(step.accuracy * 100).toFixed(1)}%`;
    })
    .join("\n");
}

export default function ModelDashboard() {
  // Initialize state for currently selected model, dataset and training items
  const [currentModel, setCurrentModel] = useState<string>(
    Object.keys(models)[0],
  );
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);
  const [currentTraining, setCurrentTraining] = useState<TrainItem[]>([]);

  // Initialize context variables for Toast
  const { showToast } = useToast();

  // Initialize state for control buttons
  const [isBatchLoading, setIsBatchLoading] = useState(true);
  const [isStepLoading, setIsStepLoading] = useState(true);
  const [isResetLoading, _setIsResetLoading] = useState(true);
  const [isQueryLoading, _setIsQueryLoading] = useState(true);

  // Unwrap initialization and hyperparameters into dictionary
  const initialValues: Record<string, string | number> = {};
  Object.entries({
    ...models[currentModel].initialization,
    ...models[currentModel].hyperparameters,
  }).forEach(([key, field]) => {
    initialValues[key] = field.default ?? "";
  });

  // Initialize state for all form variables
  const [form, setForm] = useState(initialValues);

  // Event handler for submitting the form to train one step
  const handleTrainingStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsStepLoading(true);

    const payload = {
      model: currentModel,
      learningRate: Number(form.learningRate),
    };

    try {
      // Send request to API endpoint
      const response = await fetch("http://localhost:5000/api/models/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // Parse and validate response
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`,
        );
      }
      if (result.error) {
        throw new Error(result.error);
      }

      // Append result to training trace
      setCurrentTraining((prev) => {
        return [
          ...prev,
          {
            z: result.z,
            w: result.w,
            b: result.b,
            y_hat: result.y_hat,
            idx: result.idx,
            x_i: result.x_i,
            y_i: result.y_i,
            accuracy: result.accuracy,
          },
        ];
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to evaluate training step:", err.message);
        showToast({
          type: "error",
          message: err.message,
        });
      } else {
        showToast({
          type: "error",
          message:
            "Failed to evaluate training step: An unknown error occurred.",
        });
        console.error(
          "Failed to evaluate training step: An unknown error occurred.",
        );
      }
    } finally {
      setIsStepLoading(false);
    }
  };

  // Event handler for submitting the form to train entire batch
  const handleBatchTraining = async () => {
    let intervalId: any | null = null;
    setIsBatchLoading(true);
    setIsStepLoading(true);

    const payload = {
      model: currentModel,
      learningRate: Number(form.learningRate),
    };

    const trainOnce = async () => {
      try {
        // Send request to API endpoint
        const response = await fetch("http://localhost:5000/api/models/train", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        // Parse and validate response
        const result = await response.json();
        if (!response.ok || result.error) {
          if (
            result.error === "All training examples have been processed" &&
            intervalId
          ) {
            clearInterval(intervalId);
            setIsStepLoading(false);
          }
          throw new Error(result.error || `HTTP error: ${response.status}`);
        }

        // Append result to training trace
        setCurrentTraining((prev) => [
          ...prev,
          {
            z: result.z,
            w: result.w,
            b: result.b,
            y_hat: result.y_hat,
            idx: result.idx,
            x_i: result.x_i,
            y_i: result.y_i,
            accuracy: result.accuracy,
          },
        ]);
      } catch (err) {
        if (intervalId) clearInterval(intervalId);
        setIsStepLoading(false);

        const message =
          err instanceof Error ? err.message : "Unknown training error.";
        console.error("Batch training error:", message);
        showToast({ type: "error", message });
      }
    };

    // Begin looped training every 500ms
    intervalId = setInterval(trainOnce, 500);
  };

  // Prepare weight and biases line data
  const wbLineData = [
    currentTraining.map((item, i) => ({ x: i, y: item.w[0] })),
    currentTraining.map((item, i) => ({ x: i, y: item.w[1] })),
    currentTraining.map((item, i) => ({ x: i, y: item.b })),
  ];

  // Prepare testing accuracy line data
  const accuracyLineData = [
    currentTraining.map((item, i) => ({ x: i, y: item.accuracy * 100 })),
  ];

  // Prepare perceptron labels and boundary values
  let perceptronLabels = null;
  let boundaryValues = null;
  const t = currentTraining[currentTraining.length - 1];
  if (t) {
    perceptronLabels = {
      x: t.x_i.map((x) => x.toFixed(1)),
      w: t.w.map((x) => x.toFixed(1)),
      b: t.b.toFixed(1),
      z: t.z.toFixed(1),
      y_hat: t.y_hat.toFixed(1),
    };

    boundaryValues = { w1: t.w[0], w2: t.w[1], b: t.b };
  }

  return (
    <div className="font-title relative flex h-screen w-screen flex-col overflow-hidden p-5">
      {/* Header - fixed height */}
      <div className="h-[150px] flex-shrink-0">
        <ModelDashboardHeader>
          {/* Control Buttons */}
          <div className="flex gap-3">
            {/* Train Button */}
            <button
              onClick={handleBatchTraining}
              disabled={isBatchLoading}
              className={`flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-green-600 pt-1 text-white hover:bg-green-700 disabled:opacity-50 ${isBatchLoading && "pointer-events-none"}`}
            >
              <FaPlay size={20} />
              <span className="text-sm">Train</span>
            </button>

            {/* Step Button */}
            <button
              onClick={handleTrainingStep}
              disabled={isStepLoading}
              className={`flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-amber-600 pt-1 text-white hover:bg-amber-700 disabled:opacity-50 ${isStepLoading && "pointer-events-none"}`}
            >
              <FaStepForward size={20} />
              <span className="text-sm">Step</span>
            </button>

            {/* Reset Button */}
            <button
              disabled={isResetLoading}
              className={`flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-red-600 pt-1 text-white hover:bg-red-700 disabled:opacity-50 ${isResetLoading && "pointer-events-none"}`}
            >
              <FaUndo size={20} />
              <span className="text-sm">Reset</span>
            </button>

            {/* Query Button */}
            <button
              disabled={isQueryLoading}
              className={`flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-blue-600 pt-1 text-white hover:bg-blue-700 disabled:opacity-50 ${isQueryLoading && "pointer-events-none"}`}
            >
              <FaQuestion size={20} />
              <span className="text-sm">Query</span>
            </button>
          </div>
        </ModelDashboardHeader>
      </div>

      {/* Content Area: Horizontal split below header */}
      <div className="flex h-0 flex-grow">
        {/* Visualization */}
        <div className="flex flex-1 flex-col gap-3 px-3">
          <div className="space-y-2">
            <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
              Visualization
            </h2>

            {/* Model Selector */}
            <label htmlFor="model" className="block text-sm font-medium">
              Model
            </label>
            <select
              id="model"
              className="w-full rounded border-2 border-gray-400 p-2"
              defaultValue={currentModel}
              onChange={(e) => setCurrentModel(e.currentTarget.value)}
            >
              {Object.entries(models).map(([modelKey, modelDefinition]) => (
                <option key={modelKey} value={modelKey}>
                  {modelDefinition.label}
                </option>
              ))}
            </select>
          </div>

          {/* Model Display Row (Model Viz + Plots on Left, Training Logs on Right) */}
          <div className="flex min-h-0 flex-1 gap-3">
            {/* Left Column: Model Visualization and Plots */}
            <div className="flex flex-1 flex-col gap-3">
              {/* Upper part: Model Visualization */}
              <div className="flex min-h-0 flex-1">
                {currentModel === "perceptron" ? (
                  <Perceptron
                    inputCount={currentDataset ? currentDataset.X_dims[1] : 1}
                    labels={perceptronLabels || undefined}
                  />
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <p className="text-xl text-gray-400">
                      Waiting for model to be selected.
                    </p>
                  </div>
                )}
              </div>

              {/* Lower part: Row for the three plots */}
              <div className="flex h-[250px] flex-shrink-0 gap-3">
                {/* Training Dataset Plot */}
                <div className="flex flex-1 flex-shrink-0 flex-col rounded-md bg-gray-100">
                  <h3 className="w-full rounded-t-md bg-green-300 px-2 py-1 text-sm font-semibold">
                    Training Dataset Plot{" "}
                    {currentDataset && `(n = ${currentDataset.X_dims[0]})`}
                  </h3>
                  <div className="flex flex-1 items-center justify-center overflow-y-auto rounded-md bg-green-100 p-2 text-xs text-gray-600">
                    {currentDataset ? (
                      <ScatterPlot
                        data={
                          currentDataset
                            ? currentDataset.X_train.map((x, i) => {
                                return {
                                  x1: x[0],
                                  x2: x[1],
                                  label: currentDataset.y_train[i],
                                };
                              })
                            : []
                        }
                        height={200}
                        width={350}
                        padding={0.1}
                        margin={{
                          left: 45,
                          bottom: 35,
                        }}
                        boundary={boundaryValues || undefined}
                      />
                    ) : (
                      <p className="text-[10pt] text-green-500">
                        Waiting for dataset to be generated.
                      </p>
                    )}
                  </div>
                </div>

                {/* Weight & Bias Component Curve */}
                <div className="flex flex-1 flex-shrink-0 flex-col rounded-md bg-gray-100">
                  <h3 className="w-full rounded-t-md bg-orange-300 px-2 py-1 text-sm font-semibold">
                    Weight & Bias Component Curve{" "}
                    {currentTraining.length > 0 &&
                      `(i = ${currentTraining.length})`}
                  </h3>
                  <div className="flex flex-1 items-center justify-center overflow-y-auto rounded-md bg-orange-100 p-2 text-xs text-gray-600">
                    {currentDataset && currentTraining.length ? (
                      <LinePlot
                        data={wbLineData}
                        colors={["#15803D", "#2563EB", "#7C3AED"]}
                        legend={["w₁", "w₂", "b"]}
                        height={200}
                        width={350}
                        label={{
                          x: "Example",
                          y: "Value",
                        }}
                        margin={{
                          left: 70,
                          bottom: 35,
                        }}
                        padding={0.2}
                      />
                    ) : (
                      <p className="text-[10pt] text-orange-500">
                        Waiting for at least one training step.
                      </p>
                    )}
                  </div>
                </div>

                {/* Loss & Testing Accuracy Curve */}
                <div className="flex flex-1 flex-shrink-0 flex-col rounded-md bg-gray-100">
                  <h3 className="w-full rounded-t-md bg-red-300 px-2 py-1 text-sm font-semibold">
                    Testing Accuracy Curve{" "}
                    {currentTraining.length > 0 &&
                      `(i = ${currentTraining.length})`}
                  </h3>
                  <div className="flex flex-1 items-center justify-center overflow-y-auto rounded-md bg-red-100 p-2 text-xs text-gray-600">
                    {currentDataset && currentTraining.length ? (
                      <LinePlot
                        data={accuracyLineData}
                        colors={["#FF4136"]}
                        height={200}
                        width={350}
                        label={{
                          x: "Example",
                          y: "%",
                        }}
                        margin={{
                          left: 50,
                          bottom: 35,
                        }}
                        padding={1}
                      />
                    ) : (
                      <p className="text-[10pt] text-red-500">
                        Waiting for at least one training step.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Training Logs (maintains full height of its parent row) */}
            <div className="flex w-[250px] flex-col rounded-md bg-gray-100">
              <h3 className="w-full rounded-t-md bg-gray-300 px-2 py-1 text-sm font-semibold">
                Training Logs
              </h3>
              <pre className="flex-1 overflow-y-auto rounded-md bg-gray-100 p-2 text-xs text-gray-600">
                {formatTrainingLog(currentTraining)}
              </pre>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex h-full w-[400px] flex-col space-y-10 overflow-y-auto px-3 pb-2">
          {currentModel ? (
            <ModelForm
              initialization={models[currentModel].initialization}
              hyperparameters={models[currentModel].hyperparameters}
              form={form}
              setForm={setForm}
              currentModel={currentModel}
              setCurrentDataset={setCurrentDataset}
              setCurrentTraining={setCurrentTraining}
              setIsStepLoading={setIsStepLoading}
              setIsBatchLoading={setIsBatchLoading}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-xl text-gray-400">
                Waiting for model to be selected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
