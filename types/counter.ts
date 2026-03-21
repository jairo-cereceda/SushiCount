export type CounterStatus = "idle" | "loading" | "ready" | "error";

export type CounterItem = {
  id: string;
  label: string;
  count: number;
  status: CounterStatus;
  imageUri?: string;
  errorMessage?: string;
};
