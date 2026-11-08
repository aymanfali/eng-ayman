"use client";

import { useQuery } from "@tanstack/react-query";
import { projects as fallbackProjects } from "@/data/portfolio";
import { getProjects, type Project } from "@/lib/api/services";
import type { ApiResult } from "@/lib/api/types";
import { MotionCard, Reveal } from "./shared";

const sectionClass = "border-t border-border py-[88px] max-[760px]:py-16";
const containerClass = "mx-auto w-full max-w-[1120px] px-6";
const kickerClass = "mb-3 text-[13px] font-medium tracking-[.24em] text-foreground dark:text-primary";
const headingClass = "mb-10 max-w-[640px] font-heading text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-semibold";

function toProjectCard(project: Project, index: number) {
  return {
    number: String(index + 1).padStart(2, "0"),
    title: project.title || "Project",
    description:
      project.description ||
      "A backend-driven project entry that is ready for the real production description.",
    tags: project.tags?.length ? project.tags : ["Backend API", "Product"],
  };
}

export function Projects() {
  const { data, isLoading, error } = useQuery<ApiResult<Project[]>>({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const projectCards = (() => {
    if (data?.ok) {
      return data.data.map((project, index) => toProjectCard(project, index));
    }

    return fallbackProjects.map((project, index) => ({
      ...project,
      number: project.number || String(index + 1).padStart(2, "0"),
    }));
  })();

  return (
    <section id="work" data-scroll-stack="pin" className={sectionClass}>
      <div className={containerClass}>
        <Reveal>
          <p className={kickerClass}>SELECTED WORK</p>
          <h2 className={headingClass}>Projects and case studies</h2>
        </Reveal>

        {error && !isLoading ? (
          <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            The project list is temporarily unavailable. Showing the local fallback content.
          </div>
        ) : null}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {projectCards.map((project) => (
            <MotionCard
              className="overflow-hidden rounded-lg border border-border bg-card"
              key={project.title + project.number}
              delay={Number(project.number) * 0.12}
            >
              <div
                className="h-[170px] overflow-hidden bg-repeat"
                style={{
                  backgroundImage: "url('/network-pattern.svg')",
                  backgroundSize: "96px 96px",
                }}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2.5 px-7 pt-6 pb-7">
                <span className="font-heading text-sm font-medium text-muted-foreground">
                  CASE STUDY {project.number}
                </span>
                <h3 className="m-0 font-heading text-[22px] font-semibold">
                  {project.title}
                </h3>
                <p className="m-0 text-base text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="rounded-full border border-border px-3 py-1 text-[13px] text-muted-foreground"
                      key={`${project.title}-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
