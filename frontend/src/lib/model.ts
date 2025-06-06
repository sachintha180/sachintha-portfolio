import type { ModelDictionary } from "../types/Model";

export const models: ModelDictionary = {
  perceptron: {
    label: "Perceptron",
    initialization: {
      dataset: {
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
        max: 500,
        default: 100,
      },
    },
    hyperparameters: {
      activationFunction: {
        label: "Activation Function",
        type: "select",
        options: [
          { value: "sigmoid", label: "Sigmoid" },
          { value: "relu", label: "ReLU" },
        ],
        default: "sigmoid",
      },
      learningRate: {
        label: "Learning Rate",
        type: "number",
        step: 0.01,
        default: 0.1,
      },
      epochs: {
        label: "Epochs",
        type: "number",
        min: 1,
        max: 1000,
        default: 10,
      },
    },
  },
};
