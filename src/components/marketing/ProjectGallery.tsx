"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/env";

type GalleryItem = { category: string; src: string; alt: string; tall?: boolean };

const ITEMS: GalleryItem[] = [
  { category: "Concrete Driveway", src: "/home-driveway-card.jpg", alt: "Representative residential concrete driveway with a clean broom finish", tall: true },
  { category: "Concrete Patio", src: "/home-patio-card.jpg", alt: "Representative backyard concrete patio beside a lawn and mature trees" },
  { category: "Concrete Slab", src: "/home-slab-card.jpg", alt: "Representative concrete slab prepared beside a residential property" },
  { category: "Concrete Repair", src: "/home-repair-card.jpg", alt: "Representative cracked concrete walkway awaiting a repair assessment" },
  { category: "Decorative Concrete", src: "/contact-front-walkway.webp", alt: "Representative finished concrete walkway leading to a residential entry", tall: true },
  { category: "Finished Concrete Work", src: "/cta-pour-band.webp", alt: "Representative concrete work being screeded between forms during a residential pour" },
];

export function ProjectGallery() {
  const [active, setActive] = useState<number | null>(null);
  const item = active === null ? null : ITEMS[active];

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((v) => v === null ? 0 : (v + 1) % ITEMS.length);
      if (event.key === "ArrowLeft") setActive((v) => v === null ? ITEMS.length - 1 : (v - 1 + ITEMS.length) % ITEMS.length);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previous; };
  }, [active]);

  return (
    <>
      <div className="gallery-grid">
        {ITEMS.map((image, index) => (
          <button type="button" key={image.category} className={`gallery-card ${image.tall ? "gallery-card-tall" : ""}`} onClick={() => setActive(index)} aria-label={`View ${image.category} inspiration image`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" loading="lazy" className="object-cover" />
            <span className="gallery-card-shade" aria-hidden="true" />
            <span className="gallery-card-label">{image.category}<span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-center text-xs text-[color:var(--color-muted)]">Representative inspiration imagery only. Lancaster Concrete Referral is a referral service, not the contractor performing this work.</p>
      <div className="gallery-cta mt-10 flex flex-col items-center justify-between gap-5 rounded-[16px] border p-6 text-center md:flex-row md:p-8 md:text-left">
        <div><p className="text-lg font-semibold">Planning a Concrete Project?</p><p className="mt-1 max-w-xl text-sm leading-relaxed text-[color:var(--color-muted)]">Tell us what you&apos;re looking to build or repair and we&apos;ll help connect you with the appropriate local concrete professional.</p></div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row"><DynamicPhone fallbackDisplay={site.phoneDisplay} fallbackE164={site.phoneE164} placement="gallery" className="btn btn-primary" /><a href="#quote-form" className="btn btn-secondary">Request a referral <Icon name="arrow" /></a></div>
      </div>
      {item ? <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${item.category} inspiration image`} onClick={() => setActive(null)}>
        <button type="button" className="gallery-close" onClick={() => setActive(null)} aria-label="Close image viewer">×</button>
        <button type="button" className="gallery-prev" onClick={(e) => { e.stopPropagation(); setActive((active! - 1 + ITEMS.length) % ITEMS.length); }} aria-label="Previous image">‹</button>
        <figure className="gallery-lightbox-figure" onClick={(e) => e.stopPropagation()}><div className="gallery-lightbox-image"><Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-contain" /></div><figcaption>{item.category} <span>· Representative inspiration</span></figcaption></figure>
        <button type="button" className="gallery-next" onClick={(e) => { e.stopPropagation(); setActive((active! + 1) % ITEMS.length); }} aria-label="Next image">›</button>
      </div> : null}
    </>
  );
}
