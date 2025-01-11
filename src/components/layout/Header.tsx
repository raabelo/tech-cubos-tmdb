import Button from "../ui/Button";
import { ReactSVG } from "react-svg";
import LogoCubos from "../../assets/icons/logo-cubos.svg";
import IcoSun from "../../assets/icons/Sun.svg";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const { toggleTheme } = useTheme();

    return (
        <>
            <header
                id="header"
                className={`w-full flex-wrap top-0 z-50 gap-y-2 h-fit dark:bg-dark-mauve1/50
                     bg-light-mauve1/50 flex flex-row justify-between items-center p-4 border-b border-dark-mauve12/20`}
            >
                <div className="flex flex-row items-center gap-4">
                    <Link to={"/"} className="hover:opacity-50 transition-all">
                        <ReactSVG
                            src={LogoCubos}
                            className="dark:text-dark-mauve12 text-light-mauve12 w-40"
                        />
                    </Link>
                    <h1 className="dark:text-dark-mauve12 text-light-mauve12 font-bold text-xl font-inter">
                        Movies
                    </h1>
                </div>

                <div className="flex flex-row items-center gap-4 mr-0 ml-auto">
                    <Button variant="secondary" onClick={toggleTheme} className="px-6">
                        <ReactSVG src={IcoSun} className="w-6" />
                    </Button>
                </div>
            </header>
        </>
    );
};

export default Header;
