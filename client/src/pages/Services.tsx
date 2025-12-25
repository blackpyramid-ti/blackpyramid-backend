import { useEffect, useRef } from "react";
import { Link, useParams } from "wouter";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Bot,
  Code2,
  Video,
  TrendingUp,
  CheckCircle2,
  Zap,
  Target,
  BarChart3,
  Users,
  Clock,
  Shield,
} from "lucide-react";
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

export default function Services() {
  const { t } = useTranslation();
  const params = useParams();

  const services = [
    {
      id: "automation",
      icon: Bot,
      title: t("services.aiAutomation.title"),
      subtitle: t("services.aiAutomation.subtitle"),
      description: t("services.aiAutomation.description"),
      image: "/images/services-automation.png",
      benefits: [
        {
          icon: Clock,
          title: t("services.aiAutomation.benefit1Title"),
          description: t("services.aiAutomation.benefit1Desc"),
        },
        {
          icon: Zap,
          title: t("services.aiAutomation.benefit2Title"),
          description: t("services.aiAutomation.benefit2Desc"),
        },
        {
          icon: Target,
          title: t("services.aiAutomation.benefit3Title"),
          description: t("services.aiAutomation.benefit3Desc"),
        },
        {
          icon: BarChart3,
          title: t("services.aiAutomation.benefit4Title"),
          description: t("services.aiAutomation.benefit4Desc"),
        },
      ],
      features: [
        t("services.aiAutomation.feature1"),
        t("services.aiAutomation.feature2"),
        t("services.aiAutomation.feature3"),
        t("services.aiAutomation.feature4"),
        t("services.aiAutomation.feature5"),
        t("services.aiAutomation.feature6"),
      ],
      pricing: "$5,000 USD",
    },
    {
      id: "saas",
      icon: Code2,
      title: t("services.microSaas.title"),
      subtitle: t("services.microSaas.subtitle"),
      description: t("services.microSaas.description"),
      image: "/images/services-saas.png",
      benefits: [
        {
          icon: TrendingUp,
          title: t("services.microSaas.benefit1Title"),
          description: t("services.microSaas.benefit1Desc"),
        },
        {
          icon: Users,
          title: t("services.microSaas.benefit2Title"),
          description: t("services.microSaas.benefit2Desc"),
        },
        {
          icon: Shield,
          title: t("services.microSaas.benefit3Title"),
          description: t("services.microSaas.benefit3Desc"),
        },
        {
          icon: Zap,
          title: t("services.microSaas.benefit4Title"),
          description: t("services.microSaas.benefit4Desc"),
        },
      ],
      features: [
        t("services.microSaas.feature1"),
        t("services.microSaas.feature2"),
        t("services.microSaas.feature3"),
        t("services.microSaas.feature4"),
        t("services.microSaas.feature5"),
        t("services.microSaas.feature6"),
      ],
      pricing: "$15,000 USD",
    },
    {
      id: "vsl",
      icon: Video,
      title: t("services.vsl.title"),
      subtitle: t("services.vsl.subtitle"),
      description: t("services.vsl.description"),
      image: "/images/services-marketing.png",
      benefits: [
        {
          icon: Target,
          title: t("services.vsl.benefit1Title"),
          description: t("services.vsl.benefit1Desc"),
        },
        {
          icon: BarChart3,
          title: t("services.vsl.benefit2Title"),
          description: t("services.vsl.benefit2Desc"),
        },
        {
          icon: Users,
          title: t("services.vsl.benefit3Title"),
          description: t("services.vsl.benefit3Desc"),
        },
        {
          icon: Zap,
          title: t("services.vsl.benefit4Title"),
          description: t("services.vsl.benefit4Desc"),
        },
      ],
      features: [
        t("services.vsl.feature1"),
        t("services.vsl.feature2"),
        t("services.vsl.feature3"),
        t("services.vsl.feature4"),
        t("services.vsl.feature5"),
        t("services.vsl.feature6"),
      ],
      pricing: "$8,000 USD",
    },
    {
      id: "agents",
      icon: TrendingUp,
      title: t("services.aiAgents.title"),
      subtitle: t("services.aiAgents.subtitle"),
      description: t("services.aiAgents.description"),
      image: "/images/services-automation.png",
      benefits: [
        {
          icon: Clock,
          title: t("services.aiAgents.benefit1Title"),
          description: t("services.aiAgents.benefit1Desc"),
        },
        {
          icon: Target,
          title: t("services.aiAgents.benefit2Title"),
          description: t("services.aiAgents.benefit2Desc"),
        },
        {
          icon: Users,
          title: t("services.aiAgents.benefit3Title"),
          description: t("services.aiAgents.benefit3Desc"),
        },
        {
          icon: BarChart3,
          title: t("services.aiAgents.benefit4Title"),
          description: t("services.aiAgents.benefit4Desc"),
        },
      ],
      features: [
        t("services.aiAgents.feature1"),
        t("services.aiAgents.feature2"),
        t("services.aiAgents.feature3"),
        t("services.aiAgents.feature4"),
        t("services.aiAgents.feature5"),
        t("services.aiAgents.feature6"),
      ],
      pricing: "$3,000 USD/month",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: t("services.process1Title"),
      description: t("services.process1Desc"),
    },
    {
      step: "02",
      title: t("services.process2Title"),
      description: t("services.process2Desc"),
    },
    {
      step: "03",
      title: t("services.process3Title"),
      description: t("services.process3Desc"),
    },
    {
      step: "04",
      title: t("services.process4Title"),
      description: t("services.process4Desc"),
    },
  ];

  useEffect(() => {
    if (params.slug) {
      const element = document.getElementById(params.slug);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [params.slug]);

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
              {t("services.pageTitle")}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6"
            >
              {t("services.pageHeadline1")}
              <br />
              <span className="gold-text-gradient">{t("services.pageHeadlineHighlight")}</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground leading-relaxed"
            >
              {t("services.pageSubtitle")}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${index % 2 === 0 ? "bg-background" : "bg-card"} border-t border-border/50`}
        >
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <AnimatedSection className={index % 2 === 1 ? "lg:order-2" : ""}>
                <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gold/10 text-gold">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase">
                    {service.id.replace("-", " ")}
                  </span>
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="font-serif text-4xl font-semibold text-foreground mb-4"
                >
                  {service.title}
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="font-serif text-xl text-gold mb-6"
                >
                  {service.subtitle}
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="font-sans text-muted-foreground mb-8 leading-relaxed"
                >
                  {service.description}
                </motion.p>

                {/* Benefits Grid */}
                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-8">
                  {service.benefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                    >
                      <benefit.icon className="h-5 w-5 text-gold mb-2" />
                      <h4 className="font-sans font-semibold text-foreground text-sm mb-1">
                        {benefit.title}
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Features List */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <h4 className="font-sans font-semibold text-foreground mb-4">
                    {t("services.whatsIncluded")}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0" />
                        <span className="font-sans text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Pricing & CTA */}
                <motion.div variants={fadeInUp} className="flex items-center gap-6">
                  <Link href="/contact">
                    <Button className="gold-gradient text-primary-foreground font-sans font-semibold px-8">
                      {t("services.getStarted")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">
                      {t("services.investment")}
                    </p>
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {t("services.startingAt")} {service.pricing}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* Image */}
              <AnimatedSection className={index % 2 === 1 ? "lg:order-1" : ""}>
                <motion.div
                  variants={fadeInUp}
                  className="relative rounded-2xl overflow-hidden"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-24 bg-card border-t border-border/50">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("services.processTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4"
            >
              {t("services.processSubtitle")}
            </motion.h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <AnimatedSection key={item.step}>
                <motion.div variants={fadeInUp} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold font-serif text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6"
            >
              {t("services.ctaTitle1")}
              <br />
              <span className="gold-text-gradient">{t("services.ctaTitleHighlight")}</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground mb-10"
            >
              {t("services.ctaSubtitle")}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gold-gradient text-primary-foreground font-sans font-semibold px-10 py-6 text-lg"
                >
                  {t("services.ctaButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
