import React, { useState } from "react";
import type { ModelOptionGroup } from "../../types/Model";

type ModelFormProps = {
  initialization: ModelOptionGroup;
  hyperparameters: ModelOptionGroup;
};

export default function ModelForm({
  initialization,
  hyperparameters,
}: ModelFormProps) {
  // Unwrap initialization and hyperparameters into dictionary
  const initialValues: Record<string, string | number> = {};
  Object.entries({
    ...initialization,
    ...hyperparameters,
  }).forEach(([key, field]) => {
    initialValues[key] = field.default ?? "";
  });

  // Initialize form variables to initial values
  const [form, setForm] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<{ X: number[][], y: number[] } | null>(null);

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
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedData(null);

    const payload = {
      dataset: form.dataset, // 'dataset' key from initialization in model.tsx
      n: Number(form.numberOfPoints), // 'numberOfPoints' key
    };

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      if (result.error) {
        throw new Error(result.error);
      }
      
      setGeneratedData({ X: result.X, y: result.y });
      console.log("Generated data:", { X: result.X, y: result.y });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Failed to generate dataset:", err.message);
      } else {
        setError("An unknown error occurred.");
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
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Dataset"}
        </button>
        {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
        {generatedData && (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Generated Data:</h3>
            <pre className="mt-1 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
              {JSON.stringify(generatedData, null, 2)}
            </pre>
          </div>
        )}
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
