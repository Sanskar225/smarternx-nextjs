"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import DomainIcon from "./DomainIcon";
import { domains } from "@/lib/content";
import { X, ArrowRight, Sparkles, Zap, Rocket, Heart, Code, Globe } from "lucide-react";

// Types
interface Domain {
  id: string;
  name: string;
  icon: "cap" | "heart" | "briefcase" | "pulse" | "network";
}

interface EcosystemItem {
  name: string;
  subName: string;
  description: string;
  icon?: React.ReactNode;
}

interface EcosystemData {
  id: string;
  title: string;
  subtitle: string;
  items: EcosystemItem[];
}

// Domain Card Component
interface DomainCardProps {
  domain: Domain;
  index: number;
  onClick: () => void;
}

const DOMAIN_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  education: {
    bg: "hover:bg-accent/5",
    border: "group-hover:border-accent/30",
    text: "group-hover:text-accent",
    glow: "shadow-accent/20"
  },
  healthcare: {
    bg: "hover:bg-cyan/5",
    border: "group-hover:border-cyan/30",
    text: "group-hover:text-cyan",
    glow: "shadow-cyan/20"
  },
  career: {
    bg: "hover:bg-purple/5",
    border: "group-hover:border-purple/30",
    text: "group-hover:text-purple",
    glow: "shadow-purple/20"
  },
  sports: {
    bg: "hover:bg-orange/5",
    border: "group-hover:border-orange/30",
    text: "group-hover:text-orange",
    glow: "shadow-orange/20"
  },
  others: {
    bg: "hover:bg-accent/5",
    border: "group-hover:border-accent/30",
    text: "group-hover:text-accent",
    glow: "shadow-accent/20"
  }
};

// Map domain names to keys for ecosystem data
const getDomainKey = (name: string): string => {
  const map: Record<string, string> = {
    "Education": "education",
    "Healthcare": "healthcare",
    "Career": "career",
    "Sports & Fitness": "sports",
    "Others": "others"
  };
  return map[name] || name.toLowerCase();
};

const DomainCard: React.FC<DomainCardProps> = ({ domain, index, onClick }) => {
  const domainKey = getDomainKey(domain.name);
  const colors = DOMAIN_COLORS[domainKey] || DOMAIN_COLORS.education;
  
  return (
    <button
      onClick={onClick}
      className={`group relative flex min-h-[260px] w-full flex-col gap-4 overflow-hidden rounded-xl border border-line/30 bg-ink-850/30 p-7 pb-6 text-left transition-all duration-500 hover:-translate-y-1 ${colors.bg} ${colors.border}`}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      {/* Gradient background glow */}
      <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent via-purple to-cyan transition-all duration-700 group-hover:w-full" />
      
      {/* Corner brackets */}
      <div className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-accent/0 transition-all duration-300 group-hover:border-accent/30" />
      <div className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-accent/0 transition-all duration-300 group-hover:border-accent/30" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent/0 transition-all duration-300 group-hover:border-accent/30" />
      <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent/0 transition-all duration-300 group-hover:border-accent/30" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4.5">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-dim/50">
            {domain.id}
          </span>
          <span className="text-[10px] font-mono text-slate-dim/30">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>
        
        <div className={`transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${colors.text}`}>
          <DomainIcon name={domain.icon} size={40} />
        </div>
        
        <h3 className="mt-auto font-display text-[20px] font-light tracking-tight transition-colors duration-300 group-hover:text-paper">
          {domain.name}
        </h3>
        
        <span className={`flex items-center gap-1.5 font-mono text-[11.5px] font-medium transition-all duration-300 ${colors.text}`}>
          Explore Ecosystem
          <ArrowRight className="h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </span>
      </div>
      
      {/* Bottom shimmer */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-700 group-hover:w-full" />
    </button>
  );
};

// Ecosystem Modal Component
interface EcosystemModalProps {
  data: EcosystemData | null;
  isOpen: boolean;
  onClose: () => void;
}

const EcosystemModal: React.FC<EcosystemModalProps> = ({ data, isOpen, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-ink-900/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-slideUp">
        <div 
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-ink-850/95 backdrop-blur-xl border border-line/30 p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 text-slate-dim transition-colors hover:bg-ink-800 hover:text-paper"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {data.id} ecosystem
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
            </div>
            <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,42px)] font-light tracking-tight">
              {data.title}
            </h2>
            <p className="mt-2 text-[15px] text-slate/80">{data.subtitle}</p>
          </div>

          {/* Ecosystem Items */}
          <div className="grid gap-4 md:grid-cols-2">
            {data.items.map((item, index) => (
              <div
                key={item.name}
                className="group rounded-xl border border-line/20 bg-ink-900/50 p-6 transition-all duration-300 hover:border-accent/20 hover:bg-ink-900/80 hover:shadow-lg hover:shadow-accent/5"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  {item.icon && (
                    <div className="mt-1 text-accent">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <h4 className="font-display text-lg font-medium">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-accent/60">{item.subName}</span>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end border-t border-line/20 pt-6">
            <Link
              href="#products"
              className="group flex items-center gap-2 rounded-full border border-accent/20 px-6 py-2.5 font-mono text-[13px] text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/10"
            >
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Domains Component
export default function Domains() {
  const [selectedDomain, setSelectedDomain] = useState<EcosystemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ecosystem data mapping - with proper keys matching domain names
  const ecosystemData: Record<string, EcosystemData> = {
    education: {
      id: "education",
      title: "Education Ecosystem",
      subtitle: "A comprehensive suite designed to bridge the gap between education and career.",
      items: [
        {
          name: "Career & Aptitude",
          subName: "Go-Genius",
          description: "Focuses on building students' overall skill development, Aptitude, English, and Career Courses like civil services, medical, and defence.",
          icon: <Sparkles className="h-5 w-5" />
        },
        {
          name: "Academics",
          subName: "SmartPad",
          description: "Focuses on students' academic growth, personalized learning, exam-focused practice, and continuous performance tracking.",
          icon: <Rocket className="h-5 w-5" />
        },
        {
          name: "Assessments",
          subName: "Examsphere",
          description: "Comprehensive examination platform with AI-driven insights and analytics.",
          icon: <Zap className="h-5 w-5" />
        },
        {
          name: "Technology",
          subName: "AI Studio",
          description: "Focuses on students' AI and technology skills including Chatbots, Voice Agents, Machine Learning, Deep Learning, and Recommendation Models.",
          icon: <Code className="h-5 w-5" />
        }
      ]
    },
    healthcare: {
      id: "healthcare",
      title: "Healthcare Ecosystem",
      subtitle: "AI diagnostics merging modern medicine with Ayurvedic intelligence.",
      items: [
        {
          name: "Allopathy",
          subName: "Easydiagnosis",
          description: "AI-assisted diagnostic support trained on modern clinical data, helping identify symptoms and suggest care pathways quickly.",
          icon: <Heart className="h-5 w-5" />
        },
        {
          name: "Ayurvedic",
          subName: "Ved",
          description: "Combines traditional Ayurvedic knowledge with AI to recommend natural remedies, dosha analysis, and holistic wellness plans.",
          icon: <Sparkles className="h-5 w-5" />
        }
      ]
    },
    career: {
      id: "career",
      title: "Career Ecosystem",
      subtitle: "Software skills and AI-powered hiring for the modern workforce.",
      items: [
        {
          name: "Software Skills",
          subName: "Codeplex",
          description: "A hands-on coding platform that builds real-world software development skills through structured, project-based learning.",
          icon: <Code className="h-5 w-5" />
        },
        {
          name: "AI Hiring",
          subName: "InterviewX",
          description: "AI-driven interview practice and candidate screening that matches talent to roles with precision and speed.",
          icon: <Zap className="h-5 w-5" />
        }
      ]
    },
    sports: {
      id: "sports",
      title: "Sports & Fitness Ecosystem",
      subtitle: "Intelligent tracking and personalized coaching for a healthier life.",
      items: [
        {
          name: "AI Fitness Coach",
          subName: "FitLife",
          description: "Personalized workout plans, calorie tracking, and mood-based recommendations powered by AI coaching.",
          icon: <Heart className="h-5 w-5" />
        },
        {
          name: "AI Sports Coach",
          subName: "CoachX",
          description: "Analyzes player movement and performance data to deliver tailored training plans and game-day strategy insights.",
          icon: <Rocket className="h-5 w-5" />
        }
      ]
    },
    others: {
      id: "others",
      title: "Others Ecosystem",
      subtitle: "Hyperlocal services and community ecosystems.",
      items: [
        {
          name: "Services",
          subName: "Doer",
          description: "Hyperlocal services ecosystem connecting people with trusted local providers.",
          icon: <Globe className="h-5 w-5" />
        },
        {
          name: "Food",
          subName: "Freshbite",
          description: "Intelligent food delivery and nutrition tracking ecosystem.",
          icon: <Heart className="h-5 w-5" />
        },
        {
          name: "Community",
          subName: "Kehloor",
          description: "Platform for community engagement and local interactions.",
          icon: <Sparkles className="h-5 w-5" />
        }
      ]
    }
  };

  const handleDomainClick = useCallback((domainName: string) => {
    // Convert domain name to key
    const domainKey = getDomainKey(domainName);
    console.log("Domain clicked:", domainName, "Key:", domainKey);
    
    const data = ecosystemData[domainKey];
    console.log("Ecosystem data:", data);
    
    if (data) {
      setSelectedDomain(data);
      setIsModalOpen(true);
    } else {
      console.error("No ecosystem data found for:", domainName);
    }
  }, [ecosystemData]); // ✅ Fixed: Added ecosystemData as dependency

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDomain(null), 300);
  }, []);

  return (
    <section id="domains" className="relative overflow-hidden px-8 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-purple/[0.03] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-container">
        {/* Header */}
        <Reveal className="mb-16 max-w-[680px]">
          <div className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-8 before:bg-gradient-to-r before:from-accent before:to-transparent">
            Our Domains
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,4vw,48px)] font-light tracking-tight leading-[1.1]">
            Multiple domains.
            <br />
            <span className="bg-gradient-to-r from-accent via-purple to-cyan bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              One ecosystem.
            </span>
          </h2>
          <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-slate/80">
            SmarternX builds intelligent solutions across five critical human domains — each
            powered by AI and designed to create measurable, lasting impact.
          </p>
        </Reveal>

        {/* Domains Grid */}
        <Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {domains && domains.length > 0 ? (
              domains.map((domain, index) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  index={index}
                  onClick={() => handleDomainClick(domain.name)}
                />
              ))
            ) : (
              <p className="text-slate">No domains found. Check your content file.</p>
            )}
          </div>
        </Reveal>

        {/* Bottom indicator */}
        <Reveal className="mt-12 text-center">
          <div className="inline-flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/30" />
            <span className="text-xs font-mono text-slate-dim/50">
              {domains?.length || 0} domains • AI-powered
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/30" />
          </div>
        </Reveal>
      </div>

      {/* Ecosystem Modal */}
      <EcosystemModal
        data={selectedDomain}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}