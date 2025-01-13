import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationPTBR from "../translations/lang-pt-BR.json";
import translationENUS from "../translations/lang-en-US.json";

const resources = {
    "pt-BR": {
        translation: translationPTBR,
    },
    "en-US": {
        translation: translationENUS,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "pt-BR",
    interpolation: {
        escapeValue: false,
    },
});

export const getCurrentLanguage = () => i18n.language;

export default i18n;
