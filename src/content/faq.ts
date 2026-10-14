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
    "id": "driveways-aprons",
    "name": "Driveways & Aprons",
    "faqs": [
      {
        "question": "How long before I can drive or park on a newly poured concrete driveway in Lancaster?",
        "answer": "Light foot traffic is usually fine within 24 to 48 hours. Passenger vehicles should wait about 7 days. Concrete keeps gaining strength for about 28 days, so heavy trucks and equipment should stay off until then. Your provider will confirm the schedule for your mix and the weather on the day of the pour."
      },
      {
        "question": "What is the difference between a driveway apron and the main driveway?",
        "answer": "The apron is the section where your driveway meets the street. It takes the turning traffic and the freeze-thaw wear at the edge. It is often in the public right-of-way, which can change the permit requirements, so check with the city or county before work begins."
      },
      {
        "question": "How do control joints prevent cracking in South Carolina summer heat?",
        "answer": "Concrete shrinks as it cures, and summer heat speeds that up. Control joints are grooves cut into the surface at planned spacing, so the slab cracks along those lines instead of randomly across the middle. The cuts are made soon after the finish sets, and spacing depends on slab size and thickness. Ask your provider for the joint layout before the pour."
      }
    ]
  },
  {
    "id": "patios-walkways-steps",
    "name": "Patios, Walkways & Steps",
    "faqs": [
      {
        "question": "How does stamped concrete differ from standard poured concrete for patios and walkways?",
        "answer": "Standard concrete gets a smooth or broom finish. Stamped concrete is pressed with patterned mats while it is still soft, so it can look like stone, slate, or brick. Color is added during the pour or as a dry-shake hardener, then sealed. Stamped surfaces take more skill to finish and need regular sealing to keep their color."
      },
      {
        "question": "What is exposed aggregate concrete and where is it best used?",
        "answer": "Exposed aggregate is concrete whose top layer of cement is washed or brushed away, leaving the stones visible. The result is a textured, slip-resistant surface. It works well for patios, walkways, pool surrounds, and entry paths where traction matters. Its texture makes it harder to sweep clean than smooth concrete."
      },
      {
        "question": "Can outdoor concrete steps be replaced without replacing the entire porch or stoop?",
        "answer": "Often, yes. If the landing or porch slab is sound and level, the steps can be removed and rebuilt on a new footing that ties into it. If the landing is cracked, sunk, or pulling away from the house, it usually makes sense to repair or replace it at the same time. Your provider will check the footing and the connection to the house before quoting."
      },
      {
        "question": "How is proper slope and water drainage handled for walkways and patios?",
        "answer": "Surfaces are graded to shed water away from the house, foundation, and any slab, typically about 1/8 inch per foot. Providers also address the base. Compacted gravel and edge drainage keep water from pooling under red clay, which swells when wet. Grading is planned before the forms go in, because it is much harder to fix after the pour."
      }
    ]
  },
  {
    "id": "slabs-foundations",
    "name": "Slabs & Foundations",
    "faqs": [
      {
        "question": "What thickness is standard for residential shed, garage, and patio slabs (4-inch vs 6-inch)?",
        "answer": "Four inches is common for patios, walkways, and light-use shed floors. Six inches is typical for garage floors and any slab that will carry vehicles, trailers, or heavy equipment. Thickened edges and reinforcement may be added where loads concentrate. Your provider will recommend the right thickness for how the space will be used."
      },
      {
        "question": "How do local providers prepare the sub-base for foundations in Lancaster's red clay soil?",
        "answer": "Providers strip topsoil and any soft or wet clay, then backfill with compacted gravel in layers. They check the bearing soil after heavy rain, control water with drainage and grading, and confirm the base is firm before setting forms. Red clay swells when wet and shrinks when dry, so this preparation keeps a foundation from moving with the seasons."
      },
      {
        "question": "Do you handle the demolition and haul-away of old concrete?",
        "answer": "Yes. Providers in our network offer complete turnkey service. They break up and haul away existing damaged concrete, excavate, grade the ground, and install a compacted gravel sub-base before pouring new concrete."
      }
    ]
  },
  {
    "id": "repair-resurfacing-leveling",
    "name": "Repair, Resurfacing & Leveling",
    "faqs": [
      {
        "question": "When is concrete resurfacing recommended over a complete tear-out and replacement?",
        "answer": "Resurfacing works when the slab is structurally sound, its slope and base are right, and the surface is scaled, worn, or stained. A thin overlay renews the look and usually costs less than a tear-out. Replacement is the better choice when the slab has heaved or sunk, has large structural cracks, or drains poorly. A provider will inspect the slab and recommend the right path."
      },
      {
        "question": "How does concrete leveling work for sunken slabs and uneven walkways?",
        "answer": "Small holes are drilled in the slab, and a material is pumped underneath to lift it back to level. Polyurethane foam and cement slurry are the two common options. The process is usually quick and creates little mess, and the holes are patched afterward. The provider also checks the drainage or soil loss that caused the sinking."
      },
      {
        "question": "Can deep cracks and spalling in existing concrete be permanently repaired?",
        "answer": "Most can be repaired to a sound, long-lasting finish. Deep cracks are often sealed with epoxy or filled, and spalled areas are cut back and patched with repair mortar. No repair can guarantee the slab will never crack again if the cause is still there, so the provider also addresses the source, such as water under the slab or movement in the soil."
      }
    ]
  },
  {
    "id": "coatings-sealing",
    "name": "Coatings & Sealing",
    "faqs": [
      {
        "question": "What is the benefit of professional garage floor coatings compared to standard DIY epoxy kits?",
        "answer": "Professional crews grind or shot-blast the slab to open the surface so the coating can bond. They test for moisture, repair cracks first, and apply the system in even coats at the right thickness. DIY kits often skip this prep, which is a common reason coatings peel. Professional systems are also chosen for the load and temperatures a garage will see."
      },
      {
        "question": "How often should outdoor driveways, patios, and stamped concrete be resealed in South Carolina?",
        "answer": "Most outdoor concrete in South Carolina should be resealed every 2 to 3 years. Stamped and colored surfaces may need it sooner, because sealer protects their color and keeps stains and moisture out. Heavy sun, heavy rain, and oil drips can shorten the interval, so a quick yearly check helps you decide when it is due."
      }
    ]
  },
  {
    "id": "general-process-quotes-permits",
    "name": "General Process, Quotes & Permits",
    "faqs": [
      {
        "question": "How does the project matching and free quote process work?",
        "answer": "Submit your project details online or call us. We review your request and match it with one eligible local provider. That provider contacts you to inspect the site, confirm the scope, and give you an upfront quote. The quote is free with no obligation, and your contract is with the provider."
      },
      {
        "question": "Do concrete flatwork projects in Lancaster County require permits?",
        "answer": "Some do, and requirements vary by location and project. New driveways, aprons in the public right-of-way, and some slabs or foundations may need a permit. Check with Lancaster County's planning or building department, or the City of Lancaster if you live inside city limits, before work begins. Your provider can tell you who handles the permit paperwork."
      },
      {
        "question": "Do you provide free project estimates?",
        "answer": "Yes, 100% free with no obligation. Simply submit your project details online or call us directly. We will review your site requirements and pass them to an eligible local provider, who will give you an upfront, transparent quote."
      },
      {
        "question": "What types of concrete projects do you handle?",
        "answer": "Our network of local providers handles a comprehensive range of residential and commercial concrete work, including driveways, patios, walkways, pool decks, foundations, garage slabs, aprons, concrete repairs, leveling, and resurfacing."
      },
      {
        "question": "Can I combine multiple projects into one job?",
        "answer": "Absolutely. Many clients combine a new driveway with a matching front walkway or a backyard patio. Bundling projects often saves both time and cost on site preparation."
      },
      {
        "question": "How long does a typical concrete project take to complete?",
        "answer": "Most residential driveways, patios, and walkways take 1 to 3 days to complete, depending on project size, excavation needs, and weather conditions."
      },
      {
        "question": "What areas in Lancaster County do you service?",
        "answer": "We proudly serve homeowners and businesses in the City of Lancaster, SC, and nearby communities including Kershaw, Heath Springs, Van Wyck, and Buford, where a participating provider has approved coverage in writing."
      },
      {
        "question": "Are all contractors licensed and insured?",
        "answer": "Work is performed by independent local concrete providers, not by us. Each provider is responsible for its own licensing, bonding, and insurance, and for building to South Carolina codes and industry standards. Ask any provider for proof before you sign."
      }
    ]
  }
];

/** Plain-text flattening for the FAQPage schema. Same strings, no markup. */
export const allFaqsPlain: { question: string; answer: string }[] =
  faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
