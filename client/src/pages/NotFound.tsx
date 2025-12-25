import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            {/* 404 Number */}
            <div className="mb-8">
              <span className="font-serif text-8xl md:text-9xl font-bold gold-text-gradient">
                404
              </span>
            </div>

            {/* Message */}
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {t("notFound.title")}
            </h1>
            <p className="font-sans text-muted-foreground mb-8 leading-relaxed">
              {t("notFound.message")}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button className="gold-gradient text-primary-foreground font-sans font-semibold px-6">
                  <Home className="mr-2 h-4 w-4" />
                  {t("notFound.backHome")}
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-gold/50 text-foreground hover:bg-gold/10 font-sans"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("notFound.goBack")}
              </Button>
            </div>

            {/* Decorative Element */}
            <div className="mt-16 opacity-20">
              <img
                src="/images/pyramid-icon.png"
                alt=""
                className="w-24 h-24 mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
