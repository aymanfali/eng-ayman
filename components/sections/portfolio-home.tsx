"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/feedback/toaster";
import { submitContactMessage } from "@/lib/api/services";
import { contactFormSchema } from "@/lib/validation/forms";

type Project = [category: string, title: string, description: string];
type Stat = [value: string, label: string];

export function PortfolioHome() {
  const t = useTranslations("Portfolio");
  const { push } = useToast();
  const projects = t.raw("projects.items") as Project[];
  const clients = t.raw("clients.items") as string[];
  const skills = t.raw("about.skills") as string[];
  const stats = t.raw("about.stats") as Stat[];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: { name: string; email: string; message: string }) => {
    const response = await submitContactMessage(values);

    if (!response.ok) {
      push({
        title: t("contact.errorTitle"),
        description: response.error.userMessage,
        variant: "error",
      });
      return;
    }

    reset();
    push({
      title: t("contact.successTitle"),
      description: t("contact.successMessage"),
      variant: "success",
    });
  };

  return (
    <div id="home" className="portfolio-page relative isolate overflow-hidden bg-[var(--pf-bg)] text-[var(--pf-ink)] transition-[background,color] duration-300 [font-family:var(--font-english),sans-serif] [&:lang(ar)]:[font-family:var(--font-arabic),sans-serif]">
      <section className="portfolio-hero relative isolate grid min-h-[94svh] grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] items-center gap-[4vw] px-[max(6vw,28px)] pt-[145px] pb-[90px] scroll-mt-[100px] max-[980px]:grid-cols-[minmax(0,1fr)_minmax(260px,0.75fr)] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-2 max-[700px]:px-6 max-[700px]:pt-[175px] max-[700px]:pb-[76px]" aria-labelledby="portfolio-title">
        <div className="pointer-events-none absolute -z-10 inset-0" aria-hidden="true" />
        <div className="relative z-[2] max-w-[760px] animate-[portfolio-enter_800ms_cubic-bezier(.2,.8,.2,1)_both] max-[700px]:relative">
          <p className="portfolio-kicker mb-[18px] flex items-center gap-[11px] text-xs font-bold uppercase text-[var(--pf-accent)]">{t("hero.kicker")}</p>
          <h1 id="portfolio-title" className="m-0 text-[88px] font-semibold leading-[0.99] [&_span]:block max-[980px]:text-[68px] max-[700px]:text-[54px] [&:lang(ar)]:font-[var(--font-arabic)] [&:lang(ar)]:text-[76px] [&:lang(ar)]:leading-[1.28] max-[980px]:[&:lang(ar)]:text-[60px] max-[700px]:[&:lang(ar)]:text-[47px]">
            {(t.raw("hero.lines") as string[]).map((line, index) => (
              <span className={`animate-[portfolio-title-in_700ms_cubic-bezier(.2,.8,.2,1)_both] ${index === 1 ? "bg-[linear-gradient(120deg,var(--pf-accent),var(--pf-lilac)_55%,#c4a4b9)] bg-clip-text text-transparent" : ""}`} style={{ animationDelay: `${index * 100}ms` }} key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="my-[27px] mb-[31px] max-w-[520px] text-lg leading-[1.75] text-[var(--pf-muted)] max-[700px]:my-[20px] max-[700px]:mb-6 max-[700px]:max-w-[480px] max-[700px]:text-base">{t("hero.description")}</p>
          <a className="inline-flex min-h-[52px] items-center justify-center gap-[18px] rounded-full bg-[var(--pf-ink)] px-[23px] text-sm [font-weight:650] text-[var(--pf-bg)] no-underline transition-[transform,box-shadow,opacity] duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(25_20_49_/_18%)] disabled:cursor-wait disabled:opacity-[0.65]" href="#projects">
            {t("hero.cta")} <ArrowDownRight aria-hidden="true" size={18} />
          </a>
        </div>
        <div className="portfolio-hero-art relative grid min-h-[420px] place-items-center animate-[portfolio-enter_800ms_cubic-bezier(.2,.8,.2,1)_both] [animation-delay:120ms] max-[980px]:min-h-[350px] max-[700px]:min-h-[290px] max-[700px]:mt-1.5" aria-label={t("home.logoAlt")}>
          <span className="absolute aspect-square w-[min(40vw,470px)] rounded-full border border-[var(--pf-line)] max-[700px]:w-[275px]" aria-hidden="true" />
          <Image className="relative z-[1] w-[min(65%,310px)] h-auto object-contain brightness-0 invert animate-[portfolio-float_6s_ease-in-out_infinite] max-[700px]:w-[175px]" src="/abrar.png" alt={t("home.logoAlt")} width={340} height={340} priority />
          <span className="absolute inset-inline-end-0 bottom-[42px] text-[10px] text-[var(--pf-muted)] max-[700px]:inset-inline-end-[8%] max-[700px]:bottom-[10px]">AF / VISUAL DESIGN</span>
        </div>
        <a className="absolute inset-inline-start-[max(6vw,28px)] bottom-[30px] grid h-11 w-[30px] place-items-center rounded-full border border-[var(--pf-line)] max-[700px]:hidden" href="#about" aria-label={t("hero.scrollLabel")}>
          <span className="h-2 w-[3px] rounded-sm bg-[var(--pf-accent)] animate-[portfolio-scroll_1.5s_ease-in-out_infinite]" aria-hidden="true" />
        </a>
      </section>

      <section id="about" className="mx-auto grid w-[calc(100%-56px)] max-w-[1240px] grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] items-center gap-[clamp(44px,8vw,110px)] py-28 scroll-mt-[100px] max-[700px]:w-[calc(100%-40px)] max-[700px]:max-w-[540px] max-[700px]:grid-cols-1 max-[700px]:gap-[34px] max-[700px]:py-[78px]">
        <div className="portfolio-about-art relative grid min-h-[440px] overflow-hidden rounded-[5px] place-items-center bg-[linear-gradient(145deg,#5b53a3,#998ac1_70%,#b8a8df)] max-[980px]:min-h-[380px] max-[700px]:min-h-[300px]">
          <div className="absolute inset-inline-end-[22px] top-[14px] text-sm font-bold text-white/30" aria-hidden="true">AF</div>
          <Image className="relative z-[1] w-[48%] h-auto brightness-0 invert" src="/abrar.png" alt="" width={220} height={220} />
          <span className="absolute inset-inline-start-[22px] bottom-5 text-xs text-white">{t("about.artCaption")}</span>
        </div>
        <div>
          <p className="portfolio-kicker mb-[18px] flex items-center gap-[11px] text-xs font-bold uppercase text-[var(--pf-accent)]">{t("about.kicker")}</p>
          <h2 className="mb-6 mt-0 max-w-[720px] text-5xl font-semibold leading-[1.12] [&:lang(ar)]:leading-[1.4] max-[700px]:text-[38px]">{t("about.title")}</h2>
          {(t.raw("about.paragraphs") as string[]).map((paragraph) => (
            <p className="mb-4 mt-0 max-w-[640px] text-base leading-[1.85] text-[var(--pf-muted)]" key={paragraph}>{paragraph}</p>
          ))}
          <div className="mt-8 flex flex-wrap gap-x-[42px] gap-y-[30px] max-[700px]:gap-6">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong className="block bg-[linear-gradient(120deg,var(--pf-accent),var(--pf-lilac)_55%,#c4a4b9)] bg-clip-text text-[34px] font-semibold text-transparent max-[700px]:text-[30px]">{value}</strong>
                <span className="mt-[3px] block text-xs text-[var(--pf-muted)]">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2" aria-label={t("about.skillsLabel")}>
            {skills.map((skill) => <span className="rounded-full border border-[var(--pf-line)] px-[13px] py-2 text-xs text-[var(--pf-muted)]" key={skill}>{skill}</span>)}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto w-[calc(100%-56px)] max-w-[1240px] py-28 scroll-mt-[100px] max-[700px]:w-[calc(100%-40px)] max-[700px]:max-w-[540px] max-[700px]:py-[78px]">
        <div className="mb-9 flex items-end justify-between gap-5">
          <div>
            <p className="portfolio-kicker mb-[18px] flex items-center gap-[11px] text-xs font-bold uppercase text-[var(--pf-accent)]">{t("projects.kicker")}</p>
            <h2 className="mb-0 mt-0 max-w-[720px] text-5xl font-semibold leading-[1.12] [&:lang(ar)]:leading-[1.4] max-[700px]:text-[38px]">{t("projects.title")}</h2>
          </div>
          <span className="pb-2 text-xs text-[var(--pf-muted)]">01 — 04</span>
        </div>
        <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1 max-[700px]:gap-[15px]">
          {projects.map(([category, title, description], index) => (
            <article className="group overflow-hidden border border-[var(--pf-line)] bg-[var(--pf-bg)] transition-[transform,box-shadow] duration-[240ms] hover:-translate-y-[5px] hover:shadow-[0_18px_38px_rgb(25_20_49_/_12%)]" key={title}>
              <div className={`portfolio-project-art relative grid min-h-[270px] overflow-hidden place-items-center max-[700px]:min-h-[240px] ${["bg-[linear-gradient(135deg,#594c8e,#a698c8)]", "bg-[linear-gradient(135deg,#e1b5a2,#f1d8c9_58%,#8a9b91)]", "bg-[linear-gradient(135deg,#263d3a,#668174_62%,#d4dfba)]", "bg-[linear-gradient(135deg,#d9c66c,#e9ddad_55%,#8b705c)]"][index] ?? ""}`} aria-hidden="true">
                <span className="relative z-[1] text-[112px] font-semibold leading-none text-white [font-family:var(--font-english),sans-serif] [text-shadow:0_12px_24px_rgb(25_20_49_/_18%)]">{["L", "N", "R", "S"][index]}</span>
                <span className="absolute inset-inline-start-5 top-[18px] text-[11px] text-white">0{index + 1}</span>
              </div>
              <div className="relative px-6 pt-[22px] pb-[25px]">
                <span className="text-[11px] font-bold text-[var(--pf-accent)]">{category}</span>
                <h3 className="my-2 mr-[35px] mb-[7px] text-[22px] font-semibold leading-[1.25]">{title}</h3>
                <p className="m-0 max-w-[460px] text-[13px] leading-[1.65] text-[var(--pf-muted)]">{description}</p>
                <ArrowUpRight className="absolute inset-inline-end-[22px] top-6 text-[var(--pf-muted)]" aria-hidden="true" size={19} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="clients" className="bg-[#191431] text-[#f7f5f0] scroll-mt-[100px]">
        <div className="mx-auto grid w-[calc(100%-56px)] max-w-[1240px] grid-cols-[0.8fr_1.2fr] items-center gap-[60px] py-28 max-[700px]:w-[calc(100%-40px)] max-[700px]:max-w-[540px] max-[700px]:grid-cols-1 max-[700px]:gap-[34px] max-[700px]:py-[78px]">
          <div>
            <p className="portfolio-kicker mb-[18px] flex items-center gap-[11px] text-xs font-bold uppercase text-[#d3e77c]">{t("clients.kicker")}</p>
            <h2 className="mb-0 mt-0 max-w-[720px] text-5xl font-semibold leading-[1.12] [&:lang(ar)]:leading-[1.4] max-[700px]:text-[38px]">{t("clients.title")}</h2>
          </div>
          <div className="grid grid-cols-5 border-t border-l border-white/20 max-[700px]:grid-cols-2">
            {clients.map((client, index) => (
              <span className="grid min-h-[78px] place-items-center border-b border-r border-white/20 text-sm font-semibold text-[#e7deee] max-[700px]:min-h-[68px]" key={`${client}-${index}`}>{client}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid w-[calc(100%-56px)] max-w-[1240px] grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] items-start gap-[clamp(40px,8vw,110px)] py-28 scroll-mt-[100px] max-[700px]:w-[calc(100%-40px)] max-[700px]:max-w-[540px] max-[700px]:grid-cols-1 max-[700px]:gap-7 max-[700px]:py-[78px]">
        <div>
          <p className="portfolio-kicker mb-[18px] flex items-center gap-[11px] text-xs font-bold uppercase text-[var(--pf-accent)]">{t("contact.kicker")}</p>
          <h2 className="mb-[18px] mt-0 max-w-[720px] text-5xl font-semibold leading-[1.12] [&:lang(ar)]:leading-[1.4] max-[700px]:text-[38px]">{t("contact.title")}</h2>
          <p className="mb-4 mt-0 max-w-[640px] text-base leading-[1.85] text-[var(--pf-muted)]">{t("contact.description")}</p>
          <a className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--pf-accent)] no-underline" href={`mailto:${t("contact.email")}`}>
            {t("contact.email")} <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
        <form className="grid gap-[18px]" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="mb-[7px] block text-xs font-semibold text-[var(--pf-muted)]">{t("contact.name")}</span>
            <input className="w-full rounded-[3px] border border-[var(--pf-line)] bg-[var(--pf-panel)] px-[15px] py-[13px] font-[inherit] text-sm text-[var(--pf-ink)] transition-[border-color,box-shadow] duration-[180ms] focus:border-[var(--pf-accent)] focus:outline-none focus:shadow-[0_0_0_3px_rgb(91_83_163_/_16%)] aria-[invalid=true]:border-[#b54747]" {...register("name")} autoComplete="name" aria-invalid={Boolean(errors.name)} />
            {errors.name ? <small className="mt-[5px] block text-xs text-[#b54747]">{errors.name.message}</small> : null}
          </label>
          <label className="block">
            <span className="mb-[7px] block text-xs font-semibold text-[var(--pf-muted)]">{t("contact.emailLabel")}</span>
            <input className="w-full rounded-[3px] border border-[var(--pf-line)] bg-[var(--pf-panel)] px-[15px] py-[13px] font-[inherit] text-sm text-[var(--pf-ink)] transition-[border-color,box-shadow] duration-[180ms] focus:border-[var(--pf-accent)] focus:outline-none focus:shadow-[0_0_0_3px_rgb(91_83_163_/_16%)] aria-[invalid=true]:border-[#b54747]" type="email" {...register("email")} autoComplete="email" aria-invalid={Boolean(errors.email)} />
            {errors.email ? <small className="mt-[5px] block text-xs text-[#b54747]">{errors.email.message}</small> : null}
          </label>
          <label className="block">
            <span className="mb-[7px] block text-xs font-semibold text-[var(--pf-muted)]">{t("contact.message")}</span>
            <textarea className="w-full resize-y rounded-[3px] border border-[var(--pf-line)] bg-[var(--pf-panel)] px-[15px] py-[13px] font-[inherit] text-sm text-[var(--pf-ink)] transition-[border-color,box-shadow] duration-[180ms] focus:border-[var(--pf-accent)] focus:outline-none focus:shadow-[0_0_0_3px_rgb(91_83_163_/_16%)] aria-[invalid=true]:border-[#b54747]" rows={5} {...register("message")} aria-invalid={Boolean(errors.message)} />
            {errors.message ? <small className="mt-[5px] block text-xs text-[#b54747]">{errors.message.message}</small> : null}
          </label>
          <button className="mt-0.5 inline-flex min-h-[52px] justify-self-start items-center gap-[18px] rounded-full border-0 bg-[var(--pf-ink)] px-[23px] font-[inherit] text-sm [font-weight:650] text-[var(--pf-bg)] transition-[transform,box-shadow,opacity] duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(25_20_49_/_18%)] disabled:cursor-wait disabled:opacity-[0.65]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("contact.sending") : t("contact.send")}
            <ArrowUpRight aria-hidden="true" size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}
