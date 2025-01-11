import Input from "../components/ui/Input";
import IcoSearch from "../assets/icons/Search.svg";
import IcoFilter from "../assets/icons/Filter.svg";
import IcoChevronLeft from "../assets/icons/ChevronLeft.svg";
import IcoChevronRight from "../assets/icons/ChevronRight.svg";
import { ReactSVG } from "react-svg";
import Button from "../components/ui/Button";
import MovieCard from "../components/layout/MovieCard";

const Home: React.FC = () => {
    const movies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            <section className="relative size-full h-fit flex flex-col justify-center">
                <div className="flex flex-row p-4 w-full gap-2.5 mt-6 md:max-w-[60%] xl:max-w-[40%] mx-auto">
                    <Input
                        label=""
                        placeholder="Pesquise por filmes"
                        icon={<ReactSVG src={IcoSearch} className="w-6" />}
                    />
                    <Button variant="secondary" onClick={() => {}}>
                        <ReactSVG src={IcoFilter} className="w-6" />
                    </Button>
                </div>

                <div
                    className="bg-gradient-to-t dark:from-dark-mauve1 dark:via-dark-mauve1/80 dark:to-dark-mauve1/20
                    from-light-mauve1 via-light-mauve1/80 to-light-mauve1/20"
                >
                    <div
                        className="lg:m-6 p-6 rounded-lg dark:bg-dark-mauve11/20 bg-light-mauve11/20 grid
                            gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 4xl:grid-cols-7
                            "
                    >
                        {movies.map((movie) => {
                            return <MovieCard />;
                        })}
                    </div>
                    <div className="flex flex-row justify-center p-4 mb-6 gap-3">
                        <Button onClick={() => {}} className="px-6">
                            <ReactSVG src={IcoChevronLeft} className="w-6" />
                        </Button>
                        <Button onClick={() => {}} className="px-6">
                            <ReactSVG src={IcoChevronRight} className="w-6" />
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
