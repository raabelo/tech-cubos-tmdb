import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const RouterManager = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/movies/:id" element={<></>} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RouterManager;
