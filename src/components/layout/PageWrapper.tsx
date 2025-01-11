import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useEffect(() => {
        const headerElement = document.getElementById("header");
        if (headerElement) {
            setHeaderHeight(headerElement.offsetHeight);
        }
    }, []);

    return (
        <>
            <div className="size-full bg-background-home bg-cover bg-fixed">
                <div
                    className="size-full bg-fixed bg-gradient-to-b dark:from-black dark:via-black/60 dark:to-black/80
                    from-white via-white/60 to-white/80 bg-gray-500/10 min-h-svh "
                >
                    <Header />
                    <div className={`size-full`} style={{ paddingTop: headerHeight }}>
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default PageWrapper;
