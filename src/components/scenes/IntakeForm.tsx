"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { EMAILS } from "@/content/site";
import { MonoLabel } from "@/components/primitives/MonoLabel";

type FieldType = "text" | "email" | "textarea";

type Field = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
};

const FIELDS: Field[] = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "industry",
    label: "Business / industry",
    type: "text",
    required: false,
    placeholder: "Consultancy",
  },
  {
    name: "task",
    label: "The repetitive task that costs the most time",
    type: "textarea",
    required: true,
    placeholder: "Document verification for client files",
  },
  {
    name: "current",
    label: "How it's done today",
    type: "textarea",
    required: false,
    placeholder: "One line — emails, spreadsheets, WhatsApp…",
  },
  {
    name: "doneWell",
    label: "What done well looks like",
    type: "textarea",
    required: false,
    placeholder: "Files ready in a day, approved, consistent",
  },
  {
    name: "timeline",
    label: "Timeline (optional)",
    type: "text",
    required: false,
    placeholder: "In the next month",
  },
];

type Status = "idle" | "sending" | "success" | "error";

export function IntakeForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const json = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(json?.error ?? "Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper-50 p-6 text-ink-950 shadow-lift sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <MonoLabel className="text-ink-950/60">
          Intake form · Step 01 / 09
        </MonoLabel>
        <MonoLabel className="text-stamp-700">Status: Open</MonoLabel>
      </div>

      <div className="mt-8 flex flex-col gap-7">
        {FIELDS.map((field) => {
          const id = `intake-${field.name}`;
          const label = field.required ? `${field.label} *` : field.label;

          return (
            <div key={field.name}>
              <label
                htmlFor={id}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] opacity-70"
              >
                {label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={3}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="mt-2 w-full resize-none border-b border-ink-950/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-ink-950"
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="mt-2 w-full border-b border-ink-950/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-ink-950"
                />
              )}
            </div>
          );
        })}

        <div className="hidden" aria-hidden="true">
          <label htmlFor="intake-company">Company</label>
          <input
            id="intake-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-8 w-full disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? "Submitting…" : "Submit for review"}
      </button>

      <p role="status" aria-live="polite" className="mt-5 min-h-4 font-mono text-xs uppercase tracking-[0.2em]">
        {status === "success"
          ? "Received · In review — we'll reply within 24 hours."
            : status === "error"
              ? `Something went wrong. Please email ${EMAILS.services} directly.`
              : ""}
      </p>
    </form>
  );
}