"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

export interface FaqAccordionItem {
  question: string;
  answer: ReactNode;
}

/**
 * Single-open accordion. Each question is a real button with aria-expanded
 * and aria-controls. Closed panels are inert, so their links cannot be
 * tabbed to or read by screen readers. The height animates in both
 * directions with a grid-rows transition, and respects reduced motion.
 */
export function FaqAccordion({ faqs }: { faqs: readonly FaqAccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="grid gap-2">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <div key={faq.question} className="card overflow-hidden">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="disclosure-row flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-3 text-left font-semibold md:px-6"
              >
                <span className="flex-1 text-[16px]">{faq.question}</span>
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]"
                  style={{
                    backgroundColor: "var(--color-accent-soft)",
                    color: "var(--color-accent)",
                  }}
                  aria-hidden="true"
                >
                  <Icon
                    name="chevron"
                    className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none${isOpen ? " rotate-180" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 pt-1 text-left text-[15px] leading-relaxed text-[color:var(--color-muted)] md:px-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
