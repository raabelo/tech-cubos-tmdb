import PageWrapper from "./components/layout/PageWrapper";
import { useTheme } from "./contexts/ThemeContext";
import RouterManager from "./routes/routes";
import i18n from "./utils/translations/i18n";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
    const { getTheme } = useTheme();

    return (
        <>
            <I18nextProvider i18n={i18n}>
                <PageWrapper>
                    <RouterManager />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme={getTheme() || "dark"}
                        style={{ zIndex: 999999999 }}
                    />
                </PageWrapper>
            </I18nextProvider>
        </>
    );
};

export default App;
