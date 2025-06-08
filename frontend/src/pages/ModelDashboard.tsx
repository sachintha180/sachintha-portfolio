import { useState } from "react";
import ModelDashboardHeader from "../components/modelDashboard/ModelDashboardHeader";
import { models } from "../lib/model";
import ModelForm from "../components/modelDashboard/ModelForm";
import ScatterPlot from "../components/ui/ScatterPlot";
import LossLinePlot from "../components/ui/LossLinePlot";
import { type Dataset } from "../types/Model";
import Perceptron from "../components/models/Perceptron";

export default function ModelDashboard() {
  // Initialize state for currently selected model and dataset
  const [currentModel, setCurrentModel] = useState<string>(
    Object.keys(models)[0],
  );
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);

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

  return (
    <div className="font-title relative flex h-screen w-screen flex-col overflow-hidden p-5">
      {/* Header - fixed height */}
      <div className="h-[150px] flex-shrink-0">
        <ModelDashboardHeader />
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
                    activationFunction={form["activationFunction"] as string}
                    inputCount={currentDataset ? currentDataset.X_dims[1] : 1}
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
                {/* Dataset Plot */}
                <div className="flex flex-1 flex-shrink-0 flex-col rounded-md bg-gray-100">
                  <h3 className="w-full rounded-t-md bg-green-300 px-2 py-1 text-sm font-semibold">
                    Dataset Plot
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
                      />
                    ) : (
                      <p className="text-[10pt] text-green-500">
                        Waiting for dataset to be generated.
                      </p>
                    )}
                  </div>
                </div>

                {/* Weight Component Curve */}
                <div className="flex flex-1 flex-shrink-0 flex-col rounded-md bg-gray-100">
                  <h3 className="w-full rounded-t-md bg-orange-300 px-2 py-1 text-sm font-semibold">
                    Weight Component Curve
                  </h3>
                  <div className="flex flex-1 items-center justify-center overflow-y-auto rounded-md bg-orange-100 p-2 text-xs text-gray-600">
                    {currentDataset ? (
                      <LossLinePlot
                        data={Array.from(
                          { length: form["epochs"] as number },
                          (_, i) => {
                            return {
                              epoch: i + 1,
                              loss: Math.exp(-i + 2),
                            };
                          },
                        )}
                        height={200}
                        width={350}
                        margin={{
                          left: 45,
                          bottom: 35,
                        }}
                        padding={0.2}
                      />
                    ) : (
                      <p className="text-[10pt] text-orange-500">
                        Waiting for dataset to be generated.
                      </p>
                    )}
                  </div>
                </div>

                {/* Loss & Accuracy Curve */}
                <div className="flex flex-1 flex-shrink-0 flex-col rounded-md bg-gray-100">
                  <h3 className="w-full rounded-t-md bg-red-300 px-2 py-1 text-sm font-semibold">
                    Loss & Accuracy Curve
                  </h3>
                  <div className="flex flex-1 items-center justify-center overflow-y-auto rounded-md bg-red-100 p-2 text-xs text-gray-600">
                    {currentDataset ? (
                      <LossLinePlot
                        data={Array.from(
                          { length: form["epochs"] as number },
                          (_, i) => {
                            return {
                              epoch: i + 1,
                              loss: Math.exp(-i + 2),
                            };
                          },
                        )}
                        height={200}
                        width={350}
                        margin={{
                          left: 45,
                          bottom: 35,
                        }}
                        padding={0.2}
                      />
                    ) : (
                      <p className="text-[10pt] text-red-500">
                        Waiting for dataset to be generated.
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
              <pre className="flex-1 overflow-y-auto rounded-md bg-gray-100 p-2 text-xs text-gray-600"></pre>
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
              setCurrentDataset={setCurrentDataset}
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
