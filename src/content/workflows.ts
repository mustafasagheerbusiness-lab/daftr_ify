export const WORKFLOW_STAGES = [
  { id: "document", index: "STAGE 01", label: "Document", detail: "The file as it arrives" },
  { id: "process", index: "STAGE 02", label: "Process", detail: "AI-assisted extraction" },
  { id: "organize", index: "STAGE 03", label: "Organize", detail: "Structured & filed" },
  { id: "check", index: "STAGE 04", label: "Check", detail: "Consistency verified" },
  { id: "review", index: "STAGE 05", label: "Human review", detail: "A person decides" },
  { id: "clear", index: "STAGE 06", label: "Clear output", detail: "Ready to send" },
] as const;

export type WorkflowStageId = (typeof WORKFLOW_STAGES)[number]["id"];

export type WorkflowField = {
  label: string;
  value: string;
};

export type WorkflowFile = {
  id: string;
  code: string;
  title: string;
  tagline: string;
  before: string;
  after: string;
  turnaround: string;
  note?: string;
  meta: { label: string; value: string }[];
  fields: WorkflowField[];
};

export const WORKFLOW_FILES: WorkflowFile[] = [
  {
    id: "company-profile",
    code: "WF-01",
    title: "Company Profile",
    tagline: "One profile that opens doors.",
    before: "Company material scattered across emails, notes and old presentations.",
    after: "One clean profile — structured, consistent, ready to send.",
    turnaround: "6 days → 1 day",
    meta: [
      { label: "Status", value: "Filed" },
      { label: "Index", value: "A-04" },
      { label: "Owner", value: "GM" },
      { label: "Version", value: "01.2" },
    ],
    fields: [
      { label: "Company name", value: "Meridian Logistics (Pvt) Ltd" },
      { label: "Registration no", value: "0098712-K" },
      { label: "Sector", value: "Freight & Customs" },
      { label: "Established", value: "2016" },
      { label: "Licenses", value: "FBR · PRA · PSEB" },
    ],
  },
  {
    id: "sop",
    code: "WF-02",
    title: "Standard Operating Procedure",
    tagline: "Knowledge that survives the person.",
    before: "A critical process that lived in one person's head.",
    after: "A written SOP anyone can follow without asking.",
    turnaround: "Draft in a day · reviewed in two",
    meta: [
      { label: "Status", value: "Filed" },
      { label: "Index", value: "S-02" },
      { label: "Owner", value: "GM" },
      { label: "Version", value: "02.0" },
    ],
    fields: [
      { label: "Process", value: "Client onboarding" },
      { label: "Owner", value: "Ops manager" },
      { label: "Steps", value: "07" },
      { label: "Frequency", value: "Daily" },
      { label: "Last review", value: "Jan 2026" },
    ],
  },
  {
    id: "visa-readiness",
    code: "WF-03",
    title: "Visa Readiness",
    tagline: "Checked long before the deadline.",
    before: "High-stakes documents checked ad-hoc, the night before submission.",
    after: "A readiness workflow — checklist, verification, human review, stamped.",
    turnaround: "Night-before → 2-day runway",
    note: "A workflow example. Not a visa service.",
    meta: [
      { label: "Status", value: "Filed" },
      { label: "Index", value: "V-03" },
      { label: "Owner", value: "GM" },
      { label: "Version", value: "03.1" },
    ],
    fields: [
      { label: "Applicant", value: "Ayesha Khan" },
      { label: "Passport", value: "Valid — 8 mo" },
      { label: "Invitation", value: "Received" },
      { label: "Funds proof", value: "Verified" },
      { label: "Checklist", value: "12 / 12" },
    ],
  },
  {
    id: "proposal",
    code: "WF-04",
    title: "Business Proposal",
    tagline: "One final version, approved.",
    before: "Chaotic drafts, inconsistent formatting, missing sections.",
    after: "A polished, reviewed proposal — assembled, checked, approved.",
    turnaround: "3 drafts → 1 final",
    meta: [
      { label: "Status", value: "Filed" },
      { label: "Index", value: "P-04" },
      { label: "Owner", value: "GM" },
      { label: "Version", value: "01.4" },
    ],
    fields: [
      { label: "Client", value: "Al-Noor Trading" },
      { label: "Scope", value: "Distribution contract" },
      { label: "Budget", value: "PKR 1.2M" },
      { label: "Timeline", value: "Q4 2026" },
      { label: "Terms", value: "Net-30" },
    ],
  },
] as const;