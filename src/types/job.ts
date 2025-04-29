export type TJob = {
  id: number;
  name: string;
  url: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: "success" | "failed" | "running" | "pending";
  active: boolean;
  created: string;
};
