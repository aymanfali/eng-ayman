import { useTranslations } from "next-intl";
import { MotionCard, Reveal } from "./shared";
export function Services() {
  const t = useTranslations("Services");
  const services = t.raw("items") as { number: string; title: string; description: string }[];
  return (
    <section id="services" data-scroll-stack="pin" className="border-t border-border py-[88px] max-[760px]:py-16">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <Reveal>
          <p className="mb-3 text-[13px] font-medium tracking-[.24em] text-foreground dark:text-primary">
            {t("sectionLabel")}
          </p>
          <h2 className="mb-10 max-w-[640px]  text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-semibold">
            {t("heading")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {services.map((service) => (
            <MotionCard
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-7"
              key={service.number}
              delay={Number(service.number) * 0.12}
            >
              <span className=" text-sm font-medium text-muted-foreground">
                {service.number}
              </span>
              <h3 className="m-0  text-[22px] font-semibold">
                {service.title}
              </h3>
              <p className="m-0 text-base text-muted-foreground">
                {service.description}
              </p>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
