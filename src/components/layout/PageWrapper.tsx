import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const SCROLL_THRESHOLD = 60;

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="size-full bg-background-home bg-bottom bg-cover bg-fixed">
                <div
                    className="relative size-full bg-fixed bg-gradient-to-b dark:from-black dark:via-black/50 dark:to-black/80
                    from-white via-white/50 to-white/80 bg-gray-500/10 min-h-svh"
                >
                    <Header />
                    <div className={`size-full min-h-svh`}>{children}</div>
                    <Footer />
                </div>
            </div>
            {scrollPosition > SCROLL_THRESHOLD && (
                <button
                    id="back-to-top"
                    type="button"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="aspect-square w-12 transition-all rounded-full fixed bottom-4 right-4 bg-dark-purple8/80 p-1 text-dark-mauve12 z-50 hover:opacity-50"
                    aria-label={t("pageWrapper.backToTop")}
                >
                    {"↑"}
                </button>
            )}
        </>
    );
};

export default PageWrapper;
