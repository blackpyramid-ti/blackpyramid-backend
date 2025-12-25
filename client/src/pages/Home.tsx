import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Bot,
  Code2,
  Video,
  TrendingUp,
  CheckCircle2,
  Play,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Animated section component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  // Services data with translations
  const services = [
    {
      icon: Bot,
      title: t("services.aiAutomation.title"),
      description: t("services.aiAutomation.description"),
      image: "/images/services-automation.png",
      href: "/services#automation",
    },
    {
      icon: Code2,
      title: t("services.microSaas.title"),
      description: t("services.microSaas.description"),
      image: "/images/services-saas.png",
      href: "/services#saas",
    },
    {
      icon: Video,
      title: t("services.vsl.title"),
      description: t("services.vsl.description"),
      image: "/images/services-marketing.png",
      href: "/services#vsl",
    },
    {
      icon: TrendingUp,
      title: t("services.aiAgents.title"),
      description: t("services.aiAgents.description"),
      image: "/images/services-automation.png",
      href: "/services#agents",
    },
  ];

  // Stats data with translations
  const stats = [
    { value: "$50M+", label: t("stats.revenue") },
    { value: "500+", label: t("stats.projects") },
    { value: "50+", label: t("stats.countries") },
    { value: "97%", label: t("stats.satisfaction") },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "BlackPyramid transformed our entire sales operation. Their AI automation reduced our response time from hours to seconds, and our conversion rate increased by 340%.",
      author: "Michael Chen",
      role: "CEO, TechScale Inc.",
      rating: 5,
    },
    {
      quote:
        "The VSL they created for our product launch generated $2.3M in the first week. Their understanding of direct response marketing is unmatched.",
      author: "Sarah Williams",
      role: "Founder, HealthFlow",
      rating: 5,
    },
    {
      quote:
        "We hired them to build a Micro-SaaS for our niche. Six months later, it's generating $80K MRR. Best investment we ever made.",
      author: "David Rodriguez",
      role: "Managing Director, Apex Ventures",
      rating: 5,
    },
  ];

  // Blog preview data
  const blogPosts = [
    {
      title: "The Future of AI Automation: 7 Trends Shaping 2025",
      excerpt:
        "Discover how artificial intelligence is revolutionizing business operations and what it means for your company's competitive advantage.",
      date: "Dec 20, 2024",
      readTime: "8 min read",
      category: "AI & Automation",
    },
    {
      title: "Why Your VSL Isn't Converting (And How to Fix It)",
      excerpt:
        "Learn the psychological triggers and structural elements that separate high-converting video sales letters from the rest.",
      date: "Dec 18, 2024",
      readTime: "6 min read",
      category: "Marketing",
    },
    {
      title: "Building a $100K MRR Micro-SaaS: A Complete Playbook",
      excerpt:
        "A step-by-step guide to identifying opportunities, validating ideas, and launching profitable software products.",
      date: "Dec 15, 2024",
      readTime: "12 min read",
      category: "SaaS",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-sans">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6"
            >
              {t("hero.title1")}{" "}
              <span className="gold-text-gradient">{t("hero.titleHighlight")}</span>
              <br />
              {t("hero.title2")}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gold-gradient text-primary-foreground font-sans font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity group"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/50 text-foreground hover:bg-gold/10 font-sans px-8 py-6 text-lg group"
              >
                <Play className="mr-2 h-5 w-5 text-gold" />
                {t("hero.watchReel")}
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 pt-8 border-t border-border/30"
            >
              <p className="text-sm text-muted-foreground mb-6 font-sans">
                {t("hero.trustedBy")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {["Forbes", "TechCrunch", "Bloomberg", "Entrepreneur", "Inc."].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="font-serif text-xl font-semibold text-foreground/50"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("services.sectionTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6"
            >
              {t("services.title1")}
              <br />
              <span className="gold-text-gradient">{t("services.titleHighlight")}</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-muted-foreground max-w-2xl mx-auto"
            >
              {t("services.subtitle")}
            </motion.p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  variants={fadeInUp}
                  className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <service.icon className="h-7 w-7 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                          {service.title}
                        </h3>
                        <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <Link href={service.href}>
                          <span className="inline-flex items-center text-gold font-sans font-medium group-hover:underline cursor-pointer">
                            {t("services.learnMore")}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} className="text-center">
                <motion.div variants={fadeInUp}>
                  <p className="font-serif text-4xl md:text-5xl font-semibold gold-text-gradient mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.span
                variants={fadeInUp}
                className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
              >
                {t("whyUs.sectionTitle")}
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6"
              >
                {t("whyUs.title1")}
                <br />
                <span className="gold-text-gradient">{t("whyUs.titleHighlight")}</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-sans text-muted-foreground mb-8 leading-relaxed"
              >
                {t("whyUs.description")}
              </motion.p>
              <motion.ul variants={fadeInUp} className="space-y-4 mb-8">
                {[
                  t("whyUs.point1"),
                  t("whyUs.point2"),
                  t("whyUs.point3"),
                  t("whyUs.point4"),
                  t("whyUs.point5"),
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-foreground">{point}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="gold-gradient text-primary-foreground font-sans font-semibold px-8 hover:opacity-90 transition-opacity"
                  >
                    {t("whyUs.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection className="relative">
              <motion.div
                variants={fadeInUp}
                className="relative rounded-2xl overflow-hidden border border-border/50"
              >
                <img
                  src="/images/hero-bg.png"
                  alt="BlackPyramid Team"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-card/90 backdrop-blur-lg rounded-xl p-6 border border-gold/20">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                        <span className="font-serif text-2xl font-semibold text-gold">
                          500+
                        </span>
                      </div>
                      <div>
                        <p className="font-serif text-lg font-semibold text-foreground">
                          {t("whyUs.experts")}
                        </p>
                        <p className="font-sans text-sm text-muted-foreground">
                          {t("whyUs.expertsSubtitle")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("testimonials.sectionTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4"
            >
              {t("testimonials.title")}
            </motion.h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.author}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-background border border-border/50 rounded-2xl p-8 h-full flex flex-col"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-gold text-gold"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-sans text-foreground mb-6 flex-1 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="font-serif font-semibold text-gold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="font-sans text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.span
                variants={fadeInUp}
                className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
              >
                {t("blog.sectionTitle")}
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4"
              >
                {t("blog.title")}
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-gold/50 text-foreground hover:bg-gold/10 mt-4 md:mt-0"
                >
                  {t("blog.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.title}>
                <motion.article
                  variants={fadeInUp}
                  className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-sans font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-sans">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground font-sans">
                        {post.date}
                      </span>
                      <span className="text-gold font-sans text-sm font-medium group-hover:underline cursor-pointer">
                        {t("blog.readMore")}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/images/pyramid-icon.png')`,
              backgroundSize: "200px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="container relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6"
            >
              {t("cta.title1")}
              <br />
              <span className="gold-text-gradient">{t("cta.titleHighlight")}</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              {t("cta.subtitle")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gold-gradient text-primary-foreground font-sans font-semibold px-10 py-6 text-lg hover:opacity-90 transition-opacity"
                >
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground font-sans">
                {t("cta.note")}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
