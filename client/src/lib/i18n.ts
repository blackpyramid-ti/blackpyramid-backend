import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translation files
import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";
import ptBR from "../locales/pt-BR.json";
import it from "../locales/it.json";
import nl from "../locales/nl.json";
import sv from "../locales/sv.json";
import pl from "../locales/pl.json";
import ar from "../locales/ar.json";

// Language configuration
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "pt-BR", name: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "sv", name: "Svenska", flag: "🇸🇪", dir: "ltr" },
  { code: "pl", name: "Polski", flag: "🇵🇱", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

// Resources object with all translations
const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  "pt-BR": { translation: ptBR },
  it: { translation: it },
  nl: { translation: nl },
  sv: { translation: sv },
  pl: { translation: pl },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

// Function to change language and update document direction
export const changeLanguage = (langCode: string) => {
  i18n.changeLanguage(langCode);
  const lang = languages.find((l) => l.code === langCode);
  if (lang) {
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = langCode;
  }
};

// Initialize document direction based on current language
const initLang = languages.find((l) => l.code === i18n.language);
if (initLang) {
  document.documentElement.dir = initLang.dir;
  document.documentElement.lang = i18n.language;
}

export default i18n;
