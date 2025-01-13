import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <footer
                id="footer"
                className={`w-full bottom-0 flex p-5 font-montserrat
                            border-t border-dark-mauve12/20
                            dark:bg-dark-mauve1/80
                            bg-light-mauve1/80
                `}
            >
                <p className="dark:text-dark-mauve12 text-light-mauve12 text-center w-full">
                    {t("footer.year")}{" "}
                    <span className="font-bold">{t("footer.rightsReserved")}</span> •{" "}
                    {t("footer.developedBy")}{" "}
                    <Link
                        className="font-bold hover:opacity-50 transition-all"
                        to={"https://www.linkedin.com/in/raabelo/"}
                    >
                        Fabiano Rabelo
                    </Link>
                </p>
            </footer>
        </>
    );
};

export default Footer;
