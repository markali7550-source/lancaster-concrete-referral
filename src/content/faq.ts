/**
 * Content for the dedicated /faq page.
 *
 * Every answer is plain text and stays under 80 words, so the same strings
 * feed both the visible accordion and the FAQPage JSON-LD schema with no
 * drift between them. `links` mark exact substrings of `answer` that render
 * as internal links; the schema keeps the unlinked sentence, which is why
 * parity holds. Only published routes appear here.
 */
export interface FaqLink {
  /** Exact substring of the answer to linkify. */
  text: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  links: FaqLink[];
}

export interface FaqCategory {
  id: string;
  name: string;
  faqs: FaqItem[];
  /** Closing link under the accordion. Present on every category. */
  more: { text: string; href: string };
}

export const faqCategories: readonly FaqCategory[] = [
  {
    id: "general",
    name: "General questions",
    more: { text: "Read our referral disclosure", href: "/referral-disclosure" },
    faqs: [
      {
        question: "Do you pour concrete or employ contractors?",
        answer:
          "Neither. We are a referral service: we collect your project details, check them against participating providers with written coverage for your area, and route the request to one independent contractor. That contractor inspects, quotes, schedules, and performs the work under a contract with you, not with us. See how the referral process works.",
        links: [{ text: "how the referral process works", href: "/how-it-works" }],
      },
      {
        question: "Why use a referral service instead of calling contractors directly?",
        answer:
          "Calling around means repeating your project to every contractor and guessing who actually covers your area. We take your details once, check them against providers with written coverage for your area, and route the request to one eligible contractor. If that contractor does not acknowledge it, the request is reassigned once.",
        links: [{ text: "route the request", href: "/how-it-works" }],
      },
      {
        question: "How quickly will a provider contact me?",
        answer:
          "The assigned contractor contacts you directly within their contracted response window. We do not set their schedule, so timing varies by provider and workload. If the first contractor does not acknowledge your request, it is reassigned once to another eligible provider.",
        links: [],
      },
    ],
  },
  {
    id: "concrete-driveways",
    name: "Concrete driveways",
    more: { text: "Read the Concrete Driveways guide", href: "/services/concrete-driveways" },
    faqs: [
      {
        question: "What is involved in a concrete driveway project?",
        answer:
          "Most driveway projects are either a first pour over gravel or a full replacement of a failed slab, including demolition and haul away. The contractor measures the site, checks mixer access and drainage, prepares the subbase, sets forms, pours, and cuts control joints. Read what counts as a driveway job for the full scope.",
        links: [{ text: "what counts as a driveway job", href: "/services/concrete-driveways" }],
      },
      {
        question: "When might a concrete driveway need replacement?",
        answer:
          "Replacement usually enters the conversation when cracking spreads across most panels, sections have settled unevenly, or the subbase has failed. Isolated surface cracks on a sound, level slab often do not require it. Only the contractor who inspects the slab can make that call.",
        links: [],
      },
      {
        question: "How do I get connected with a driveway service provider?",
        answer:
          "Submit a request with the length of the drive and whether the old slab has to come out. We check it against participating providers with written coverage for your area and route it to one eligible contractor, who contacts you directly to inspect and quote.",
        links: [{ text: "Submit a request", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-patios",
    name: "Concrete patios",
    more: { text: "Read the Concrete Patios guide", href: "/services/concrete-patios" },
    faqs: [
      {
        question: "What should I consider before installing a concrete patio?",
        answer:
          "Size the footprint around furniture and door swing, note where rainwater runs, and check side access width for equipment. Decide the finish before comparing quotes, since a stamped slab and a broom finish are priced as different projects. Locate irrigation lines in the area too.",
        links: [],
      },
      {
        question: "What options are available for a concrete patio?",
        answer:
          "Contractors typically offer broom, smooth trowel, stamped pattern, and integrally colored finishes, plus sealing on decorative work. Stamped and colored work is only routed where a participating provider has documented that capability. Finish, color, and edge detail are priced before the pour.",
        links: [{ text: "Stamped and colored work", href: "/services/concrete-patios" }],
      },
      {
        question: "How can I request a referral for patio work?",
        answer:
          "Send the rough size through our contact page, and say whether the patio ties into an existing porch or stoop. Your request goes to a single participating provider with written coverage for your area, not a panel of bidders. The provider then walks the space with you and quotes directly.",
        links: [{ text: "contact page", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-slabs",
    name: "Concrete slabs",
    more: { text: "Read the Concrete Slabs guide", href: "/services/concrete-slabs" },
    faqs: [
      {
        question: "What are concrete slabs commonly used for?",
        answer:
          "Residential slabs and pads carry sheds, outbuildings, HVAC units, generators, and parked vehicles or trailers. We route nonstructural work only: house foundations, footings, and engineered structural slabs are declined rather than passed to a finisher.",
        links: [{ text: "nonstructural work only", href: "/services/concrete-slabs" }],
      },
      {
        question: "What should be considered before a slab project?",
        answer:
          "Start with the load: what sits on the pad decides thickness, reinforcement, and base depth. Confirm the exact footprint plus required overhang, check ground fall and access width, and locate buried utilities. Share any supplier base requirements with the contractor.",
        links: [],
      },
      {
        question: "How can I get connected with a qualified service provider?",
        answer:
          "Submit a request saying what the pad has to carry and roughly where it goes. We route it to one provider with written coverage for your area, who confirms the specification on site. We never specify thickness or reinforcement ourselves.",
        links: [{ text: "Submit a request", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-repair",
    name: "Concrete repair",
    more: { text: "Read the Concrete Repair guide", href: "/services/concrete-repair" },
    faqs: [
      {
        question: "What types of concrete problems may need repair?",
        answer:
          "We route nonstructural problems on otherwise sound slabs: shrinkage cracks, surface spalling, crazing, worn finishes, and failing joint sealant. Movement, heaving, height differences across cracks, and load failure need a licensed professional assessment instead.",
        links: [{ text: "nonstructural problems", href: "/services/concrete-repair" }],
      },
      {
        question: "When should concrete be repaired instead of replaced?",
        answer:
          "Repair suits a sound, stable slab with surface damage. Once cracking is widespread, panels have settled relative to each other, or the base has failed, repeated repairs usually cost more over time than replacing the slab once. The contractor confirms which situation applies.",
        links: [],
      },
      {
        question: "How can I request a referral for concrete repair?",
        answer:
          "Describe the damage and where it is, with daylight photos, wide and close up. The assigned provider inspects it on site and diagnoses the cause before anyone talks about price, since the right fix depends on why the concrete failed. Start with a referral request.",
        links: [{ text: "referral request", href: "/contact" }],
      },
    ],
  },
  {
    id: "referral-process",
    name: "Referral process",
    more: { text: "How it works in detail", href: "/how-it-works" },
    faqs: [
      {
        question: "What is Lancaster Concrete Referral?",
        answer:
          "This website. It is a referral service that connects Lancaster homeowners with independent concrete service providers. We are not a contractor, we employ no crews, and we perform no work. Our only role is taking your request once and routing it to one eligible provider.",
        links: [{ text: "referral service", href: "/referral-disclosure" }],
      },
      {
        question: "How does the referral process work?",
        answer:
          "You submit one request with your project details and location. We validate it, check it against participating providers with written coverage for your area, and route it to one eligible contractor. That contractor contacts you directly to inspect, quote, and schedule. If they do not acknowledge it, the request is reassigned once.",
        links: [{ text: "submit one request", href: "/contact" }],
      },
      {
        question: "Is there a charge to request a referral?",
        answer:
          "No. Requesting a referral costs you nothing. You pay only the contractor you choose to hire, under a contract entirely between you and them. We never add fees to your project.",
        links: [],
      },
      {
        question: "Am I obligated to hire a service provider?",
        answer:
          "No. A referral creates no obligation. The contractor inspects your project and quotes it, and you decide whether to hire them. You can decline the quote with nothing owed to us.",
        links: [],
      },
      {
        question: "Who actually performs the concrete work?",
        answer:
          "An independent third party contractor, never us. Excavation, forming, pouring, and finishing are carried out by the provider you engage, and your contract is with them. We do not supervise, inspect, or warrant their work.",
        links: [],
      },
      {
        question: "How does the service provider contact me?",
        answer:
          "Directly, using the phone number or email from your request. We pass your details only to the one assigned provider, never to a panel of bidders, and only after your area clears the coverage check.",
        links: [],
      },
    ],
  },
  {
    id: "service-areas",
    name: "Service areas",
    more: { text: "Lancaster, SC coverage", href: "/locations/lancaster-sc" },
    faqs: [
      {
        question: "What areas do you serve?",
        answer:
          "Lancaster, South Carolina, including ZIP codes 29720 and 29721. Coverage is checked against providers who have approved each area in writing, which is why the list is short. New areas are added only when a provider approves them.",
        links: [{ text: "Lancaster, South Carolina", href: "/locations/lancaster-sc" }],
      },
      {
        question: "How do I know whether my location is covered?",
        answer:
          "Submit a request with your address, or call and we will confirm in a minute. If your address sits inside an approved ZIP, the request is routed; if not, you get an honest no coverage answer instead of being passed along anyway.",
        links: [{ text: "Submit a request", href: "/contact" }],
      },
      {
        question: "What happens if my location is outside the current service area?",
        answer:
          "Nothing is routed. Out of area requests are declined with an honest no coverage answer rather than passed to a contractor who does not serve the address. The quote form includes a My area is not listed option for exactly this case.",
        links: [{ text: "quote form", href: "/contact" }],
      },
    ],
  },
] as const;

/** Plain-text flattening for the FAQPage schema. Same strings, no markup. */
export const allFaqsPlain: { question: string; answer: string }[] =
  faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
