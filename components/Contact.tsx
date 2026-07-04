"use client";

import { FormEvent, useState } from "react";
import Reveal from "./Reveal";
import { contactInfo } from "@/lib/content";

const fieldClasses =
  "border-b border-line bg-transparent px-0.5 py-2.5 font-body text-[15px] text-paper placeholder:text-slate-dim focus:border-accent focus:outline-none";
const labelClasses = "font-mono text-[10.5px] uppercase tracking-[0.08em] text-slate-dim";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  // Demo-only handler. Wire this up to your form endpoint / API route
  // (e.g. app/api/contact/route.ts) when the backend is ready.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <section id="contact" className="px-8 py-28">
      <div className="mx-auto max-w-container">
        <Reveal className="mb-16 max-w-[640px]">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-4 before:bg-accent">
            Reach Out
          </div>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,42px)] font-normal tracking-tight">
            Connect with the ecosystem.
          </h2>
        </Reveal>

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="mb-8 max-w-[400px] text-[15px] text-slate">
              Have questions about our products, solutions, or career opportunities? Reach out to
              our team to start a conversation.
            </p>
            {contactInfo.map((item, i) => (
              <div
                key={item.tag}
                className={`py-4.5 border-t border-line ${
                  i === contactInfo.length - 1 ? "border-b" : ""
                }`}
              >
                <span className={`${labelClasses} mb-1.5 block`}>{item.tag}</span>
                <div className="font-mono text-[15px]">{item.value}</div>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fname" className={labelClasses}>
                    Full Name
                  </label>
                  <input id="fname" name="fname" type="text" required placeholder="Enter your full name" className={fieldClasses} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="femail" className={labelClasses}>
                    Email Address
                  </label>
                  <input id="femail" name="femail" type="email" required placeholder="you@example.com" className={fieldClasses} />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="fsubject" className={labelClasses}>
                    Subject
                  </label>
                  <input
                    id="fsubject"
                    name="fsubject"
                    type="text"
                    placeholder="Project Inquiry, Partnership, UPSC Prep, etc."
                    className={fieldClasses}
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="fmessage" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="fmessage"
                    name="fmessage"
                    required
                    placeholder="How can we help you build the future?"
                    className={`${fieldClasses} min-h-[90px] resize-y`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-fit rounded-sm border border-accent bg-accent px-5 py-3.5 font-mono text-[13px] font-medium text-ink-900 transition-transform hover:-translate-y-0.5 hover:bg-[#5eebae]"
              >
                {status === "sent" ? "Message Sent ✓" : "Send Message →"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
