import React, { useState } from "react";
import type { Dataset, ModelOptionGroup, TrainItem } from "../../types/Model";
import { useToast } from "../../contexts/ToastContext";

type ModelFormProps = {
  initialization: ModelOptionGroup;
  hyperparameters: ModelOptionGroup;
  form: Record<string, string | number>;
  setForm: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
  currentModel: string;
  setCurrentDataset: React.Dispatch<React.SetStateAction<Dataset | null>>;
  setCurrentTraining: React.Dispatch<React.SetStateAction<TrainItem[]>>;
  setIsStepLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBatchLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModelForm({
  initialization,
  hyperparameters,
  form,
  setForm,
  currentModel,
  setCurrentDataset,
  setCurrentTraining,
  setIsStepLoading,
  setIsBatchLoading,
}: ModelFormProps) {
  // Initialize loading state variable
  const [isLoading, setIsLoading] = useState(false);

  // Initialize context variables for Toast
  const { showToast } = useToast();

  // Event handler to handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "number" ? +value : value,
    }));
  };

  // Event handler for submitting the form to generate dataset
  const handleGenerateDataset = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentDataset(null);

    const payload = {
      model: currentModel,
      datasetType: form.datasetType,
      numberOfPoints: Number(form.numberOfPoints),
      testTrainSplit: Number(form.testTrainSplit),
    };

    try {
      // Send request to API endpoint
      const response = await fetch("/api/data/generate", {
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

      // Update current dataset state
      setCurrentDataset({
        X_train: result.X_train,
        y_train: result.y_train,
        X_test: result.X_test,
        y_test: result.y_train,
        X_dims: result.X_dims,
      });

      // Allow for normal control buttons
      setIsBatchLoading(false);
      setIsStepLoading(false);

      // Clear all training
      setCurrentTraining([]);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to generate dataset:", err.message);
        showToast({
          type: "error",
          message: err.message,
        });
      } else {
        showToast({
          type: "error",
          message: "Failed to generate dataset: An unknown error occurred.",
        });
        console.error("Failed to generate dataset: An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Initialization Controls */}
      <div className="space-y-2">
        <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
          Initialization
        </h2>
        {Object.entries(initialization).map(([key, field]) => {
          if (field.type === "select") {
            return (
              <React.Fragment key={key}>
                <label htmlFor={key} className="block text-sm font-medium">
                  {field.label}
                </label>
                <select
                  id={key}
                  name={key}
                  className="w-full rounded border-2 border-gray-400 p-2"
                  value={form[key]}
                  onChange={handleChange}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </React.Fragment>
            );
          }
          if (field.type === "number") {
            return (
              <React.Fragment key={key}>
                <label htmlFor={key} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={key}
                  name={key}
                  type="number"
                  className="w-full rounded border-2 border-gray-400 p-2"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={form[key]}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
          if (field.type === "string") {
            return (
              <React.Fragment key={key}>
                <label htmlFor={key} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  className="w-full rounded border-2 border-gray-400 p-2"
                  value={form[key]}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
          return null;
        })}

        <button
          onClick={handleGenerateDataset}
          disabled={isLoading}
          className={`mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50 ${isLoading && "pointer-events-none"}`}
        >
          {isLoading ? "Generating..." : "Generate Dataset"}
        </button>
      </div>

      {/* Hyperparameters Controls */}
      <div className="space-y-2">
        <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
          Hyperparameters
        </h2>
        {Object.entries(hyperparameters).map(([key, field]) => {
          if (field.type === "select") {
            return (
              <React.Fragment key={key}>
                <label htmlFor={key} className="block text-sm font-medium">
                  {field.label}
                </label>
                <select
                  id={key}
                  name={key}
                  className="w-full rounded border-2 border-gray-400 p-2"
                  value={form[key]}
                  onChange={handleChange}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </React.Fragment>
            );
          }
          if (field.type === "number") {
            return (
              <React.Fragment key={key}>
                <label htmlFor={key} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={key}
                  name={key}
                  type="number"
                  className="w-full rounded border-2 border-gray-400 p-2"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={form[key]}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
          if (field.type === "string") {
            return (
              <React.Fragment key={key}>
                <label htmlFor={key} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  className="w-full rounded border-2 border-gray-400 p-2"
                  value={form[key]}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
