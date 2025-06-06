type SelectOption = {
  value: string | number;
  label: string;
};

type BaseModelOption = {
  label: string;
  default?: string | number;
};

type SelectModelOption = BaseModelOption & {
  type: "select";
  options: SelectOption[];
  default?: string;
};

type NumberModelOption = BaseModelOption & {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  default?: number;
};

type StringModelOption = BaseModelOption & {
  type: "string";
  default?: string;
};

type ModelOption = SelectModelOption | NumberModelOption | StringModelOption;

export type ModelOptionGroup = {
  [key: string]: ModelOption;
};

type ModelDefinition = {
  label: string;
  initialization: ModelOptionGroup;
  hyperparameters: ModelOptionGroup;
};

export type ModelDictionary = {
  [modelName: string]: ModelDefinition;
};

export type ScatterPoint = {
  x1: number;
  x2: number;
  label?: number;
};

export type LossPoint = {
  epoch: number;
  loss: number;
};

export type Dataset = {
  X: number[][];
  y: number[];
};
