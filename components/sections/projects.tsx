"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { projects as fallbackProjects } from "@/data/portfolio";
import { getProjects, type Project } from "@/lib/api/services";
import type { ApiResult } from "@/lib/api/types";
import { SwiperCarousel, type CarouselSlide } from "@/components/ui/swiper-carousel";
import { Reveal } from "./shared";

const sectionClass = "w-full overflow-x-clip border-t border-border py-12 max-[760px]:py-10";
const containerClass = "mx-auto w-full max-w-[1120px] px-6";
const kickerClass = "mb-3 text-[13px] font-medium tracking-[.24em] text-foreground dark:text-primary";
const headingClass = "mb-6 max-w-[640px]  text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-semibold";

function toProjectSlide(project: Project, index: number): CarouselSlide {
  return {
    id: String(project.id ?? index + 1),
    title: project.title || "Project",
    description:
      project.description ||
      "A backend-driven project entry that is ready for the real production description.",
    imageUrl: project.image || "/network-pattern.svg",
    link: project.url || "#contact",
  };
}

export function Projects() {
  const t = useTranslations("Projects");
  const fallbackTranslations = t.raw("fallback") as { title: string; description: string }[];
  const { data, isLoading, error } = useQuery<ApiResult<Project[]>>({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const projectCards = (() => {
    if (data?.ok) {
      return data.data.map((project, index) => toProjectSlide(project, index));
    }

    return fallbackProjects.map((project, index) => ({
      id: project.number || String(index + 1),
      title: fallbackTranslations[index]?.title ?? project.title,
      description: fallbackTranslations[index]?.description ?? project.description,
      imageUrl: project.imageUrl || "/network-pattern.svg",
      link: project.link || "#contact",
    }));
  })();
  const projectLoadFailed = Boolean(error || (data && !data.ok));

  return (
    <section id="work" data-scroll-stack="pin" className={sectionClass}>
      <div className={`${containerClass} min-w-0`}>
        <Reveal>
          <p className={kickerClass}>{t("sectionLabel")}</p>
          <h2 className={headingClass}>{t("heading")}</h2>
        </Reveal>

        {/* {projectLoadFailed && !isLoading ? (
          <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {t("loadError")}
          </div>
        ) : null} */}

        <SwiperCarousel slides={projectCards} ariaLabel={t("carouselLabel")} />
      </div>
    </section>
  );
}
