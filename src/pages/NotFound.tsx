import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-light-background dark:bg-dark-background
                    dark:text-dark-mauve12 text-light-mauve12"
        >
            <h1 className="text-6xl font-bold mb-4">{t("notFound.title")}</h1>
            <p className="text-xl mb-8">{t("notFound.message")}</p>
            <Link
                to="/"
                className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded"
            >
                <Button>{t("notFound.goHome")}</Button>
            </Link>
        </div>
    );
};

export default NotFound;
