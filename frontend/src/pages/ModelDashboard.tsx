import { useState } from "react";
import ModelDashboardHeader from "../components/modelDashboard/ModelDashboardHeader";
import { models } from "../lib/model";
import ModelForm from "../components/modelDashboard/ModelForm";

export default function ModelDashboard() {
  const [currentModel, setCurrentModel] = useState<string>("");

  return (
    <div className="font-title relative flex h-screen w-screen flex-col overflow-hidden p-5">
      {/* Header - fixed height */}
      <div className="h-[150px] flex-shrink-0">
        <ModelDashboardHeader />
      </div>

      {/* Content Area: Horizontal split below header */}
      <div className="flex h-0 flex-grow">
        {/* Visualization */}
        <div className="flex w-3/5 flex-col gap-3 px-3">
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
              <option value="" disabled>
                Please select a model
              </option>
              {Object.entries(models).map(([modelKey, modelDefinition]) => (
                <option key={modelKey} value={modelKey}>
                  {modelDefinition.label}
                </option>
              ))}
            </select>
          </div>

          {/* Model Display and Training Logs */}
          <div className="flex min-h-0 flex-1 gap-3">
            <div className="flex flex-1">
              {currentModel ? (
                models[currentModel].component
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-xl text-gray-400">
                    Waiting for model to be selected.
                  </p>
                </div>
              )}
            </div>
            <div className="flex w-[200px] flex-col rounded-md bg-gray-100">
              <h3 className="w-full rounded-t-md bg-gray-300 px-2 py-1 text-sm font-semibold">
                Training Logs
              </h3>
              <pre className="flex-1 overflow-y-auto rounded-md bg-gray-100 p-2 text-xs text-gray-600">
                Training stopped.
              </pre>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex h-full w-2/5 flex-col space-y-10 overflow-y-auto px-3 pb-2">
          {currentModel ? (
            <ModelForm
              initialization={models[currentModel].initialization}
              hyperparameters={models[currentModel].hyperparameters}
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
