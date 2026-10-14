/**
 * Content for the dedicated /faq page.
 *
 * Every answer is plain text and stays under 80 words, so the same strings
 * feed both the visible accordion and the FAQPage JSON-LD schema with no
 * drift between them. `links` mark exact substrings of `answer` that render
 * as internal links; the schema keeps the unlinked sentence, which is why
 * parity holds. Only published routes appear here.
 *
 * Categories group questions by service so visitors and search engines can
 * find the matching answer quickly. Answers avoid quoted prices and warranty
 * terms, and name only the City of Lancaster and the approved nearby
 * communities (Kershaw, Heath Springs, Van Wyck, Buford).
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
    "id": "general",
    "name": "General & process",
    "more": {
      "text": "Read our full disclosure",
      "href": "/service-disclosure"
    },
    "faqs": [
      {
        "question": "Do you pour concrete or employ contractors?",
        "answer": "Neither. We are a local concrete service site: we take your project details, check them against the teams that work in your area, and pass the request to one independent contractor. That contractor inspects, quotes, schedules, and performs the work under a contract with you, not with us. See how a request moves from start to finish.",
        "links": [
          {
            "text": "how a request moves from start to finish",
            "href": "/how-it-works"
          }
        ]
      },
      {
        "question": "Why use this service instead of calling contractors directly?",
        "answer": "Calling around means repeating your project to every contractor and guessing who actually covers your area. We take your details once, check them against providers with written coverage for your area, and send the request to one eligible contractor. If that contractor does not acknowledge it, the request is reassigned once.",
        "links": [
          {
            "text": "send the request",
            "href": "/how-it-works"
          }
        ]
      },
      {
        "question": "How quickly will a provider contact me?",
        "answer": "The assigned contractor contacts you directly within their contracted response window. Timing depends on each provider's schedule and workload. If the first contractor does not acknowledge your request, it is reassigned once to another eligible provider.",
        "links": []
      },
      {
        "question": "What is this website?",
        "answer": "This is a local concrete service site for Lancaster homeowners. Independent local concrete specialists do the work. We take your request once and pass it to one eligible team.",
        "links": [
          {
            "text": "local concrete service site",
            "href": "/service-disclosure"
          }
        ]
      },
      {
        "question": "How does a request work?",
        "answer": "You submit one request with your project details and location. We validate it, check it against participating providers with written coverage for your area, and send it to one eligible contractor. That contractor contacts you directly to inspect, quote, and schedule. If they do not acknowledge it, the request is reassigned once.",
        "links": [
          {
            "text": "submit one request",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "Is there a charge to request concrete service?",
        "answer": "No. Requesting a quote costs you nothing. You pay only the contractor you choose to hire, under a contract entirely between you and them. We never add fees to your project.",
        "links": []
      },
      {
        "question": "Am I obligated to hire a service provider?",
        "answer": "No. A request creates no obligation. The contractor inspects your project and quotes it, and you decide whether to hire them. You can decline the quote with nothing owed to us.",
        "links": []
      },
      {
        "question": "Who actually performs the concrete work?",
        "answer": "An independent local service provider. Excavation, forming, pouring, and finishing are carried out by the provider you engage, and your contract is with them.",
        "links": []
      },
      {
        "question": "How does the service provider contact me?",
        "answer": "Directly, using the phone number or email from your request. We pass your details only to the one assigned provider, never to a panel of bidders, and only after your area clears the coverage check.",
        "links": []
      },
      {
        "question": "How much does concrete cost in Lancaster, SC?",
        "answer": "We do not publish prices. Costs depend on the size, thickness, access, base preparation, finish, removal of old concrete, and permits. Each provider prices the job after an on site visit. Compare quotes by scope line by line, not only by the total.",
        "links": []
      },
      {
        "question": "Are permits included in a concrete quote?",
        "answer": "Some quotes include permit fees and filing, and others list them separately. Permit rules depend on the work and on whether it touches the street, a drainage path, or a property line. Check the quote for a permit line before you sign.",
        "links": []
      }
    ]
  },
  {
    "id": "driveways-aprons",
    "name": "Driveways & aprons",
    "more": {
      "text": "Read the Concrete Driveways guide",
      "href": "/services/concrete-driveways"
    },
    "faqs": [
      {
        "question": "What is involved in a concrete driveway project?",
        "answer": "Most driveway projects are either a first pour over gravel or a full replacement of a failed slab, including demolition and haul away. The contractor measures the site, checks mixer access and drainage, prepares the subbase, sets forms, pours, and cuts control joints. Read what counts as a driveway job for the full scope.",
        "links": [
          {
            "text": "what counts as a driveway job",
            "href": "/services/concrete-driveways"
          }
        ]
      },
      {
        "question": "When might a concrete driveway need replacement?",
        "answer": "Replacement usually enters the conversation when cracking spreads across most panels, sections have settled unevenly, or the subbase has failed. Isolated surface cracks on a sound, level slab often do not require it. Only the contractor who inspects the slab can make that call.",
        "links": []
      },
      {
        "question": "How do I get connected with a driveway service provider?",
        "answer": "Submit a request with the length of the drive and whether the old slab has to come out. We check it against participating providers with written coverage for your area and send it to one eligible contractor, who contacts you directly to inspect and quote.",
        "links": [
          {
            "text": "Submit a request",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "How long before I can drive on a new driveway?",
        "answer": "Light foot traffic is often possible after about a day, but most providers keep vehicles off a new driveway for about a week. Concrete gains most of its strength over about 28 days. Your provider sets the exact schedule for the mix and the weather, so ask for it in writing.",
        "links": [
          {
            "text": "new driveway",
            "href": "/locations/lancaster-sc/concrete-driveways"
          }
        ]
      },
      {
        "question": "Does red clay soil affect a driveway in Lancaster, SC?",
        "answer": "Red clay, which is common across the Piedmont, holds water and can shift as it wets and dries. Careful base preparation, compaction, and drainage slope reduce cracking and settling. Ask how the subgrade will be handled before the forms go in. See our Lancaster driveway quotes page for local details.",
        "links": [
          {
            "text": "Lancaster driveway quotes page",
            "href": "/locations/lancaster-sc/concrete-driveways"
          }
        ]
      },
      {
        "question": "Do I need a permit for a new driveway in Lancaster?",
        "answer": "It depends on what the work touches. Changes near the street right of way, drainage, or property setbacks can require a permit from the City of Lancaster or Lancaster County. Do not assume none is needed. Ask the provider who pulls the permit and whether it is in the quote.",
        "links": []
      },
      {
        "question": "What is a concrete apron, and why does its slope matter?",
        "answer": "A concrete apron is the slab between a driveway and the street. It should slope toward the gutter so water drains away from the driveway and the home. Providers check the grade and curb height before forms go in.",
        "links": []
      },
      {
        "question": "Does a damaged apron need repair or replacement?",
        "answer": "Small cracks and surface flaking may be repairable, while a sunken or broken apron usually needs replacement. Damage at the curb edge often points to a drainage problem, so ask the provider to check the grade. The scope is confirmed on site.",
        "links": []
      },
      {
        "question": "Do I need a permit to replace a concrete apron?",
        "answer": "It depends on your town or county. Many areas require a permit when work touches the street or curb. Ask your provider whether a permit is needed and who will pull it before work begins.",
        "links": []
      },
      {
        "question": "Can an apron be poured with a new driveway?",
        "answer": "Often yes. Pouring the apron and the driveway together lets the slope and joints line up, and it can avoid a second setup. Ask the provider to show the grade on the same quote so the transition to the street is planned.",
        "links": [
          {
            "text": "apron",
            "href": "/services/concrete-aprons"
          }
        ]
      }
    ]
  },
  {
    "id": "patios-walkways-stamped",
    "name": "Patios, walkways & stamped concrete",
    "more": {
      "text": "Read the Concrete Patios guide",
      "href": "/services/concrete-patios"
    },
    "faqs": [
      {
        "question": "What should I consider before installing a concrete patio?",
        "answer": "Size the footprint around furniture and door swing, note where rainwater runs, and check side access width for equipment. Decide the finish before comparing quotes, since a stamped slab and a broom finish are priced as different projects. Locate irrigation lines in the area too.",
        "links": []
      },
      {
        "question": "What options are available for a concrete patio?",
        "answer": "Contractors typically offer broom, smooth trowel, stamped pattern, and integrally colored finishes, plus sealing on decorative work. Stamped and colored work is only offered where a participating provider has documented that capability. Finish, color, and edge detail are priced before the pour.",
        "links": [
          {
            "text": "Stamped and colored work",
            "href": "/services/concrete-patios"
          }
        ]
      },
      {
        "question": "How do I request a patio quote?",
        "answer": "Send the rough size through our contact page, and say whether the patio ties into an existing porch or stoop. Your request goes to a single participating provider with written coverage for your area, not a panel of bidders. The provider then walks the space with you and quotes directly.",
        "links": [
          {
            "text": "contact page",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "How long should a new patio cure before furniture or a grill?",
        "answer": "Most patios can take light foot traffic within a day or two and furniture after about a week. A grill or heavy planters should wait longer, since full strength takes about 28 days. Your provider will confirm the schedule for the mix and the weather.",
        "links": [
          {
            "text": "Most patios",
            "href": "/services/concrete-patios"
          }
        ]
      },
      {
        "question": "Does summer heat affect a patio pour in Lancaster?",
        "answer": "Hot, humid afternoons speed up setting and can dry the surface too fast, which causes cracks. Crews often schedule early morning patio pours, keep the surface damp, and use curing methods in heat. Ask your provider how they will handle the weather on pour day.",
        "links": [
          {
            "text": "patio pours",
            "href": "/locations/lancaster-sc/concrete-patios"
          }
        ]
      },
      {
        "question": "How is stamped concrete different from a plain patio?",
        "answer": "Stamped concrete is pressed with patterned tools while it is still soft, so it can look like stone, brick, or tile. The base and mix work the same way. The stamping adds labor, so compare the pattern and finish on each quote.",
        "links": [
          {
            "text": "Stamped concrete",
            "href": "/services/stamped-concrete"
          }
        ]
      },
      {
        "question": "How long does stamped concrete last?",
        "answer": "Lifespan depends on the base, the mix, the climate, and how well the surface is sealed and maintained. Stamped surfaces can show wear in high traffic spots over time. Ask the provider to explain the expected life for your site and the care it needs.",
        "links": []
      },
      {
        "question": "Does stamped concrete need sealing?",
        "answer": "Most stamped and colored surfaces are sealed to reduce fading, staining, and wear. The sealer type changes the final look, so choose it before the work starts. Ask your provider for a resealing plan for your patio or driveway.",
        "links": []
      },
      {
        "question": "How wide should a concrete walkway be?",
        "answer": "Many walkways are about three to four feet wide, which lets two people pass comfortably. The right width depends on use, the entry, and any steps. Your provider can suggest a width that fits the path and the landscaping.",
        "links": [
          {
            "text": "Many walkways",
            "href": "/services/concrete-walkways"
          }
        ]
      },
      {
        "question": "How do I prevent cracks in a new walkway?",
        "answer": "Cracks are controlled by a solid base, good drainage, and control joints. These guide any cracking into straight lines instead of random breaks. Ask the provider where the joints will go before the pour.",
        "links": []
      },
      {
        "question": "Why do concrete steps settle, and how is that prevented?",
        "answer": "Steps settle when the base is soft or water collects under them. Good compaction, a stable footing, and drainage away from the steps reduce movement. Ask how the base will be prepared for your concrete steps.",
        "links": [
          {
            "text": "concrete steps",
            "href": "/services/concrete-steps"
          }
        ]
      }
    ]
  },
  {
    "id": "foundations-slabs",
    "name": "Foundations, slabs & leveling",
    "more": {
      "text": "Read the Concrete Slabs guide",
      "href": "/services/concrete-slabs"
    },
    "faqs": [
      {
        "question": "What are concrete slabs commonly used for?",
        "answer": "Residential slabs and pads carry sheds, outbuildings, HVAC units, generators, and parked vehicles or trailers. We take on nonstructural work only: house foundations, footings, and engineered structural slabs are declined rather than passed to a finisher.",
        "links": [
          {
            "text": "nonstructural work only",
            "href": "/services/concrete-slabs"
          }
        ]
      },
      {
        "question": "What should be considered before a slab project?",
        "answer": "Start with the load: what sits on the pad decides thickness, reinforcement, and base depth. Confirm the exact footprint plus required overhang, check ground fall and access width, and locate buried utilities. Share any supplier base requirements with the contractor.",
        "links": []
      },
      {
        "question": "How can I get connected with a qualified service provider?",
        "answer": "Submit a request saying what the pad has to carry and roughly where it goes. We send it to one provider with written coverage for your area, who confirms the specification on site. We never specify thickness or reinforcement ourselves.",
        "links": [
          {
            "text": "Submit a request",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "How should the base under a concrete slab be prepared?",
        "answer": "A concrete slab needs a compacted base, usually gravel or stable fill, so it resists settling. The soil should be firm, and drainage should move water away from the slab. Ask your provider what base they will install and how it will be compacted.",
        "links": [
          {
            "text": "A concrete slab",
            "href": "/services/concrete-slabs"
          }
        ]
      },
      {
        "question": "How do I know if a sunken concrete slab can be leveled?",
        "answer": "A slab that has settled at one edge, leaving a gap at a walk or step, is often a candidate for leveling. Providers look at the cause first, since water or soft soil under the slab must be addressed to keep it from settling again. Ask the provider to explain the cause before you compare quotes.",
        "links": []
      },
      {
        "question": "What affects the price of concrete leveling?",
        "answer": "The size of the area, how far the slab has dropped, and how much of the base or soil needs work all matter. Access to the site also plays a part. Each provider prices the scope after looking at the slab, so a first quote is not a flat rate.",
        "links": []
      },
      {
        "question": "How do I request a leveling quote?",
        "answer": "Send the location of the low spot and a rough size of the area through our contact page. Your request goes to one participating provider with written coverage for your area, and they confirm the scope on site.",
        "links": [
          {
            "text": "contact page",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "What is a concrete foundation used for?",
        "answer": "A concrete foundation supports a structure by spreading its load into the soil. Footings and foundation walls are the most common forms. Foundation work is structural, so the design has to match the building and local code.",
        "links": [
          {
            "text": "concrete foundation",
            "href": "/services/concrete-foundations"
          }
        ]
      },
      {
        "question": "Does a foundation project need an engineer or a permit?",
        "answer": "Structural footings and walls usually need drawings and a permit under local code. Whether an engineer must stamp the design depends on the project and the local building department. Ask the provider to confirm both requirements in writing.",
        "links": []
      },
      {
        "question": "How does red clay affect a concrete foundation?",
        "answer": "Clay soils can swell and shrink with moisture, which can move a foundation when drainage is poor. A soil review or an engineer recommendation helps set footing depth and the drainage plan. Ask about the soil before excavation begins.",
        "links": []
      }
    ]
  },
  {
    "id": "repair-resurfacing",
    "name": "Repair & resurfacing",
    "more": {
      "text": "Read the Concrete Repair guide",
      "href": "/services/concrete-repair"
    },
    "faqs": [
      {
        "question": "What types of concrete problems may need repair?",
        "answer": "We take on nonstructural problems on otherwise sound slabs: shrinkage cracks, surface spalling, crazing, worn finishes, and failing joint sealant. Movement, heaving, height differences across cracks, and load failure need a licensed professional assessment instead.",
        "links": [
          {
            "text": "nonstructural problems",
            "href": "/services/concrete-repair"
          }
        ]
      },
      {
        "question": "When should concrete be repaired instead of replaced?",
        "answer": "Repair suits a sound, stable slab with surface damage. Once cracking is widespread, panels have settled relative to each other, or the base has failed, repeated repairs usually cost more over time than replacing the slab once. The contractor confirms which situation applies.",
        "links": []
      },
      {
        "question": "How do I request a concrete repair quote?",
        "answer": "Describe the damage and where it is, with daylight photos, wide and close up. The assigned provider inspects it on site and diagnoses the cause before anyone talks about price, since the right fix depends on why the concrete failed. Start with a service request.",
        "links": [
          {
            "text": "service request",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "How long does a concrete repair last?",
        "answer": "A repair lasts when its cause is fixed. Cracks from settling or water keep coming back until the base or drainage is corrected. Patches can blend in, but they are not always invisible. Ask the provider what caused the damage before you compare repair quotes.",
        "links": [
          {
            "text": "A repair lasts",
            "href": "/services/concrete-repair"
          }
        ]
      },
      {
        "question": "Can concrete be repaired during hot weather?",
        "answer": "Yes, but repair materials have temperature limits, and heat can make them set too fast. Providers often work early in the morning and shade the area. Ask how the crew will protect the repair during hot weather.",
        "links": []
      },
      {
        "question": "When is resurfacing a better choice than replacement?",
        "answer": "Resurfacing can work when the base slab is sound and the surface is worn, scaled, or stained. If the slab is cracked through or has settled, the problem is underneath, and repair or replacement may be needed. A provider checks the base before recommending an overlay.",
        "links": []
      },
      {
        "question": "Will resurfacing change how my concrete looks?",
        "answer": "Yes. An overlay gives the surface a new texture and color, so the finish is chosen before the work starts. Agree on the finish and color with your provider before you sign the quote, since they set the final appearance.",
        "links": []
      },
      {
        "question": "How do I request a resurfacing quote?",
        "answer": "Send the area you want resurfaced and a short note on its current condition through our contact page. Your request goes to one participating provider with written coverage for your area, and they check the base on site.",
        "links": [
          {
            "text": "contact page",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "What affects the cost of resurfacing compared with replacement?",
        "answer": "Resurfacing usually costs less than replacement when the base is sound, but the finish, the area, and the prep work all change the price. Replacement costs more when the slab is failing or needs a new base. Only an on site quote sets a real number for your project.",
        "links": [
          {
            "text": "Resurfacing usually costs less",
            "href": "/services/concrete-resurfacing"
          }
        ]
      }
    ]
  },
  {
    "id": "sealing-maintenance",
    "name": "Sealing & maintenance",
    "more": {
      "text": "Read the Concrete Sealing guide",
      "href": "/services/concrete-sealing"
    },
    "faqs": [
      {
        "question": "What does concrete sealing protect against?",
        "answer": "A sealer helps reduce staining and water absorption, and it can make cleaning easier. It does not fix cracks or a damaged surface. Sealing works best on concrete that is clean and in good condition.",
        "links": []
      },
      {
        "question": "Does the concrete need to be cleaned before sealing?",
        "answer": "Yes. Dirt, oil, and efflorescence should be removed before sealing, since a sealer locks in whatever is underneath. Cleaning is usually part of the sealing scope, so confirm what is included in your quote.",
        "links": []
      },
      {
        "question": "How often does concrete need to be resealed?",
        "answer": "Reseal intervals depend on foot and vehicle traffic, weather, and the product used. Providers can recommend a schedule after inspecting the surface. Choose the sealer finish before work begins, since it changes the look.",
        "links": []
      },
      {
        "question": "How often should concrete be resealed in South Carolina?",
        "answer": "Reseal intervals depend on sun, rain, traffic, and the product used. Heat and humidity can wear sealers faster on exposed areas. A provider can inspect the surface and recommend a schedule. Watch for water that no longer beads on the surface.",
        "links": [
          {
            "text": "Reseal intervals",
            "href": "/services/concrete-sealing"
          }
        ]
      },
      {
        "question": "How do I maintain concrete through hot Lancaster summers?",
        "answer": "Rinse oil and fuel spills quickly, avoid harsh chemicals, and keep joints filled so water cannot reach the base. Wash at low pressure and keep the surface sealed. Small problems cost far less to fix than a failed surface.",
        "links": []
      },
      {
        "question": "How do I request a garage floor coating quote?",
        "answer": "Use the contact page to share your garage size, the current floor condition, and your preferred finish. Your request goes to one participating provider with written coverage for your area, and they confirm the scope before work begins.",
        "links": [
          {
            "text": "contact page",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "What should be done before a garage floor coating is applied?",
        "answer": "The floor needs to be clean, dry, and free of oil and loose paint. Cracks or flaking areas usually need repair first. Providers often check moisture and prepare the surface before recommending a coating system. Ask what preparation is included in your quote.",
        "links": []
      },
      {
        "question": "How long does a garage floor coating take to cure?",
        "answer": "Cure times depend on the product and the temperature, and most systems need time before vehicles can drive on them. Providers give a specific schedule with the quote. Plan for the garage to be out of use for the full period they state.",
        "links": []
      },
      {
        "question": "Can a garage floor coating handle hot tires?",
        "answer": "Some coatings soften or pick up under heat and tire weight. Ask for the product data sheet and confirm the system suits your climate and vehicles. Surface prep matters as much as the product choice.",
        "links": [
          {
            "text": "Some coatings",
            "href": "/services/concrete-garage-coatings"
          }
        ]
      },
      {
        "question": "What is exposed aggregate concrete?",
        "answer": "Exposed aggregate is a finish where the top layer of cement is removed to show the stones in the mix. It gives the surface a textured look. Stone color and size are chosen before the pour.",
        "links": []
      },
      {
        "question": "Can exposed aggregate be added to an existing slab?",
        "answer": "Usually not directly. Exposed aggregate is typically a new placement, or it can be applied as an overlay over a sound base. A provider checks the existing slab to see which option fits.",
        "links": []
      },
      {
        "question": "How is the timing of exposed aggregate planned?",
        "answer": "The top layer is removed by washing at the right point after the pour, so timing depends on weather and the mix. Providers plan the work around that window and explain it before the pour. Ask for the timing in writing with your quote.",
        "links": []
      },
      {
        "question": "How do I care for exposed aggregate concrete?",
        "answer": "Sweep it regularly and rinse with water instead of harsh chemicals. Keep high pressure washing away from the stones, since it can dislodge them. Reseal if your provider recommends it to protect the mix and color.",
        "links": [
          {
            "text": "Sweep it regularly",
            "href": "/services/concrete-exposed-aggregate"
          }
        ]
      }
    ]
  },
  {
    "id": "service-areas",
    "name": "Service area in Lancaster, SC",
    "more": {
      "text": "See the Lancaster, SC service area",
      "href": "/locations/lancaster-sc"
    },
    "faqs": [
      {
        "question": "What areas do you serve?",
        "answer": "Lancaster, South Carolina, including ZIP codes 29720 and 29721. Coverage is checked against providers who have approved each area in writing, which is why the list is short. New areas are added only when a provider approves them.",
        "links": [
          {
            "text": "Lancaster, South Carolina",
            "href": "/locations/lancaster-sc"
          }
        ]
      },
      {
        "question": "How do I know whether my location is covered?",
        "answer": "Submit a request with your address, or call and we will confirm quickly. If your address sits inside an approved ZIP, the request is handled; if not, you get a clear answer that we do not cover it, instead of being passed along anyway.",
        "links": [
          {
            "text": "Submit a request",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "What happens if my location is outside the current service area?",
        "answer": "Nothing is sent out. Out of area requests are declined with a clear answer that the area is not covered, rather than passed to a contractor who does not serve the address. The quote form includes a My area is not listed option for exactly this case.",
        "links": [
          {
            "text": "quote form",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "Which nearby communities are covered?",
        "answer": "Addresses in the City of Lancaster are matched to participating providers. Kershaw, Heath Springs, Van Wyck, and Buford are nearby county communities. They are covered only when a provider has approved that address in writing. Check on the contact page before you plan a project.",
        "links": [
          {
            "text": "contact page",
            "href": "/contact"
          }
        ]
      }
    ]
  }
];


/** Plain-text flattening for the FAQPage schema. Same strings, no markup. */
export const allFaqsPlain: { question: string; answer: string }[] =
  faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
