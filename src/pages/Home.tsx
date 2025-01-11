import Input from "../components/ui/Input";
import IcoSearch from "../assets/icons/Search.svg";
import IcoFilter from "../assets/icons/Filter.svg";
import { ReactSVG } from "react-svg";
import Button from "../components/ui/Button";

const Home: React.FC = () => {
    return (
        <>
            <section className="relative size-full h-fit flex justify-center">
                <div className="flex flex-row">
                    <Input
                        placeholder="Pesquise por filmes"
                        icon={
                            <ReactSVG
                                src={IcoSearch}
                                className="dark:text-dark-mauve12 text-light-mauve12 w-6"
                            />
                        }
                    />
                    <Button variant="secondary" onClick={() => {}}>
                        <ReactSVG
                            src={IcoFilter}
                            className="dark:text-dark-mauve12 text-light-mauve12 w-6"
                        />
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Home;
