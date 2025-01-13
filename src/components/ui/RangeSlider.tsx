import React, { useState, useRef, useEffect, useCallback } from "react";

interface RangeSliderProps {
    min: number;
    max: number;
    step?: number;
    onChange?: (minValue: number, maxValue: number) => void;
    initialMinValue?: number;
    initialMaxValue?: number;
    unit?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
    min,
    max,
    step = 1,
    onChange,
    initialMinValue = min,
    initialMaxValue = max,
    unit = "",
}) => {
    const [minValue, setMinValue] = useState<number>(initialMinValue);
    const [maxValue, setMaxValue] = useState<number>(initialMaxValue);
    const minValueRef = useRef(minValue);
    const maxValueRef = useRef(maxValue);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback(
        (value: number) => {
            return Math.round(((value - min) / (max - min)) * 100);
        },
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minValue);
        const maxPercent = getPercent(maxValue);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [getPercent, maxValue, minValue]);

    useEffect(() => {
        if (onChange) {
            onChange(minValue, maxValue);
        }
    }, [maxValue, minValue]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue - step);
        setMinValue(value);
        minValueRef.current = value;
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue + step);
        setMaxValue(value);
        maxValueRef.current = value;
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center -mt-2 gap-4">
                <p className="mt-4 dark:text-dark-mauve12 text-light-mauve12">
                    {minValue}
                    {unit}
                </p>
                <div className="relative w-52 h-2 bg-dark-mauve7/50 rounded-md mt-4">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={minValue}
                        onChange={handleMinChange}
                        className="absolute w-full pointer-events-auto z-10 thumb thumb--left"
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="absolute w-full pointer-events-auto z-20 thumb thumb--right"
                    />
                    <div
                        ref={range}
                        className="absolute h-2 bg-dark-purple8 rounded-md"
                        style={{
                            left: `${getPercent(minValue)}%`,
                            width: `${getPercent(maxValue) - getPercent(minValue)}%`,
                        }}
                    />
                </div>
                <p className="mt-4 dark:text-dark-mauve12 text-light-mauve12">
                    {maxValue}
                    {unit}
                </p>
            </div>
        </div>
    );
};

export default RangeSlider;
