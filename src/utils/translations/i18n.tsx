import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationPT from "../translations/lang-pt-BR.json";
import translationEN from "../translations/lang-en-US.json";

const resources = {
    pt: {
        translation: translationPT,
    },
    en: {
        translation: translationEN,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "pt",
    interpolation: {
        escapeValue: false,
    },
});

export const getCurrentLanguage = () => i18n.language;

export default i18n;
