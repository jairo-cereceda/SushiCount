export type SessionRecord = {
  id: string;
  name: string;
  startedAt: string;
  endedAt: string;
  countersCreated: number;
  totalCount: number;
  counters: SessionCounter[];
};

export type SessionState = {
  id: string;
  name: string;
  startedAt: string;
};

export type SessionCounter = {
  id: string;
  label: string;
  count: number;
  imageUri?: string;
};
