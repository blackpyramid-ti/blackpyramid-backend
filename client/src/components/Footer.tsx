import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Linkedin, Twitter, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/blackpyramid", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/blackpyramid", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/blackpyramid", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@blackpyramid", label: "YouTube" },
];

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: t("services.aiAutomation.title"), href: "/services#automation" },
      { label: t("services.microSaas.title"), href: "/services#saas" },
      { label: t("services.vsl.title"), href: "/services#vsl" },
      { label: t("services.aiAgents.title"), href: "/services#agents" },
    ],
    company: [
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.insights"), href: "/blog" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    legal: [
      { label: t("footer.privacy"), href: "/privacy" },
      { label: t("footer.terms"), href: "/terms" },
      { label: t("footer.cookies"), href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border/50">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/pyramid-icon.png"
                  alt="BlackPyramid"
                  className="h-10 w-10"
                />
                <span className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                  Black<span className="text-gold">Pyramid</span>
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-gold text-sm font-sans transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-gold text-sm font-sans transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              {t("nav.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                <a
                  href="mailto:contact@blackpyramid.co"
                  className="text-muted-foreground hover:text-gold text-sm font-sans transition-colors"
                >
                  contact@blackpyramid.co
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm font-sans">
                  United States
                  <br />
                  {t("contact.headquartersValue")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm font-sans">
              {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-muted-foreground hover:text-gold text-sm font-sans transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
