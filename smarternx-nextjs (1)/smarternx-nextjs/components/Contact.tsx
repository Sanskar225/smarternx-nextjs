"use client";

import { FormEvent, useState } from "react";
import Reveal from "./Reveal";
import { contactInfo } from "@/lib/content";

// Types
interface ContactInfoItem {
  tag: string;
  value: string;
}

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// Constants
const fieldClasses =
  "w-full border-b border-line/50 bg-transparent px-0.5 py-3 font-body text-[15px] text-paper placeholder:text-slate-dim/50 focus:border-accent focus:outline-none transition-all duration-300";
const labelClasses = "font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-dim";

// Contact Info Item Component
const ContactInfoItem: React.FC<{ item: ContactInfoItem; isLast: boolean }> = ({ 
  item, 
  isLast 
}) => (
  <div className={`group py-5 border-t border-line/30 transition-colors hover:border-accent/20 ${isLast ? "border-b" : ""}`}>
    <span className={`${labelClasses} mb-1.5 block`}>{item.tag}</span>
    <div className="font-mono text-[15px] text-paper/90 transition-colors group-hover:text-accent">
      {item.value}
    </div>
  </div>
);

// Form Field Component
const FormField: React.FC<{
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}> = ({ 
  id, 
  name, 
  label, 
  type = "text", 
  placeholder = "", 
  required = false, 
  rows,
  className = "" 
}) => {
  const Component = rows ? "textarea" : "input";
  const inputProps = rows 
    ? { rows, className: `${fieldClasses} min-h-[90px] resize-y` }
    : { type, className: fieldClasses };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <Component
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        {...inputProps}
      />
    </div>
  );
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Uncomment when backend is ready:
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error("Failed to send message");
      
      setStatus("sent");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-8 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan/[0.03] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-container">
        {/* Header */}
        <Reveal className="mb-16 max-w-[680px]">
          <div className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-8 before:bg-gradient-to-r before:from-accent before:to-transparent">
            Reach Out
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,4vw,48px)] font-light tracking-tight leading-[1.1]">
            Connect with the
            <br />
            <span className="bg-gradient-to-r from-accent via-purple to-cyan bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              ecosystem.
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Column - Contact Info */}
          <Reveal>
            <p className="mb-10 max-w-[400px] text-[16px] leading-relaxed text-slate/90">
              Have questions about our products, solutions, or career opportunities? Reach out to
              our team to start a conversation.
            </p>
            
            <div className="space-y-1">
              {contactInfo.map((item, index) => (
                <ContactInfoItem 
                  key={item.tag} 
                  item={item} 
                  isLast={index === contactInfo.length - 1} 
                />
              ))}
            </div>

            {/* Status indicator */}
            <div className="mt-8 flex items-center gap-2 text-xs text-slate-dim">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/50 animate-pulse" />
              <span>Typically responds within 24 hours</span>
            </div>
          </Reveal>

          {/* Right Column - Form */}
          <Reveal>
            <div className="relative rounded-2xl border border-line/30 bg-ink-850/30 backdrop-blur-sm p-8 transition-all duration-300 hover:border-accent/20">
              {/* Decorative corner accents */}
              <div className="absolute -top-px -left-px h-6 w-6 rounded-tl-2xl border-t-2 border-l-2 border-accent/20" />
              <div className="absolute -top-px -right-px h-6 w-6 rounded-tr-2xl border-t-2 border-r-2 border-accent/20" />
              <div className="absolute -bottom-px -left-px h-6 w-6 rounded-bl-2xl border-b-2 border-l-2 border-accent/20" />
              <div className="absolute -bottom-px -right-px h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-accent/20" />

              <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                  <FormField
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                  <FormField
                    id="subject"
                    name="subject"
                    label="Subject"
                    placeholder="Project Inquiry, Partnership, UPSC Prep, etc."
                    className="md:col-span-2"
                  />
                  <FormField
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="How can we help you build the future?"
                    rows={4}
                    required
                    className="md:col-span-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative overflow-hidden rounded-full px-8 py-4 font-mono text-[13px] font-medium text-ink-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "sending" && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {status === "sent" && "✓ Message Sent!"}
                    {status === "error" && "✗ Failed to Send"}
                    {status === "idle" && (
                      <>
                        Send Message
                        <svg 
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent via-[#5eebae] to-accent bg-[length:200%_auto] animate-gradient" />
                  <span className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>

                {/* Form status message */}
                {status === "sent" && (
                  <div className="text-center text-sm text-accent animate-float">
                    Thank you! We'll get back to you soon. 🚀
                  </div>
                )}
                {status === "error" && (
                  <div className="text-center text-sm text-orange">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}