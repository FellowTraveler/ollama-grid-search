// Represents the sets of params sent from the form
export interface IGridParams {
  experiment_uuid: string;
  models: string[];
  prompt: string;
  temperatureList: number[];
  repeatPenaltyList: number[];
  topKList: number[];
  topPList: number[];
  repeatLastNList: number[];
}

// Represents a single set of params to
// be used in inference
// * we should create a matching struct in the Rust code
export type TParamIteration = {
  experiment_uuid: string;
  model: string;
  prompt: string;
  temperature: number;
  repeat_penalty: number;
  top_k: number;
  top_p: number;
  repeat_last_n: number;
};

// Interface for the default configuration options
export interface IDefaultConfigs {
  server_url: string;
  system_prompt: string;
  // default_options: {
  //   [key: string]: number | string | boolean | string[];
  // };
  default_options: {
    [key: string]: any;
  };
}

// // Interface for the data returned from ollama-rs
// export type IResponsePayload = ResponsePayload | ErrorResponse;

export interface ErrorResponse {
  error: string;
}

export interface IResponsePayload {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
  repeat_last_n: number;
}

export interface IExperimentFile {
  name: string;
  created: {
    secs_since_epoch: number;
    nanos_since_epoch: number;
  };
  contents: string;
}
