export enum DataStates {
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

export type DataState = keyof typeof DataStates;
