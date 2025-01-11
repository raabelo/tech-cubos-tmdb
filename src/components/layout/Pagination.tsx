import { useCallback } from "react";
import Button from "../ui/Button";
import { ReactSVG } from "react-svg";
import IcoChevronLeft from "../../assets/icons/ChevronLeft.svg";
import IcoChevronRight from "../../assets/icons/ChevronRight.svg";

const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    const maxPages = 500;
    const totalPagesLimited = Math.min(totalPages, maxPages);

    const generatePageNumbers = useCallback(() => {
        const pageNumbers = [];
        const visiblePageCount = window.innerWidth < 480 ? 3 : 5;
        const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
        const endPage = Math.min(totalPagesLimited, currentPage + Math.floor(visiblePageCount / 2));

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        while (pageNumbers.length < visiblePageCount && pageNumbers[0] > 1) {
            pageNumbers.unshift(pageNumbers[0] - 1);
        }

        while (
            pageNumbers.length < visiblePageCount &&
            pageNumbers[pageNumbers.length - 1] < totalPagesLimited
        ) {
            pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1);
        }

        return pageNumbers;
    }, [currentPage, totalPagesLimited]);

    return (
        <>
            <div className="p-4 mb-6 w-fit mx-auto">
                <div className="flex flex-row md:flex-row justify-center items-center gap-3 h-fit">
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-4 md:px-6 h-12"
                        disabled={currentPage <= 1}
                    >
                        <ReactSVG src={IcoChevronLeft} className="w-4 md:w-6" />
                    </Button>

                    <div className="flex flex-row gap-3">
                        {generatePageNumbers().map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                onClick={() => onPageChange(pageNumber)}
                                className="w-12 h-12 flex items-center justify-center text-sm sm:text-sm md:text-base"
                                disabled={pageNumber === currentPage}
                            >
                                {pageNumber}
                            </Button>
                        ))}
                    </div>

                    <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-4 md:px-6 h-12"
                        disabled={currentPage >= totalPagesLimited}
                    >
                        <ReactSVG src={IcoChevronRight} className="w-4 md:w-6" />
                    </Button>
                </div>

                <div className="flex flex-wrap flex-row justify-between gap-2 mt-4 mx-[10%]">
                    <button
                        type="button"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage <= 1}
                        className="dark:text-dark-mauve12 text-light-mauve12 text-sm hover:opacity-50 flex flex-row-reverse 
                        disabled:dark:text-dark-mauve12/50 disabled:text-light-mauve12/50"
                    >
                        <p className="">Primeira página</p>
                        <ReactSVG src={IcoChevronLeft} className="w-4" />
                        <ReactSVG src={IcoChevronLeft} className="w-4 -mr-3" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onPageChange(totalPagesLimited)}
                        disabled={currentPage >= totalPagesLimited}
                        className="dark:text-dark-mauve12 text-light-mauve12 text-sm hover:opacity-50 flex flex-row 
                        disabled:dark:text-dark-mauve12/50 disabled:text-light-mauve12/50"
                    >
                        <p className="">Última página</p>
                        <ReactSVG src={IcoChevronRight} className="w-4" />
                        <ReactSVG src={IcoChevronRight} className="w-4 -ml-3" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Pagination;
