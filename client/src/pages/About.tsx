import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Globe, Award, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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

export default function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Target,
      title: t("about.value1Title"),
      description: t("about.value1Desc"),
    },
    {
      icon: Award,
      title: t("about.value2Title"),
      description: t("about.value2Desc"),
    },
    {
      icon: Users,
      title: t("about.value3Title"),
      description: t("about.value3Desc"),
    },
    {
      icon: Globe,
      title: t("about.value4Title"),
      description: t("about.value4Desc"),
    },
  ];

  const milestones = [
    { year: "2018", event: t("about.milestone2018") },
    { year: "2019", event: t("about.milestone2019") },
    { year: "2020", event: t("about.milestone2020") },
    { year: "2021", event: t("about.milestone2021") },
    { year: "2022", event: t("about.milestone2022") },
    { year: "2023", event: t("about.milestone2023") },
    { year: "2024", event: t("about.milestone2024") },
  ];

  const globalStats = [
    { label: t("stats.countries"), value: "50+" },
    { label: t("about.teamMembers"), value: "500+" },
    { label: t("stats.projects"), value: "500+" },
    { label: t("stats.satisfaction"), value: "97%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("about.sectionTitle")}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6"
            >
              {t("about.title1")}
              <br />
              <span className="gold-text-gradient">{t("about.titleHighlight")}</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground leading-relaxed"
            >
              {t("about.subtitle")}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.span
                variants={fadeInUp}
                className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
              >
                {t("about.storyTitle")}
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-4xl font-semibold text-foreground mt-4 mb-6"
              >
                {t("about.storyHeadline")}
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-4 font-sans text-muted-foreground leading-relaxed">
                <p>{t("about.storyParagraph1")}</p>
                <p>{t("about.storyParagraph2")}</p>
                <p>{t("about.storyParagraph3")}</p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={fadeInUp} className="relative">
                <img
                  src="/images/services-saas.png"
                  alt="BlackPyramid Team"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-2xl" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("about.valuesTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4"
            >
              {t("about.valuesHeadline")}
            </motion.h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <AnimatedSection key={value.title}>
                <motion.div
                  variants={fadeInUp}
                  className="p-8 rounded-2xl bg-card border border-border/50 h-full"
                >
                  <div className="p-3 rounded-xl bg-gold/10 text-gold w-fit mb-6">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("about.journeyTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4"
            >
              {t("about.milestonesTitle")}
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={fadeInUp}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    } pl-12 md:pl-0`}
                  >
                    <span className="font-serif text-2xl font-bold gold-text-gradient">
                      {milestone.year}
                    </span>
                    <p className="font-sans text-muted-foreground mt-2">
                      {milestone.event}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gold -translate-x-1/2 ring-4 ring-background" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("about.globalTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6"
            >
              {t("about.globalHeadline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              {t("about.globalSubtitle")}
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {globalStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-4xl font-bold gold-text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border/50">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6"
            >
              {t("about.ctaTitle1")}
              <span className="gold-text-gradient"> {t("about.ctaTitleHighlight")}</span> {t("about.ctaTitle2")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground mb-10"
            >
              {t("about.ctaSubtitle")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gold-gradient text-primary-foreground font-sans font-semibold px-8"
                >
                  {t("about.ctaButton1")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/50 text-foreground hover:bg-gold/10 font-sans px-8"
              >
                {t("about.ctaButton2")}
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
