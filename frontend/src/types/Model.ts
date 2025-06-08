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

type InitializationOptions = {
  datasetType: SelectModelOption;
  numberOfPoints: NumberModelOption;
  testTrainSplit: NumberModelOption;
};

export type ModelOptionGroup = {
  [key: string]: ModelOption;
};

type ModelDefinition = {
  label: string;
  initialization: InitializationOptions;
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

export type Point = {
  x: number;
  y: number;
};

export type Dataset = {
  X_train: number[][];
  y_train: number[];
  X_test: number[][];
  y_test: number[];
  X_dims: number[];
};

export type PerceptronTrainItem = {
  z: number;
  w: number[];
  b: number;
  y_hat: number;
  idx: number;
  x_i: number[];
  y_i: number;
  accuracy: number;
};

export type TrainItem = PerceptronTrainItem;
