import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Layout from "../Layout/Layout";
import bgImage from "../../assets/heroimg/bg-image.png";

import {
  ShieldCheckIcon,
  BellAlertIcon,
  CalculatorIcon,
  ChartBarIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

/* ── Animated Counter ── */
const Counter = ({ end, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

/* ── FAQ Accordion Item ── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-surface-800/50 rounded-card overflow-hidden transition-colors hover:border-surface-700/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-surface-200">
          {question}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-surface-400 flex-shrink-0 ml-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-surface-400 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

/* ── Section Wrapper ── */
const Section = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const Hero = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Investment Tracking",
      desc: "Track stocks, mutual funds, PPF, FD, gold & silver in one secure dashboard.",
      color: "emerald",
    },
    {
      icon: BellAlertIcon,
      title: "Nominee Alerts",
      desc: "Notify your loved ones about your wealth — even when you can't.",
      color: "cyan",
    },
    {
      icon: CalculatorIcon,
      title: "SIP Calculator",
      desc: "Plan your systematic investments with precise return projections.",
      color: "emerald",
    },
    {
      icon: ChartBarIcon,
      title: "Stock Analytics",
      desc: "Calculate your average stock price across multiple purchases.",
      color: "cyan",
    },
    {
      icon: ArrowTrendingDownIcon,
      title: "Loss Recovery",
      desc: "Understand the true cost of losses and the recovery needed.",
      color: "emerald",
    },
    {
      icon: UserGroupIcon,
      title: "Family Protection",
      desc: "Ensure your family knows about every financial asset you hold.",
      color: "cyan",
    },
  ];

  const stats = [
    { value: 5, suffix: "+", label: "Active Users" },
    { value: 78000, prefix: "₹", suffix: " Cr+", label: "Unclaimed Wealth in India" },
    { value: 5, suffix: "+", label: "Families Protected" },
  ];

  const testimonials = [
    {
      quote:
        "My Wealth gave me peace of mind knowing my family will be informed about all our financial assets.",
      name: "Priya Sharma",
      role: "Working Professional",
    },
    {
      quote:
        "The SIP calculator helped me plan my daughter's education fund perfectly. Simple yet powerful.",
      name: "Rajesh Patel",
      role: "Small Business Owner",
    },
    {
      quote:
        "I discovered forgotten FDs worth ₹2.5 Lakhs after tracking everything in one place.",
      name: "Anita Desai",
      role: "Homemaker",
    },
  ];

  const faqs = [
    {
      question: "What is My Wealth?",
      answer:
        "My Wealth is a secure platform to track all your financial assets — stocks, mutual funds, FDs, PPFs, gold, and silver — in one place. It also lets you set nominees and send investment summaries to loved ones.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Yes. We use Firebase Authentication and encrypted Firestore databases. Your data is private and never shared with third parties.",
    },
    {
      question: "How does the nominee alert system work?",
      answer:
        "You can add a nominee with their email address. With one click, your complete investment summary is sent to them via email, ensuring they are always informed.",
    },
    {
      question: "Is My Wealth free to use?",
      answer:
        "Yes, My Wealth is completely free for all users. We believe every family deserves financial awareness and protection.",
    },
    {
      question: "Can I track gold and silver investments?",
      answer:
        "Absolutely. Along with stocks, mutual funds, PPF, and fixed deposits, you can track your gold and silver holdings with full valuation history.",
    },
  ];

  const colorMap = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      glow: "group-hover:shadow-glow-emerald",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
      glow: "group-hover:shadow-glow-cyan",
    },
  };

  return (
    <Layout>
      {/* ═════════ HERO SECTION ═════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div 
          className="absolute inset-0 z-10 opacity-60 bg-contain bg-no-repeat max-md:hidden" 
          style={{ backgroundImage: `url(${bgImage})` }} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-950 to-navy-950" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-slow" />

        <div className="relative section-container py-20 z-30 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-display font-bold text-white leading-tight tracking-tight"
            >
              Protect Your Family's {""}
              <span className="text-gradient">Financial Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg sm:text-body-lg text-surface-200 max-w-xl mx-auto leading-relaxed"
            >
              Track every investment. Alert your nominees. Never let your
              family's wealth go unnoticed or unclaimed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/auth" className="btn-primary text-base px-8 py-3.5">
                Start Tracking Free
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3.5 border-white">
                Login to Dashboard
              </Link>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix || ""}
                  />
                </div>
                <p className="mt-1 text-xs sm:text-sm text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═════════ FEATURES GRID ═════════ */}
      <Section className="py-20 md:py-28 bg-surface-950">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-headline text-white">
              Everything You Need to{" "}
              <span className="text-gradient">Manage Wealth</span>
            </h2>
            <p className="mt-4 text-surface-400">
              Powerful tools designed for real families, not just traders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group card-premium p-6 ${c.glow}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}
                  >
                    <f.icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-surface-400 leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═════════ HOW IT WORKS ═════════ */}
      <Section className="py-20 md:py-28 bg-navy-950/50">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-headline text-white">
              Get Started in <span className="text-gradient">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "Sign up in seconds with your email. No bank linking required.",
              },
              {
                step: "02",
                title: "Add Your Investments",
                desc: "Record your stocks, MFs, FDs, PPF, gold, and silver holdings.",
              },
              {
                step: "03",
                title: "Protect Your Family",
                desc: "Set a nominee and send your investment summary to loved ones anytime.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 mb-5">
                  <span className="text-xl font-bold text-gradient">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-surface-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═════════ FINANCIAL AWARENESS ═════════ */}
      <Section className="py-20 md:py-28 bg-surface-950">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-amber mb-6 mx-auto">Did You Know?</div>
            <h2 className="text-headline text-white">
              Over{" "}
              <span className="text-gradient-gold">₹78,000 Crores</span>{" "}
              in wealth lies unclaimed in India
            </h2>
            <p className="mt-6 text-surface-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Forgotten bank accounts, unclaimed insurance policies, idle PPF
              accounts, and lost investment records families lose wealth every
              year simply because no one knew these assets existed. My Wealth
              ensures this never happens to your family.
            </p>
            <Link to="/auth" className="btn-primary mt-8 inline-flex">
              Start Protecting Your Wealth
            </Link>
          </div>
        </div>
      </Section>

      {/* ═════════ TESTIMONIALS ═════════ */}
      <Section className="py-20 md:py-28 bg-navy-950/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-headline text-white">
              Trusted by{" "}
              <span className="text-gradient">Families</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-surface-300 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-surface-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>


      {/* ═════════ FAQ ═════════ */}
      <Section className="py-20 md:py-28 bg-surface-950">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-headline text-white">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Section>

      
    </Layout>
  );
};

export default Hero;
