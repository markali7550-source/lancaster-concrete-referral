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
    more: { text: "Read our full disclosure", href: "/service-disclosure" },
    faqs: [
      {
        question: "Do you pour concrete or employ contractors?",
        answer:
          "Neither. We are a local concrete service site: we take your project details, check them against the teams that work in your area, and pass the request to one independent contractor. That contractor inspects, quotes, schedules, and performs the work under a contract with you, not with us. See how a request moves from start to finish.",
        links: [{ text: "how a request moves from start to finish", href: "/how-it-works" }],
      },
      {
        question: "Why use this service instead of calling contractors directly?",
        answer:
          "Calling around means repeating your project to every contractor and guessing who actually covers your area. We take your details once, check them against providers with written coverage for your area, and send the request to one eligible contractor. If that contractor does not acknowledge it, the request is reassigned once.",
        links: [{ text: "send the request", href: "/how-it-works" }],
      },
      {
        question: "How quickly will a provider contact me?",
        answer:
          "The assigned contractor contacts you directly within their contracted response window. Timing depends on each provider's schedule and workload. If the first contractor does not acknowledge your request, it is reassigned once to another eligible provider.",
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
          "Submit a request with the length of the drive and whether the old slab has to come out. We check it against participating providers with written coverage for your area and send it to one eligible contractor, who contacts you directly to inspect and quote.",
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
          "Contractors typically offer broom, smooth trowel, stamped pattern, and integrally colored finishes, plus sealing on decorative work. Stamped and colored work is only offered where a participating provider has documented that capability. Finish, color, and edge detail are priced before the pour.",
        links: [{ text: "Stamped and colored work", href: "/services/concrete-patios" }],
      },
      {
        question: "How do I request a patio quote?",
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
          "Residential slabs and pads carry sheds, outbuildings, HVAC units, generators, and parked vehicles or trailers. We take on nonstructural work only: house foundations, footings, and engineered structural slabs are declined rather than passed to a finisher.",
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
          "Submit a request saying what the pad has to carry and roughly where it goes. We send it to one provider with written coverage for your area, who confirms the specification on site. We never specify thickness or reinforcement ourselves.",
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
          "We take on nonstructural problems on otherwise sound slabs: shrinkage cracks, surface spalling, crazing, worn finishes, and failing joint sealant. Movement, heaving, height differences across cracks, and load failure need a licensed professional assessment instead.",
        links: [{ text: "nonstructural problems", href: "/services/concrete-repair" }],
      },
      {
        question: "When should concrete be repaired instead of replaced?",
        answer:
          "Repair suits a sound, stable slab with surface damage. Once cracking is widespread, panels have settled relative to each other, or the base has failed, repeated repairs usually cost more over time than replacing the slab once. The contractor confirms which situation applies.",
        links: [],
      },
      {
        question: "How do I request a concrete repair quote?",
        answer:
          "Describe the damage and where it is, with daylight photos, wide and close up. The assigned provider inspects it on site and diagnoses the cause before anyone talks about price, since the right fix depends on why the concrete failed. Start with a service request.",
        links: [{ text: "service request", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-leveling",
    name: "Concrete leveling",
    more: { text: "Read the Concrete Leveling guide", href: "/services/concrete-leveling" },
    faqs: [
      {
        question: "How do I know if a sunken concrete slab can be leveled?",
        answer:
          "A slab that has settled at one edge, leaving a gap at a walk or step, is often a candidate for leveling. Providers look at the cause first, since water or soft soil under the slab must be addressed to keep it from settling again. Ask the provider to explain the cause before you compare quotes.",
        links: [],
      },
      {
        question: "What affects the price of concrete leveling?",
        answer:
          "The size of the area, how far the slab has dropped, and how much of the base or soil needs work all matter. Access to the site also plays a part. Each provider prices the scope after looking at the slab, so a first quote is not a flat rate.",
        links: [],
      },
      {
        question: "How do I request a leveling quote?",
        answer:
          "Send the location of the low spot and a rough size of the area through our contact page. Your request goes to one participating provider with written coverage for your area, and they confirm the scope on site.",
        links: [{ text: "contact page", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-garage-coatings",
    name: "Garage floor coatings",
    more: { text: "Read the Garage Floor Coatings guide", href: "/services/concrete-garage-coatings" },
    faqs: [
      {
        question: "What should be done before a garage floor coating is applied?",
        answer:
          "The floor needs to be clean, dry, and free of oil and loose paint. Cracks or flaking areas usually need repair first. Providers often check moisture and prepare the surface before recommending a coating system. Ask what preparation is included in your quote.",
        links: [],
      },
      {
        question: "How long does a garage floor coating take to cure?",
        answer:
          "Cure times depend on the product and the temperature, and most systems need time before vehicles can drive on them. Providers give a specific schedule with the quote. Plan for the garage to be out of use for the full period they state.",
        links: [],
      },
      {
        question: "How do I request a garage floor coating quote?",
        answer:
          "Use the contact page to share your garage size, the current floor condition, and your preferred finish. Your request goes to one participating provider with written coverage for your area, and they confirm the scope before work begins.",
        links: [{ text: "contact page", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-resurfacing",
    name: "Concrete resurfacing",
    more: { text: "Read the Concrete Resurfacing guide", href: "/services/concrete-resurfacing" },
    faqs: [
      {
        question: "When is resurfacing a better choice than replacement?",
        answer:
          "Resurfacing can work when the base slab is sound and the surface is worn, scaled, or stained. If the slab is cracked through or has settled, the problem is underneath, and repair or replacement may be needed. A provider checks the base before recommending an overlay.",
        links: [],
      },
      {
        question: "Will resurfacing change how my concrete looks?",
        answer:
          "Yes. An overlay gives the surface a new texture and color, so the finish is chosen before the work starts. Agree on the finish and color with your provider before you sign the quote, since they set the final appearance.",
        links: [],
      },
      {
        question: "How do I request a resurfacing quote?",
        answer:
          "Send the area you want resurfaced and a short note on its current condition through our contact page. Your request goes to one participating provider with written coverage for your area, and they check the base on site.",
        links: [{ text: "contact page", href: "/contact" }],
      },
    ],
  },
  {
    id: "concrete-aprons",
    name: "Concrete aprons",
    more: { text: "Read the Concrete Aprons guide", href: "/services/concrete-aprons" },
    faqs: [
      {
        question: "What is a concrete apron, and why does its slope matter?",
        answer:
          "A concrete apron is the slab between a driveway and the street. It should slope toward the gutter so water drains away from the driveway and the home. Providers check the grade and curb height before forms go in.",
        links: [],
      },
      {
        question: "Does a damaged apron need repair or replacement?",
        answer:
          "Small cracks and surface flaking may be repairable, while a sunken or broken apron usually needs replacement. Damage at the curb edge often points to a drainage problem, so ask the provider to check the grade. The scope is confirmed on site.",
        links: [],
      },
      {
        question: "Do I need a permit to replace a concrete apron?",
        answer:
          "It depends on your town or county. Many areas require a permit when work touches the street or curb. Ask your provider whether a permit is needed and who will pull it before work begins.",
        links: [],
      },
    ],
  },
  {
    id: "concrete-sealing",
    name: "Concrete sealing",
    more: { text: "Read the Concrete Sealing guide", href: "/services/concrete-sealing" },
    faqs: [
      {
        question: "What does concrete sealing protect against?",
        answer:
          "A sealer helps reduce staining and water absorption, and it can make cleaning easier. It does not fix cracks or a damaged surface. Sealing works best on concrete that is clean and in good condition.",
        links: [],
      },
      {
        question: "Does the concrete need to be cleaned before sealing?",
        answer:
          "Yes. Dirt, oil, and efflorescence should be removed before sealing, since a sealer locks in whatever is underneath. Cleaning is usually part of the sealing scope, so confirm what is included in your quote.",
        links: [],
      },
      {
        question: "How often does concrete need to be resealed?",
        answer:
          "Reseal intervals depend on foot and vehicle traffic, weather, and the product used. Providers can recommend a schedule after inspecting the surface. Choose the sealer finish before work begins, since it changes the look.",
        links: [],
      },
    ],
  },
  {
    id: "concrete-exposed-aggregate",
    name: "Exposed aggregate",
    more: { text: "Read the Exposed Aggregate guide", href: "/services/concrete-exposed-aggregate" },
    faqs: [
      {
        question: "What is exposed aggregate concrete?",
        answer:
          "Exposed aggregate is a finish where the top layer of cement is removed to show the stones in the mix. It gives the surface a textured look. Stone color and size are chosen before the pour.",
        links: [],
      },
      {
        question: "Can exposed aggregate be added to an existing slab?",
        answer:
          "Usually not directly. Exposed aggregate is typically a new placement, or it can be applied as an overlay over a sound base. A provider checks the existing slab to see which option fits.",
        links: [],
      },
      {
        question: "How is the timing of exposed aggregate planned?",
        answer:
          "The top layer is removed by washing at the right point after the pour, so timing depends on weather and the mix. Providers plan the work around that window and explain it before the pour. Ask for the timing in writing with your quote.",
        links: [],
      },
    ],
  },
  {
    id: "request-process",
    name: "How requests work",
    more: { text: "How it works in detail", href: "/how-it-works" },
    faqs: [
      {
        question: "What is this website?",
        answer:
          "This is a local concrete service site for Lancaster homeowners. Independent local concrete specialists do the work. We take your request once and pass it to one eligible team.",
        links: [{ text: "about this site", href: "/service-disclosure" }],
      },
      {
        question: "How does a request work?",
        answer:
          "You submit one request with your project details and location. We validate it, check it against participating providers with written coverage for your area, and send it to one eligible contractor. That contractor contacts you directly to inspect, quote, and schedule. If they do not acknowledge it, the request is reassigned once.",
        links: [{ text: "submit one request", href: "/contact" }],
      },
      {
        question: "Is there a charge to request concrete service?",
        answer:
          "No. Requesting a quote costs you nothing. You pay only the contractor you choose to hire, under a contract entirely between you and them. We never add fees to your project.",
        links: [],
      },
      {
        question: "Am I obligated to hire a service provider?",
        answer:
          "No. A request creates no obligation. The contractor inspects your project and quotes it, and you decide whether to hire them. You can decline the quote with nothing owed to us.",
        links: [],
      },
      {
        question: "Who actually performs the concrete work?",
        answer:
          "An independent local contractor. Excavation, forming, pouring, and finishing are carried out by the provider you engage, and your contract is with them.",
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
          "Submit a request with your address, or call and we will confirm in a minute. If your address sits inside an approved ZIP, the request is handled; if not, you get an honest no coverage answer instead of being passed along anyway.",
        links: [{ text: "Submit a request", href: "/contact" }],
      },
      {
        question: "What happens if my location is outside the current service area?",
        answer:
          "Nothing is sent out. Out of area requests are declined with an honest no coverage answer rather than passed to a contractor who does not serve the address. The quote form includes a My area is not listed option for exactly this case.",
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
