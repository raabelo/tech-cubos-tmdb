import { ReactSVG } from "react-svg";
import Button from "../ui/Button";
import IcoSearch from "../../assets/icons/Search.svg";
import IcoFilter from "../../assets/icons/Filter.svg";
import { useState, useCallback, useEffect, Dispatch } from "react";
import tmdb from "../../services/tmdb";
import { TMDBMovies } from "../../types/TMDBMovies";
import FormSectionProps from "../../types/props/FormSectionProps";
import InputForm from "../ui/InputForm";
import Input from "../ui/Input";
import { useGenres } from "../../contexts/GenresContext";
import { TMDBGenres } from "../../types/TMDBGenres";

const SearchBar: React.FC<{
    page: number;
    setMovies: Dispatch<React.SetStateAction<TMDBMovies[]>>;
    setTotalPages: Dispatch<React.SetStateAction<number>>;
}> = ({ page, setMovies, setTotalPages }) => {
    const { genres } = useGenres();

    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [filters, setFilters] = useState<Record<string, string | number | boolean>>({
        sort_by: "popularity",
    });

    const updateFilter = (key: string, value: string | number | boolean) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const fetchMovies = useCallback(async () => {
        try {
            const params = {
                ...filters,
                ...(searchQuery.trim() ? { query: searchQuery.trim() } : {}),
                page: Math.ceil(page / 2),
                with_genres: filters["with_genres"]
                    ? JSON.parse(filters["with_genres" as keyof typeof filters]?.toString()).join(
                          ", "
                      )
                    : undefined,
                sort_by: `${filters["sort_by"]}.${
                    filters["sort_order"] === "true" ? "asc" : "desc"
                }`,
                "primary_release_date.gte": filters["release_date.gte"]
                    ? new Date(filters["release_date.gte"]?.toString())
                    : "",
                "primary_release_date.lte": filters["release_date.lte"]
                    ? new Date(filters["release_date.gte"].toString())
                    : "",
                "vote_average.gte": parseFloat(filters["grade"]?.toString()?.split("-")[0]) || "",
                "vote_average.lte": parseFloat(filters["grade"]?.toString()?.split("-")[1]) || "",
                "with_runtime.gte": parseFloat(filters["runtime"]?.toString()?.split("-")[0]) || "",
                "with_runtime.lte": parseFloat(filters["runtime"]?.toString()?.split("-")[1]) || "",
            };

            const response = searchQuery.trim()
                ? await tmdb.searchMovies(searchQuery, page)
                : await tmdb.discoverMovies(params);

            setMovies(response.results);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }, [filters, page, searchQuery, setMovies, setTotalPages]);

    useEffect(() => {
        fetchMovies();
    }, [filters, searchQuery, fetchMovies]);

    const fields: FormSectionProps[] = [
        {
            title: "Ordenar por",
            fields: [
                {
                    name: "sort_by",
                    label: "Ordenar por",
                    type: "select",
                    options: [
                        { label: "Popularidade", value: "popularity" },
                        { label: "Data de Lançamento", value: "release_date" },
                        { label: "Nota Média", value: "vote_average" },
                    ],
                },
                {
                    name: "sort_order",
                    label: "Ordem",
                    type: "sort",
                },
            ],
        },
        {
            title: "Filtros",
            fields: [
                {
                    name: "with_genres",
                    label: "Gêneros",
                    type: "multiselect",
                    options: genres.map((item: TMDBGenres) => {
                        return { label: item.name, value: item.id?.toString() };
                    }),
                    placeholder: "Select status",
                },
                {
                    name: "release_date.gte",
                    label: "Data de Lançamento (De)",
                    type: "date",
                },
                {
                    name: "release_date.lte",
                    label: "Data de Lançamento (Até)",
                    type: "date",
                },
                {
                    name: "grade",
                    label: "Avaliação",
                    type: "range",
                    range: {
                        min: 0,
                        max: 10,
                        initialMinValue: 0,
                        initialMaxValue: 10,
                    },
                },
                {
                    name: "runtime",
                    label: "Duração",
                    type: "range",
                    range: {
                        min: 0,
                        max: 400,
                        initialMinValue: 0,
                        initialMaxValue: 400,
                        unit: "min",
                    },
                },
                {
                    name: "include_adult",
                    label: "Adulto",
                    type: "radio",
                    options: [
                        { label: "Sim", value: "true" },
                        { label: "Não", value: "false" },
                    ],
                },
            ],
        },
    ];

    return (
        <>
            <div className="flex flex-col p-4 w-full gap-4 mt-6 mx-auto">
                <div className="flex flex-row w-full gap-2.5 md:max-w-[60%] xl:max-w-[40%] mx-auto">
                    <Input
                        placeholder="Pesquise por filmes"
                        icon={
                            <ReactSVG
                                src={IcoSearch}
                                className="w-6 dark:text-dark-mauve12 text-light-mauve12 mx-4 cursor-pointer"
                            />
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="secondary" onClick={() => setIsFiltering((state) => !state)}>
                        <ReactSVG src={IcoFilter} className="w-6" />
                    </Button>
                </div>

                {isFiltering && (
                    <div className="dark:bg-dark-mauve4/50 bg-light-mauve4/50 backdrop-blur-xs p-4 rounded-lg">
                        {fields.map((section, i) => (
                            <div key={section.title} className="mb-4">
                                <div
                                    className={`gap-4 grid  ${
                                        i === 0 ? "grid-cols-2" : "grid-cols-1"
                                    } md:grid-cols-2 lg:grid-cols-3`}
                                >
                                    {section.fields.map((field) => (
                                        <InputForm
                                            key={field.name}
                                            field={field}
                                            handleFieldChange={updateFilter}
                                            initialValue={filters[field.name] as string}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
