export type MethodStep = {
  no: string;
  title: string;
  description: string;
  artifact: string;
};

export type MethodPhase = {
  id: string;
  label: string;
  index: string;
  steps: MethodStep[];
};

export const METHOD_PHASES: MethodPhase[] = [
  {
    id: "understand",
    label: "Understand",
    index: "PHASE 01",
    steps: [
      {
        no: "01",
        title: "Find the repetitive problem",
        description: "Name the task that eats hours every week — the one everyone dreads.",
        artifact: "A named problem",
      },
      {
        no: "02",
        title: "Map the existing workflow",
        description: "See exactly how the work is done today — by the people doing it, not by assumption.",
        artifact: "A workflow map",
      },
      {
        no: "03",
        title: "Build a small solution",
        description: "A first version. Small, concrete, done. Not a platform — a fix.",
        artifact: "A working draft",
      },
    ],
  },
  {
    id: "prove",
    label: "Prove",
    index: "PHASE 02",
    steps: [
      {
        no: "04",
        title: "Test with a real person or business",
        description: "Reality, not theory. One real user, one real batch of work.",
        artifact: "A live test",
      },
      {
        no: "05",
        title: "Measure whether it helps",
        description: "Before and after. Time, errors, consistency — measured, not guessed.",
        artifact: "Before / after",
      },
      {
        no: "06",
        title: "First paid pilot",
        description: "Someone pays for the outcome. That changes everything.",
        artifact: "A paid pilot",
      },
    ],
  },
  {
    id: "systemize",
    label: "Systemize",
    index: "PHASE 03",
    steps: [
      {
        no: "07",
        title: "Standardize the workflow",
        description: "Write the process down so it runs the same way every time.",
        artifact: "A written standard",
      },
      {
        no: "08",
        title: "Automate further",
        description: "AI-assisted processing for the repetitive parts. Humans keep the calls.",
        artifact: "A faster loop",
      },
      {
        no: "09",
        title: "Scale",
        description: "Repeat the same playbook in the next business, the next industry.",
        artifact: "The next workflow",
      },
    ],
  },
] as const;