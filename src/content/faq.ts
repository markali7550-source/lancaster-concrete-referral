/**
 * Content for the dedicated /faq page.
 *
 * Answers are plain text. The same strings feed the visible accordion and
 * the FAQPage JSON-LD schema, so the two cannot drift apart.
 *
 * Categories group questions by topic. The page renders them in this order.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  faqs: FaqItem[];
}

export const faqCategories: readonly FaqCategory[] = [
  {
    id: "general-estimates",
    name: "General & Estimates",
    faqs: [
      {
        question: "Do you provide free project estimates?",
        answer:
          "Yes, 100% free with no obligation. Simply submit your project details online or call us directly. We will review your site requirements and pass them to an eligible local provider, who will give you an upfront, transparent quote.",
      },
      {
        question: "What areas in Lancaster County do you service?",
        answer:
          "We proudly serve homeowners and businesses in the City of Lancaster, SC, and nearby communities including Kershaw, Heath Springs, Van Wyck, and Buford, where a participating provider has approved coverage in writing.",
      },
      {
        question: "Are all contractors licensed and insured?",
        answer:
          "Work is performed by independent local concrete providers, not by us. Each provider is responsible for its own licensing, bonding, and insurance, and for building to South Carolina codes and industry standards. Ask any provider for proof before you sign.",
      },
    ],
  },
  {
    id: "services-scope",
    name: "Services & Project Scope",
    faqs: [
      {
        question: "What types of concrete projects do you handle?",
        answer:
          "Our network of local providers handles a comprehensive range of residential and commercial concrete work, including driveways, patios, walkways, pool decks, foundations, garage slabs, aprons, concrete repairs, leveling, and resurfacing.",
      },
      {
        question: "Do you offer decorative and stamped concrete?",
        answer:
          "Yes! In addition to standard smooth and broom finishes, we specialize in stamped patterns (ashlar slate, cobblestone, wood plank), custom integral colors, stains, and exposed aggregate finishes.",
      },
      {
        question: "Do you handle the demolition and haul-away of old concrete?",
        answer:
          "Yes. Providers in our network offer complete turnkey service. They break up and haul away existing damaged concrete, excavate, grade the ground, and install a compacted gravel sub-base before pouring new concrete.",
      },
      {
        question: "Can I combine multiple projects into one job?",
        answer:
          "Absolutely. Many clients combine a new driveway with a matching front walkway or a backyard patio. Bundling projects often saves both time and cost on site preparation.",
      },
    ],
  },
  {
    id: "timeline-curing-maintenance",
    name: "Timeline, Curing & Maintenance",
    faqs: [
      {
        question: "How long does a typical concrete project take to complete?",
        answer:
          "Most residential driveways, patios, and walkways take 1 to 3 days to complete, depending on project size, excavation needs, and weather conditions.",
      },
      {
        question: "When can I walk and drive on newly poured concrete?",
        answer:
          "You can walk on new concrete after 24 to 48 hours. For vehicles, driveways, and heavy equipment, you must wait at least 7 full days for the concrete to reach sufficient strength.",
      },
      {
        question: "How should I maintain and protect my concrete?",
        answer:
          "We recommend applying a commercial-grade concrete sealer every 2 to 3 years to protect against moisture penetration, oil stains, and damage caused by winter freeze-thaw cycles and de-icing salts.",
      },
    ],
  },
];

/** Plain-text flattening for the FAQPage schema. Same strings, no markup. */
export const allFaqsPlain: { question: string; answer: string }[] =
  faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
