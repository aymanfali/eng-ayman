"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  imageAlt?: string;
  buttonLabel?: string;
}

interface SwiperCarouselProps {
  slides: CarouselSlide[];
  ariaLabel?: string;
}

function SlideCard({ slide, viewLabel }: { slide: CarouselSlide; viewLabel: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted sm:aspect-[16/9] lg:aspect-[2/1]">
        {!imageLoaded && !imageFailed ? (
          <div
            className="absolute inset-0 animate-pulse bg-muted"
            aria-hidden="true"
          />
        ) : null}
        {imageFailed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-accent px-6 text-center text-sm font-medium text-accent-foreground">
            {slide.title}
          </div>
        ) : (
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt || slide.title}
            fill
            sizes="(max-width: 639px) 88vw, (max-width: 1023px) 44vw, 30vw"
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col items-start p-5">
        <h3 className="line-clamp-2  text-lg font-semibold leading-6">
          {slide.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
          {slide.description}
        </p>
        <Link
          href={slide.link}
          className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {slide.buttonLabel || viewLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function SwiperCarousel({
  slides,
  ariaLabel,
}: SwiperCarouselProps) {
  const t = useTranslations("Carousel");
  const resolvedAriaLabel = ariaLabel ?? t("featuredLabel");
  const carouselId = useId().replaceAll(":", "");

  if (slides.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-muted px-5 py-8 text-center text-sm text-muted-foreground">
        {t("empty")}
      </p>
    );
  }

  // Swiper loop mode needs enough slides to cover the largest breakpoint.
  const loopSlides = Array.from(
    { length: Math.max(slides.length, 4) },
    (_, index) => slides[index % slides.length],
  );

  return (
    <section
      className={`projects-carousel ${carouselId} relative min-w-0 max-w-full`}
      aria-label={resolvedAriaLabel}
    >
      <div className="mb-3 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label={t("previous")}
          className={`${carouselId}-previous carousel-navigation inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={t("next")}
          className={`${carouselId}-next carousel-navigation inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      <Swiper
        modules={[A11y, Autoplay, Navigation, Pagination]}
        aria-label={resolvedAriaLabel}
        loop
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={{
          prevEl: `.${carouselId}-previous`,
          nextEl: `.${carouselId}-next`,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="pb-10"
      >
        {loopSlides.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`} className="!h-auto">
            <SlideCard slide={slide} viewLabel={t("viewProject")} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .projects-carousel .swiper-pagination {
          bottom: 0;
          line-height: 0;
        }

        .projects-carousel .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
          background: var(--border);
          opacity: 1;
          transition:
            width 180ms ease,
            background-color 180ms ease;
        }

        .projects-carousel .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 9999px;
          background: var(--primary);
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-carousel .swiper-pagination-bullet {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
