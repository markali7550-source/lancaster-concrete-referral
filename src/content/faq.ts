/**
 * Content for the dedicated /faq page.
 *
 * Answers are plain text. `links` marks exact substrings of an answer to
 * render as internal links. The FAQPage schema uses the plain answer, so the
 * visible page and the structured data match word for word.
 */
export interface FaqLink {
  /** Exact substring of the answer to link. */
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
}

export const faqCategories: readonly FaqCategory[] = [
  {
    "id": "driveways-aprons",
    "name": "Driveways & Aprons",
    "faqs": [
      {
        "question": "How long should I wait before parking or driving on a newly poured concrete driveway?",
        "answer": "Foot traffic is typically safe after 24 to 48 hours. Light passenger vehicles should wait at least 7 full days, while heavy trucks or RVs require the full 28-day cure cycle to reach maximum compressive strength (typically 3,500 to 4,000 PSI).",
        "links": []
      },
      {
        "question": "What is a driveway apron, and how does it differ from the main driveway?",
        "answer": "The apron is the transitional section connecting your private driveway to the public roadway or curb. Aprons often require reinforced thickness (typically 6 inches) to endure heavy curb-transition stress and must comply with local municipality right-of-way guidelines.",
        "links": [
          {
            "text": "apron",
            "href": "/services/concrete-aprons"
          }
        ]
      },
      {
        "question": "How do control joints prevent surface cracking in South Carolina heat?",
        "answer": "Concrete naturally expands and contracts with Lancaster's high summer temperatures and moisture shifts. Control joints are strategically cut or grooved (at depths of at least 1/4 the slab thickness) to create planned relief points, ensuring any natural shrinkage cracking occurs cleanly below the surface rather than across the visible face.",
        "links": []
      }
    ]
  },
  {
    "id": "patios-walkways-steps-decorative",
    "name": "Patios, Walkways, Steps & Decorative",
    "faqs": [
      {
        "question": "What are the key differences between standard poured concrete, stamped concrete, and exposed aggregate?",
        "answer": "Standard broom-finish concrete offers a clean, non-slip utility surface. Stamped concrete replicates high-end natural stone, slate, or wood planking with custom color hardeners and release agents. Exposed aggregate washes away the top slurry layer to reveal embedded decorative stone aggregates, providing a rustic, highly durable, slip-resistant texture ideal for pool decks and walkways.",
        "links": [
          {
            "text": "Stamped concrete",
            "href": "/services/stamped-concrete"
          },
          {
            "text": "Exposed aggregate",
            "href": "/services/concrete-exposed-aggregate"
          },
          {
            "text": "walkways",
            "href": "/services/concrete-walkways"
          }
        ]
      },
      {
        "question": "Can damaged concrete porch steps be replaced independently without rebuilding the whole stoop?",
        "answer": "Yes. If the underlying structural foundation and porch landing are sound, localized step replacement or recapping can be completed independently. Rebar doweling is drilled into the existing structure to tie the new pour securely to the home.",
        "links": [
          {
            "text": "step replacement",
            "href": "/services/concrete-steps"
          }
        ]
      },
      {
        "question": "How is proper water runoff managed for outdoor patios and walkways?",
        "answer": "Every exterior flatwork project requires a minimum positive drainage pitch (typically 1/8 to 1/4 inch per linear foot) sloping away from the home's foundation to prevent standing water and structural moisture intrusion.",
        "links": []
      }
    ]
  },
  {
    "id": "slabs-foundations",
    "name": "Slabs & Foundations",
    "faqs": [
      {
        "question": "What is the recommended thickness for residential shed, garage, or hot tub slabs?",
        "answer": "Standard utility slabs for pedestrian patios or light sheds are poured at 4 inches (reinforced with fiber mesh or welded wire). Slabs intended for detached garages, heavy workshop equipment, or hot tubs are typically poured at 5 to 6 inches with Grade 60 #4 rebar grid reinforcement and thickened edge footings.",
        "links": [
          {
            "text": "utility slabs",
            "href": "/services/concrete-slabs"
          },
          {
            "text": "patios",
            "href": "/services/concrete-patios"
          }
        ]
      },
      {
        "question": "How do installers account for Lancaster's dense red clay soil during sub-base prep?",
        "answer": "South Carolina red clay expands significantly when wet and shrinks when dry. Proper sub-base preparation requires excavating organic topsoil, mechanically compacting the subgrade, and installing a 4-inch layer of crushed stone (such as ABC / crusher run aggregate) to ensure proper load distribution and prevent uneven settling.",
        "links": []
      }
    ]
  },
  {
    "id": "repair-resurfacing-leveling",
    "name": "Repair, Resurfacing & Leveling",
    "faqs": [
      {
        "question": "When is decorative resurfacing preferred over full tear-out and replacement?",
        "answer": "Resurfacing is ideal when concrete has minor surface scaling, cosmetic spalling, or micro-cracks but remains structurally level and stable. If the slab has extensive heaving, structural sub-base failure, or severe deep-seated settlement, full demolition and replacement is required.",
        "links": [
          {
            "text": "Resurfacing",
            "href": "/services/concrete-resurfacing"
          }
        ]
      },
      {
        "question": "How does concrete leveling work for sunken slabs and trip hazards?",
        "answer": "Concrete leveling (polyurethane foam injection or traditional stone slurry leveling) involves drilling small penny-sized access holes and pumping a high-density expanding material underneath the sunken slab to raise it back into alignment with surrounding walkways.",
        "links": [
          {
            "text": "Concrete leveling",
            "href": "/services/concrete-leveling"
          }
        ]
      }
    ]
  },
  {
    "id": "floor-coatings-sealing",
    "name": "Floor Coatings & Sealing",
    "faqs": [
      {
        "question": "What makes professional multi-layer garage coatings superior to DIY retail epoxy kits?",
        "answer": "Commercial systems utilize industrial mechanical diamond grinding to open concrete pores, followed by a high-solid moisture-mitigating primer, a 100% broadcast vinyl flake layer, and a UV-stable polyaspartic clear topcoat. This creates a chemical-resistant, hot-tire pickup resistant surface that lasts 15+ years compared to water-based DIY paints that often peel within 1 to 2 years.",
        "links": []
      },
      {
        "question": "How often should exterior concrete and stamped patios be resealed in South Carolina?",
        "answer": "High-traffic and decorative stamped surfaces should generally be resealed every 2 to 3 years with a breathable, UV-resistant solvent-based or acrylic penetrating sealer to protect against UV fading, oil staining, and moisture penetration.",
        "links": [
          {
            "text": "penetrating sealer",
            "href": "/services/concrete-sealing"
          }
        ]
      }
    ]
  },
  {
    "id": "quotes-pricing-logistics",
    "name": "Quotes, Pricing & Project Logistics",
    "faqs": [
      {
        "question": "How does the contractor matching and free estimate process work?",
        "answer": "Submit your project scope through our quick online request form or call our team directly. We match your specific project needs (dimensions, service type, location) with an experienced, independent local concrete specialist who will contact you to confirm details, conduct an on-site evaluation if necessary, and provide an upfront, transparent quote.",
        "links": [
          {
            "text": "quick online request form",
            "href": "/contact"
          }
        ]
      },
      {
        "question": "Who handles local building permits for residential concrete flatwork in Lancaster County?",
        "answer": "While minor flatwork repairs or ground-level patio extensions often do not require complex permitting, structural foundations, public right-of-way driveway aprons, and large detached additions may require municipal approval. Your assigned local service provider will review your project scope and confirm all necessary Lancaster City or County building permit requirements before pouring.",
        "links": []
      },
      {
        "question": "Do you serve my area?",
        "answer": "We proudly serve homeowners and businesses in the City of Lancaster, SC, and nearby communities including Kershaw, Heath Springs, Van Wyck, and Buford, where a participating provider has approved coverage in writing.",
        "links": [
          {
            "text": "City of Lancaster, SC",
            "href": "/locations/lancaster-sc"
          }
        ]
      },
      {
        "question": "Are all contractors licensed and insured?",
        "answer": "Work is performed by independent local concrete providers, not by us. Each provider is responsible for its own licensing, bonding, and insurance, and for building to South Carolina codes and industry standards. Ask any provider for proof before you sign.",
        "links": []
      }
    ]
  }
];

/** Plain-text flattening for the FAQPage schema. Same strings, no markup. */
export const allFaqsPlain: { question: string; answer: string }[] =
  faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
