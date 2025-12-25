import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";

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

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.emailUs"),
      description: t("contact.emailDescription"),
      value: "contact@blackpyramid.co",
      href: "mailto:contact@blackpyramid.co",
    },
    {
      icon: MapPin,
      title: t("contact.headquarters"),
      description: t("contact.headquartersDescription"),
      value: t("contact.headquartersValue"),
      href: null,
    },
    {
      icon: Clock,
      title: t("contact.businessHours"),
      description: t("contact.businessHoursDescription"),
      value: t("contact.businessHoursValue"),
      href: null,
    },
  ];

  const services = [
    { value: "automation", label: t("services.aiAutomation.title") },
    { value: "saas", label: t("services.microSaas.title") },
    { value: "vsl", label: t("services.vsl.title") },
    { value: "agents", label: t("services.aiAgents.title") },
    { value: "consulting", label: t("contact.serviceConsulting") },
    { value: "other", label: t("contact.serviceOther") },
  ];

  const budgets = [
    { value: "5k-15k", label: "$5,000 - $15,000 USD" },
    { value: "15k-50k", label: "$15,000 - $50,000 USD" },
    { value: "50k-100k", label: "$50,000 - $100,000 USD" },
    { value: "100k+", label: "$100,000+ USD" },
    { value: "not-sure", label: t("contact.budgetNotSure") },
  ];

  const sendContactMutation = trpc.email.sendContactForm.useMutation({
    onSuccess: (data) => {
      setIsSubmitting(false);
      if (data.success) {
        setIsSubmitted(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      console.error("Failed to send contact form:", error);
      toast.error("Failed to send message. Please try again or email us directly at contact@blackpyramid.co");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceLabel = services.find(s => s.value === formData.service)?.label || "General Inquiry";
    const budgetLabel = budgets.find(b => b.value === formData.budget)?.label || "Not specified";
    const subject = `${serviceLabel} - Budget: ${budgetLabel}`;

    sendContactMutation.mutate({
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      subject,
      message: formData.message,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              {t("contact.sectionTitle")}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6"
            >
              {t("contact.title1")}
              <br />
              <span className="gold-text-gradient">{t("contact.titleHighlight")}</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground leading-relaxed"
            >
              {t("contact.subtitle")}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-1">
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-2xl font-semibold text-foreground mb-8"
              >
                {t("contact.getInTouch")}
              </motion.h2>

              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-gold/10 text-gold">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground mb-1">
                        {item.description}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-sans text-gold hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Response Promise */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 p-6 rounded-2xl bg-gold/5 border border-gold/20"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {t("contact.promise")}
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  {t("contact.promiseText")}
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-2">
              <motion.div
                variants={fadeInUp}
                className="bg-background border border-border/50 rounded-2xl p-8 md:p-12"
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="font-sans text-muted-foreground mb-8">
                      {t("contact.successMessage")}
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          service: "",
                          budget: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                      className="border-gold/50 text-foreground hover:bg-gold/10"
                    >
                      {t("contact.sendAnother")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-sans text-sm font-medium text-foreground mb-2">
                          {t("contact.formName")} *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Smith"
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-medium text-foreground mb-2">
                          {t("contact.formEmail")} *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.com"
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-medium text-foreground mb-2">
                        {t("contact.formCompany")}
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t("contact.formCompanyPlaceholder")}
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-sans text-sm font-medium text-foreground mb-2">
                          {t("contact.formService")} *
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, service: value }))
                          }
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder={t("contact.formServicePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-medium text-foreground mb-2">
                          {t("contact.formBudget")}
                        </label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, budget: value }))
                          }
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder={t("contact.formBudgetPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {budgets.map((budget) => (
                              <SelectItem key={budget.value} value={budget.value}>
                                {budget.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-medium text-foreground mb-2">
                        {t("contact.formMessage")} *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={t("contact.formMessagePlaceholder")}
                        className="bg-input border-border resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <p className="font-sans text-sm text-muted-foreground">
                        {t("contact.required")}
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="gold-gradient text-primary-foreground font-sans font-semibold px-8"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            {t("contact.sending")}
                          </>
                        ) : (
                          <>
                            {t("contact.sendMessage")}
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase">
                {t("contact.faqTitle")}
              </span>
              <h2 className="font-serif text-4xl font-semibold text-foreground mt-4">
                {t("contact.faqSubtitle")}
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              {[
                {
                  q: t("contact.faq1Question"),
                  a: t("contact.faq1Answer"),
                },
                {
                  q: t("contact.faq2Question"),
                  a: t("contact.faq2Answer"),
                },
                {
                  q: t("contact.faq3Question"),
                  a: t("contact.faq3Answer"),
                },
                {
                  q: t("contact.faq4Question"),
                  a: t("contact.faq4Answer"),
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border/50"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {faq.q}
                  </h3>
                  <p className="font-sans text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
