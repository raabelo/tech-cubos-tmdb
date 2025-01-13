import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationPTBR from "../translations/lang-pt-BR.json";
import translationENUS from "../translations/lang-en-US.json";

type Lang = "pt-BR" | "en-US";

const resources: { [key in Lang]: { translation: object } } = {
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

export const getCurrentLanguage = (): Lang => i18n.language as Lang;

export default i18n;
