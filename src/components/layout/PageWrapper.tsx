import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="size-full">
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default PageWrapper;
