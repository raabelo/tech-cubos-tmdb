import Button from "../ui/Button";
import { ReactSVG } from "react-svg";
import LogoCubos from "../../assets/icons/logo-cubos.svg";
import IcoSun from "../../assets/icons/Sun.svg";
import IcoMoon from "../../assets/icons/Moon.svg";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n, { getCurrentLanguage } from "../../utils/translations/i18n";
import FlagBR from "../../assets/imgs/brazil.webp";
import FlagEUA from "../../assets/imgs/eua.png";

const Header: React.FC = () => {
    const { getTheme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const handleChangeLang = () => {
        const lang = getCurrentLanguage() === "pt-BR" ? "en-US" : "pt-BR";
        i18n.changeLanguage(lang);
    };

    return (
        <>
            <header
                id="header"
                className={`w-full flex-wrap gap-y-2 h-fit dark:bg-dark-mauve1/50
                     bg-light-mauve1/50 flex flex-row justify-between items-center p-4 border-b border-dark-mauve12/20`}
            >
                <div className="flex flex-row items-center gap-4">
                    <Link to={"/"} className="hover:opacity-50 transition-all">
                        <ReactSVG
                            src={LogoCubos}
                            className="dark:text-dark-mauve12 text-light-mauve12 w-40"
                        />
                    </Link>
                    <h1 className="dark:text-dark-mauve12 text-light-mauve12 font-bold lg:text-xl font-inter">
                        {t("header.title")}
                    </h1>
                </div>

                <div className="flex flex-row items-center gap-2 lg:gap-4 mr-0 ml-auto">
                    <Button variant="secondary" onClick={handleChangeLang} className="lg:px-6">
                        <img
                            src={getCurrentLanguage() === "pt-BR" ? FlagBR : FlagEUA}
                            className="size-6 rounded-full overflow-hidden object-cover"
                        />
                    </Button>
                    <Button variant="secondary" onClick={toggleTheme} className="lg:px-6">
                        <ReactSVG src={getTheme() === "dark" ? IcoSun : IcoMoon} className="w-6" />
                    </Button>
                </div>
            </header>
        </>
    );
};

export default Header;
