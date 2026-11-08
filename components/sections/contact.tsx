"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/feedback/toaster";
import { submitContactMessage } from "@/lib/api/services";
import { contactFormSchema } from "@/lib/validation/forms";
import { Reveal } from "./shared";

export function Contact() {
  const { push } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
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
        title: "Message not sent",
        description: response.error.userMessage,
        variant: "error",
      });
      return;
    }

    reset();
    push({
      title: "Message sent",
      description: "Thanks for reaching out. I will get back to you soon.",
      variant: "success",
    });
  };

  return (
    <section id="contact" data-scroll-stack="pin" className="border-t border-border py-[88px] max-[760px]:py-16">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-[#0e1116] px-8 py-[72px] text-white">
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
                <h2 className="mb-4 font-heading text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-semibold text-white">
                  Let’s build something intelligent.
                </h2>
                <p className="max-w-[480px] text-[#9ca3af]">
                  Tell me about your product and where AI could help. I reply to every message.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/90">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    aria-invalid={Boolean(errors.name)}
                    className="w-full rounded-xl border border-white/15 bg-[#0e1116]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p className="text-xs text-red-300">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/90">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={Boolean(errors.email)}
                    className="w-full rounded-xl border border-white/15 bg-[#0e1116]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="you@example.com"
                  />
                  {errors.email ? (
                    <p className="text-xs text-red-300">{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/90">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    aria-invalid={Boolean(errors.message)}
                    className="w-full rounded-xl border border-white/15 bg-[#0e1116]/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="Tell me a bit about your product, challenge, and timeline."
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
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
