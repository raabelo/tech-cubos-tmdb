import RouterManager from "./routes/routes";
import i18n from "./utils/translations/i18n";
import { I18nextProvider } from "react-i18next";

const App: React.FC = () => {
    return (
        <>
            <I18nextProvider i18n={i18n}>
                <RouterManager />
            </I18nextProvider>
        </>
    );
};

export default App;
