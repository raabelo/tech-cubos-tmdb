import { ReactNode } from "react";

interface MovieDetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    children?: ReactNode;
}

const MovieDetailCard: React.FC<MovieDetailCardProps> = ({ title, children, ...props }) => {
    return (
        <>
            <div
                {...props}
                className={`rounded-md flex-1 p-4 flex flex-col gap-2
                    text-wrap
                    dark:bg-dark-mauve4/70 bg-light-mauve4/70
                    dark:text-dark-mauve12 text-light-mauve12
                     ${props.className || ""}`}
            >
                <p className="opacity-80 font-bold">{title}</p>
                {children}
            </div>
        </>
    );
};

export default MovieDetailCard;
