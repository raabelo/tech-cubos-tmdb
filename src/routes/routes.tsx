import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Movie from "../pages/Movie";
import useScrollToTop from "../utils/hooks/useScrollToTop";

const RouterManager = () => {
    useScrollToTop();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:page" element={<Home />} />
            <Route path="/movies/:id" element={<Movie />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RouterManager;
