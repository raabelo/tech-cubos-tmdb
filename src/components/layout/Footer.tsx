import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <>
            <footer
                id="footer"
                className={`w-full bottom-0 flex p-5 font-montserrat
                            border-t border-dark-mauve12/20
                            dark:bg-dark-mauve1/80
                            bg-light-mauve1/80
                `}
            >
                <p className="dark:text-dark-mauve12 text-light-mauve12 text-center w-full">
                    2025 © Todos os direitos reservados a{" "}
                    <span className="font-bold">Cubos Movies</span> • Desenvolvido por{" "}
                    <Link
                        className="font-bold hover:opacity-50 transition-all"
                        to={"https://www.linkedin.com/in/raabelo/"}
                    >
                        Fabiano Rabelo
                    </Link>
                </p>
            </footer>
        </>
    );
};

export default Footer;
