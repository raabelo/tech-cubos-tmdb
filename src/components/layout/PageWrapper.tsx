import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [footerHeight, setFooterHeight] = useState<number>(0);

    useEffect(() => {
        const headerElement = document.getElementById("header");
        if (headerElement) {
            setHeaderHeight(headerElement.offsetHeight);
        }

        const footerElement = document.getElementById("footer");
        if (footerElement) {
            setFooterHeight(footerElement.offsetHeight);
        }
    }, []);

    return (
        <>
            <div className="size-full bg-background-home bg-cover bg-fixed">
                <div
                    className="relative size-full bg-fixed bg-gradient-to-b dark:from-black dark:via-black/50 dark:to-black/80
                    from-white via-white/50 to-white/80 bg-gray-500/10 min-h-svh"
                >
                    <Header />
                    <div
                        className={`size-full`}
                        style={{ paddingTop: headerHeight, paddingBottom: footerHeight }}
                    >
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default PageWrapper;
