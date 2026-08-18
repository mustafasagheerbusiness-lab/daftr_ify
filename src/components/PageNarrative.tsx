"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { SheetSlide } from "@/components/primitives/SheetSlide";
import { HeroScene } from "@/components/scenes/HeroScene";
import { MessScene } from "@/components/scenes/MessScene";

const MethodScene = dynamic(() =>
  import("@/components/scenes/MethodScene").then((m) => m.MethodScene),
);
const DemoScene = dynamic(() =>
  import("@/components/scenes/DemoScene").then((m) => m.DemoScene),
);
const HumanReviewScene = dynamic(() =>
  import("@/components/scenes/HumanReviewScene").then((m) => m.HumanReviewScene),
);
const OutcomesScene = dynamic(() =>
  import("@/components/scenes/OutcomesScene").then((m) => m.OutcomesScene),
);
const FounderScene = dynamic(() =>
  import("@/components/scenes/FounderScene").then((m) => m.FounderScene),
);
const PrivacyScene = dynamic(() =>
  import("@/components/scenes/PrivacyScene").then((m) => m.PrivacyScene),
);
const ContactScene = dynamic(() =>
  import("@/components/scenes/ContactScene").then((m) => m.ContactScene),
);

export function PageNarrative() {
  const messRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <HeroScene />
      <SheetSlide targetRef={messRef} />
      <div ref={messRef}>
        <MessScene />
      </div>
      <MethodScene />
      <DemoScene />
      <HumanReviewScene />
      <OutcomesScene />
      <FounderScene />
      <PrivacyScene />
      <ContactScene />
    </>
  );
}