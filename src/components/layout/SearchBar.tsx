import { ReactSVG } from "react-svg";
import Input from "../ui/Input";
import Button from "../ui/Button";
import IcoSearch from "../../assets/icons/Search.svg";
import IcoFilter from "../../assets/icons/Filter.svg";

const SearchBar: React.FC<{
    searchQuery: string;
    onSearch: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchQuery, onSearch, onChange }) => {
    return (
        <>
            <div className="flex flex-row p-4 w-full gap-2.5 mt-6 md:max-w-[60%] xl:max-w-[40%] mx-auto">
                <Input
                    label=""
                    placeholder="Pesquise por filmes"
                    icon={
                        <ReactSVG
                            src={IcoSearch}
                            className="w-6 dark:text-dark-mauve12 text-light-mauve12 mx-4"
                        />
                    }
                    value={searchQuery}
                    onChange={onChange}
                />
                <Button variant="secondary" onClick={onSearch}>
                    <ReactSVG src={IcoFilter} className="w-6" />
                </Button>
            </div>
        </>
    );
};

export default SearchBar;
