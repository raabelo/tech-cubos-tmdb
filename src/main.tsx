import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "core-js/features/array/from";
import "./styles/index.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { GenresProvider } from "./contexts/GenresContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <GenresProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </GenresProvider>
        </BrowserRouter>
    </StrictMode>
);
