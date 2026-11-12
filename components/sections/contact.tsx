"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/feedback/toaster";
import { submitContactMessage } from "@/lib/api/services";
import { createContactFormSchema } from "@/lib/validation/forms";
import { Reveal } from "./shared";

export function Contact() {
  const t = useTranslations("Contact");
  const { push } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createContactFormSchema({
      nameMin: t("nameMin"),
      nameMax: t("nameMax"),
      emailInvalid: t("emailInvalid"),
      messageMin: t("messageMin"),
      messageMax: t("messageMax"),
    })),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: { name: string; email: string; message: string }) => {
    const response = await submitContactMessage(values);

    if (!response.ok) {
      push({
        title: t("failedTitle"),
        description: t("failedDescription"),
        variant: "error",
      });
      return;
    }

    reset();
    push({
      title: t("sentTitle"),
      description: t("sentDescription"),
      variant: "success",
    });
  };

  return (
    <section id="contact" data-scroll-stack="pin" className="border-t border-border py-[88px] max-[760px]:py-16">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-[#191431] px-8 py-[72px] text-white">
            <div
              className="pointer-events-none absolute inset-0 bg-repeat opacity-45"
              style={{
                backgroundImage: "url('/network-pattern.svg')",
                backgroundSize: "96px 96px",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
              <div className="text-center lg:text-left">
                <h2 className="mb-4  text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-semibold text-white">
                  {t("heading")}
                </h2>
                <p className="max-w-[480px] text-[#9ca3af]">
                  {t("description")}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/90">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    aria-invalid={Boolean(errors.name)}
<<<<<<< HEAD
                    className="w-full rounded-xl border border-white/15 bg-[#191431]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="Your name"
=======
                    className="w-full rounded-xl border border-white/15 bg-[#0e1116]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder={t("namePlaceholder")}
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
                  />
                  {errors.name ? (
                    <p className="text-xs text-red-300">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/90">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={Boolean(errors.email)}
<<<<<<< HEAD
                    className="w-full rounded-xl border border-white/15 bg-[#191431]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="you@example.com"
=======
                    className="w-full rounded-xl border border-white/15 bg-[#0e1116]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder={t("emailPlaceholder")}
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
                  />
                  {errors.email ? (
                    <p className="text-xs text-red-300">{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/90">
                    {t("details")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    aria-invalid={Boolean(errors.message)}
<<<<<<< HEAD
                    className="w-full rounded-xl border border-white/15 bg-[#191431]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="Tell me a bit about your product, challenge, and timeline."
=======
                    className="w-full rounded-xl border border-white/15 bg-[#0e1116]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder={t("detailsPlaceholder")}
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
                  />
                  {errors.message ? (
                    <p className="text-xs text-red-300">{errors.message.message}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-[26px] font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? t("sending") : t("send")}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
