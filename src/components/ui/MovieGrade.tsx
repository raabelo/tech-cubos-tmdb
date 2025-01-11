import React, { useEffect, useState } from "react";

interface CircularProgressProps {
    percentage: number;
}

const MovieGrade: React.FC<CircularProgressProps> = ({ percentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < percentage) {
                setProgress((prev) => Math.min(prev + 1, percentage));
            } else {
                clearInterval(timer);
            }
        }, 10);

        return () => clearInterval(timer);
    }, [percentage, progress]);

    return (
        <div
            className="relative flex justify-center items-center backdrop-blur-xs dark:bg-dark-mauve4/70 bg-dark-mauve4/40"
            style={{ borderRadius: "50%" }}
        >
            <svg width="100%" height="100%" viewBox="0 0 36 36" className="transform rotate-90">
                <path
                    fill="none"
                    stroke="#e6e6e673"
                    strokeWidth="2"
                    d="M18 2 a16 16 0 1 0 0 32 a16 16 0 1 0 0 -32"
                />
                <path
                    fill="none"
                    stroke="#FFE000"
                    strokeWidth="2"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                    d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
                    style={{
                        transition: "stroke-dasharray 0.2s ease",
                    }}
                />
            </svg>
            <div className="absolute text-[#FFE000] font-semibold text-lg">
                <span className="text-xl">{progress}</span>
                <span className="dark:text-dark-mauve12 text-light-mauve12 text-xs">%</span>
            </div>
        </div>
    );
};

export default MovieGrade;
