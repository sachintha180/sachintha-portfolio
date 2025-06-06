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
  component: React.ReactNode;
  initialization: ModelOptionGroup;
  hyperparameters: ModelOptionGroup;
};

export type ModelDictionary = {
  [modelName: string]: ModelDefinition;
};
