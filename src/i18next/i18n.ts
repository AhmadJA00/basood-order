import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.ts";
import ku from "./ku.ts";
import ar from "./ar.ts";
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "ar", "he"],
    // debug: true,
    lng: localStorage.getItem("i18nextLng") || "ku",
    fallbackLng: localStorage.getItem("i18nextLng") || "ku",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      he: ku,
      ar,
    },
    detection: {
      // Configure language detection behavior
      caches: ["localStorage"], // Cache language in localStorage
      order: ["navigator", "localStorage"], // Detect language first from navigator, then from localStorage
      lookupQuerystring: "lng", // Allow passing language as a query parameter (optional)
      lookupLocalStorage: "i18nextLng", // Name of localStorage key for detected language
    },
  });
export default i18next;
