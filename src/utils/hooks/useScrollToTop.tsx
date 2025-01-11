import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = (): void => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== window.location.pathname) {
            window.scrollTo(0, 0);
        }
    }, [location]);
};

export default useScrollToTop;
