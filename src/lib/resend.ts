export type IntakeSubmission = {
  name: string;
  email: string;
  industry: string;
  task: string;
  current: string;
  doneWell: string;
  timeline: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

const RESEND_URL = "https://api.resend.com/emails";

export async function sendIntakeEmail(submission: IntakeSubmission): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !from || !to) {
    return { ok: false, error: "Email service is not configured." };
  }

  const text = [
    `New intake submission — ${submission.name}`,
    "",
    `Email: ${submission.email}`,
    `Business / industry: ${submission.industry || "—"}`,
    `Task: ${submission.task}`,
    `How it's done today: ${submission.current || "—"}`,
    `What done well looks like: ${submission.doneWell || "—"}`,
    `Timeline: ${submission.timeline || "—"}`,
  ].join("\n");

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: submission.email,
        subject: `New DAFTRIFY intake — ${submission.name}`,
        text,
      }),
    });

    if (!response.ok) {
      return { ok: false, error: `Email service returned ${response.status}.` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Email service is unreachable." };
  }
}