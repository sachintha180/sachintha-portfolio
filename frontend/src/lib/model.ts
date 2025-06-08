import type { ModelDictionary } from "../types/Model";

export const models: ModelDictionary = {
  perceptron: {
    label: "Perceptron",
    initialization: {
      datasetType: {
        label: "Dataset",
        type: "select",
        options: [
          { value: "and", label: "AND" },
          { value: "or", label: "OR" },
          { value: "xor", label: "XOR" },
        ],
        default: "and",
      },
      numberOfPoints: {
        label: "Number of Points",
        type: "number",
        min: 10,
        max: 200,
        default: 100,
      },
      testTrainSplit: {
        label: "Test-Train Split",
        type: "number",
        min: 0.1,
        max: 0.9,
        default: 0.8,
        step: 0.1,
      },
    },
    hyperparameters: {
      learningRate: {
        label: "Learning Rate",
        type: "number",
        step: 0.01,
        min: 0.01,
        default: 0.1,
      },
    },
  },
};
