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

        <button className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
          Generate Dataset
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
