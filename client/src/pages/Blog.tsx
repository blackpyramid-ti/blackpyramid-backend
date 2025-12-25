import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Clock, User } from "lucide-react";
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

export default function Blog() {
  const { t } = useTranslation();

  const featuredPost = {
    title: "The Future of AI Automation: 7 Trends Shaping 2025",
    excerpt:
      "Artificial Intelligence is no longer a futuristic concept—it's the present reality transforming how businesses operate. From intelligent process automation to predictive analytics, discover the seven key trends that will define the AI landscape in 2025 and beyond.",
    author: "BlackPyramid Research Team",
    date: "December 20, 2024",
    readTime: "8 min read",
    category: "AI & Automation",
    image: "/images/services-automation.png",
  };

  const blogPosts = [
    {
      title: "Why Your VSL Isn't Converting (And How to Fix It)",
      excerpt:
        "Learn the psychological triggers and structural elements that separate high-converting video sales letters from the rest. We break down the Clayton Makepeace approach.",
      author: "Marketing Team",
      date: "December 18, 2024",
      readTime: "6 min read",
      category: "Marketing",
      image: "/images/services-marketing.png",
    },
    {
      title: "Building a $100K MRR Micro-SaaS: A Complete Playbook",
      excerpt:
        "A step-by-step guide to identifying opportunities, validating ideas, and launching profitable software products that generate recurring revenue.",
      author: "Product Team",
      date: "December 15, 2024",
      readTime: "12 min read",
      category: "SaaS",
      image: "/images/services-saas.png",
    },
    {
      title: "N8N vs Zapier: Which Automation Platform is Right for You?",
      excerpt:
        "A comprehensive comparison of the two leading automation platforms, including use cases, pricing, and our recommendations for different business sizes.",
      author: "Tech Team",
      date: "December 12, 2024",
      readTime: "10 min read",
      category: "AI & Automation",
      image: "/images/services-automation.png",
    },
    {
      title: "The Psychology of High-Ticket Sales: Closing $10K+ Deals",
      excerpt:
        "Understanding the mindset and techniques required to consistently close high-value deals. Insights from our top-performing sales strategies.",
      author: "Sales Team",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Sales",
      image: "/images/services-marketing.png",
    },
    {
      title: "AI Sales Agents: The Complete Implementation Guide",
      excerpt:
        "Everything you need to know about deploying AI-powered sales representatives, from initial setup to optimization and scaling.",
      author: "AI Team",
      date: "December 8, 2024",
      readTime: "15 min read",
      category: "AI & Automation",
      image: "/images/services-automation.png",
    },
    {
      title: "Direct Response Marketing in 2025: What's Changed",
      excerpt:
        "The fundamentals remain the same, but the tactics have evolved. Here's how to adapt your direct response strategy for the modern digital landscape.",
      author: "Marketing Team",
      date: "December 5, 2024",
      readTime: "9 min read",
      category: "Marketing",
      image: "/images/services-marketing.png",
    },
  ];

  const categories = [
    t("blog.categoryAll"),
    "AI & Automation",
    "Marketing",
    "SaaS",
    "Sales",
    "Strategy",
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
              {t("blog.sectionTitle")}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl font-semibold text-foreground mt-4 mb-6"
            >
              {t("blog.title1")}
              <br />
              <span className="gold-text-gradient">{t("blog.titleHighlight")}</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-muted-foreground leading-relaxed"
            >
              {t("blog.subtitle")}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card border-y border-border/50">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full font-sans text-sm transition-colors ${
                  index === 0
                    ? "bg-gold text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-gold/10 hover:text-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container">
          <AnimatedSection>
            <motion.article
              variants={fadeInUp}
              className="group grid lg:grid-cols-2 gap-8 items-center bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300"
            >
              <div className="relative h-64 lg:h-full overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/80 to-transparent lg:hidden" />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-sans font-medium">
                    {t("blog.featured")}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-sans">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-4 group-hover:text-gold transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Button className="gold-gradient text-primary-foreground font-sans font-semibold">
                  {t("blog.readArticle")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.article>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-card border-t border-border/50">
        <div className="container">
          <AnimatedSection className="mb-12">
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl font-semibold text-foreground"
            >
              {t("blog.latestArticles")}
            </motion.h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <AnimatedSection key={post.title}>
                <motion.article
                  variants={fadeInUp}
                  className="group bg-background border border-border/50 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/90 text-primary-foreground text-xs font-sans font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-gold font-sans text-sm font-medium group-hover:underline cursor-pointer">
                        {t("blog.readMore")}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>

          {/* Load More */}
          <AnimatedSection className="text-center mt-12">
            <motion.div variants={fadeInUp}>
              <Button
                variant="outline"
                size="lg"
                className="border-gold/50 text-foreground hover:bg-gold/10 font-sans"
              >
                {t("blog.loadMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="container">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <motion.span
              variants={fadeInUp}
              className="text-gold font-sans text-sm font-semibold tracking-widest uppercase"
            >
              {t("blog.newsletterTitle")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl font-semibold text-foreground mt-4 mb-4"
            >
              {t("blog.newsletterHeadline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-muted-foreground mb-8"
            >
              {t("blog.newsletterSubtitle")}
            </motion.p>
            <motion.form
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t("blog.emailPlaceholder")}
                className="flex-1 px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <Button className="gold-gradient text-primary-foreground font-sans font-semibold px-6">
                {t("blog.subscribe")}
              </Button>
            </motion.form>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-xs text-muted-foreground mt-4"
            >
              {t("blog.noSpam")}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
