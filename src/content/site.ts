export const SITE = {
  name: "DAFTRIFY",
  tagline: "Document & Workflow Operations",
  positioning: "Turn messy work into clear workflows.",
  description:
    "Repetitive, document-heavy work — reorganized into faster, consistent, human-reviewed workflows. AI-assisted. Human-reviewed.",
  email: "daftrify.services@gmail.com",
  location: "Pakistan · Working globally",
  nav: [
    { label: "Workflow", href: "#method" },
    { label: "Workflows", href: "#workflows" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const EMAILS = {
  services: "daftrify.services@gmail.com",
  personal: "mustafasagheer.business@gmail.com",
} as const;

export const EMAIL_ROLES = {
  services: "Service inquiries & project intake",
  personal: "Personal / direct",
} as const;

export const WHATSAPP = {
  number: "+923187668851",
  message:
    "Assalamualaikum, mujhe DAFTRIFY ke saath ek documentation/workflow project discuss karna hai.",
} as const;

export function whatsappHref(): string {
  const digits = WHATSAPP.number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP.message)}`;
}

export const MESS_COSTS = [
  {
    id: "time",
    code: "COST 01 · TIME",
    title: "Hours lost",
    value: 14,
    suffix: " hrs",
    description: "Redoing work that should have been done once — every single week.",
  },
  {
    id: "errors",
    code: "COST 02 · ERRORS",
    title: "Resubmissions",
    value: 3,
    suffix: "×",
    description: "Rejections, corrections and versions that never seem to end.",
  },
  {
    id: "trust",
    code: "COST 03 · TRUST",
    title: "Missed deadlines",
    value: 1,
    suffix: " client",
    description: "A client lost to a deadline that slipped — quietly, at the worst moment.",
  },
] as const;