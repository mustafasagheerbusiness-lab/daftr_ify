export type Metric = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
};

export const METRICS: Metric[] = [
  {
    id: "turnaround",
    value: 5,
    suffix: "×",
    label: "Faster document turn-around",
    note: "Measured after a pilot — not promised",
  },
  {
    id: "resubmissions",
    value: 80,
    suffix: "%",
    label: "Fewer resubmissions and corrections",
    note: "Pilot measurement",
  },
  {
    id: "hours",
    value: 12,
    prefix: "~",
    suffix: "h",
    label: "Back to the business every week",
    note: "Per workflow, once standardized",
  },
  {
    id: "consistency",
    value: 100,
    suffix: "%",
    label: "Consistent, on-standard output",
    note: "The same file quality, every time",
  },
] as const;

export type RoadmapItem = {
  id: string;
  label: string;
  status: "now" | "next" | "later";
};

export const ROADMAP: RoadmapItem[] = [
  { id: "consultancy", label: "Consultancy", status: "now" },
  { id: "education", label: "Education", status: "next" },
  { id: "agencies", label: "Agencies", status: "later" },
  { id: "real-estate", label: "Real Estate", status: "later" },
  { id: "hr-admin", label: "HR & Admin", status: "later" },
  { id: "legal", label: "Legal Ops", status: "later" },
] as const;

export const SCOPE_LINE =
  "One workflow at a time — starting in consultancy, built for document-heavy work everywhere.";