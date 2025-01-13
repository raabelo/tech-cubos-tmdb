import { useEffect, useState } from "react";
import { InputFieldProps } from "../../types/props/FormSectionProps";
import Input from "./Input";
import RangeSlider from "./RangeSlider";
import { useTranslation } from "react-i18next";

const InputForm: React.FC<{
    field: InputFieldProps;
    handleFieldChange?: (name: string, value: string) => void;
    initialValue?: string;
}> = ({ field, handleFieldChange, initialValue = "" }) => {
    const [value, setValue] = useState<string>(initialValue);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isInputOnFocus, setIsInputOnFocus] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleCheckboxChange = (optionValue: string) => {
        const parsedValue = value ? JSON.parse(value) : [];
        const newValue = parsedValue.includes(optionValue)
            ? parsedValue.filter((item: string) => item !== optionValue)
            : [...parsedValue, optionValue];
        if (handleFieldChange) {
            handleFieldChange(field.name, JSON.stringify(newValue));
        }
    };

    const handleRangeChange = (minValue: number, maxValue: number) => {
        if (handleFieldChange) {
            handleFieldChange(field.name, `${minValue}-${maxValue}`);
        }
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const getComponent = (field: InputFieldProps) => {
        switch (field.type) {
            case "radio":
                return (
                    <div className="flex flex-col md:flex-row gap-2 mt-4 dark:text-dark-mauve12 text-light-mauve12">
                        {field.options?.map((option) => (
                            <div key={option.value} className="">
                                <input
                                    key={option.label}
                                    className="ml-4 mr-2"
                                    onChange={(e) => {
                                        if (field.onChange) field.onChange(e);
                                        if (handleFieldChange)
                                            handleFieldChange(field.name, option.value);
                                    }}
                                    onFocus={() => setIsInputOnFocus(true)}
                                    onBlur={() => setIsInputOnFocus(false)}
                                    {...field}
                                />
                                <label>{option.label}</label>
                            </div>
                        ))}
                    </div>
                );

            case "select":
                return (
                    <select
                        value={value}
                        name={field.name}
                        className={`p-2 w-full px-4 mr-2 bg-transparent dark:text-dark-mauve12 text-light-mauve12`}
                        onChange={(e) => {
                            if (handleFieldChange) handleFieldChange(field.name, e.target.value);
                        }}
                        onFocus={() => setIsInputOnFocus(true)}
                        onBlur={() => setIsInputOnFocus(false)}
                    >
                        <option value={""} className="text-dark-mauve1">
                            {t("select_option")}
                        </option>
                        {field.options?.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="text-dark-mauve1 "
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "multiselect":
                return (
                    <div className="relative size-full flex flex-row items-center pr-4">
                        <input
                            type="text"
                            readOnly
                            value={
                                field.options && value
                                    ? field.options
                                          .filter((item) => JSON.parse(value).includes(item.value))
                                          .map((item) => item.label)
                                          .join(", ")
                                    : ""
                            }
                            placeholder={t("select_options")}
                            className="w-full p-2  px-4 bg-transparent cursor-pointer dark:text-dark-mauve12 text-light-mauve12"
                            onClick={() => setShowDropdown(!showDropdown)}
                            onFocus={() => setIsInputOnFocus(true)}
                            onBlur={() => setIsInputOnFocus(false)}
                        />
                        <p
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="-rotate-90 text-2xl cursor-pointer"
                        >
                            ‹
                        </p>

                        {showDropdown && (
                            <div
                                className="absolute top-8 left-0 w-full mt-2 bg-light-mauve1 shadow-lg rounded-md border z-50
                                            text-dark-mauve1"
                            >
                                <div className="max-h-60 overflow-y-auto p-2 ">
                                    {field.options?.map((option) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={option.value}
                                                value={option.value}
                                                checked={
                                                    value &&
                                                    JSON.parse(value).includes(option.value)
                                                }
                                                onChange={() => handleCheckboxChange(option.value)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={option.value} className="text-sm ">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case "range":
                return (
                    <div className="flex flex-col w-full">
                        <RangeSlider
                            min={field.range?.min || 0}
                            max={field.range?.max || 100}
                            step={field.range?.step || 1}
                            initialMinValue={field.range?.initialMinValue || field.range?.min || 0}
                            initialMaxValue={
                                field.range?.initialMaxValue || field.range?.max || 100
                            }
                            onChange={handleRangeChange}
                            unit={field.range?.unit}
                        />
                    </div>
                );

            case "date":
                return (
                    <div className="flex flex-row size-full">
                        <input
                            value={value ? new Date(value).toISOString().split("T")[0] : ""}
                            onChange={(e) => {
                                const formattedDate = e.target.value;
                                if (handleFieldChange) {
                                    handleFieldChange(field.name, formattedDate);
                                }
                            }}
                            className="p-2 w-full self-start px-4 dark:[color-scheme:dark]
                            bg-transparent dark:text-dark-mauve12 text-light-mauve12"
                            onFocus={() => setIsInputOnFocus(true)}
                            onBlur={() => setIsInputOnFocus(false)}
                            {...field}
                            type="date"
                        />
                        {field.content}
                    </div>
                );

            case "sort":
                return (
                    <div className="flex items-center size-fit mt-5 -ml-2">
                        <input
                            id={field.name}
                            checked={value === "true"}
                            onChange={(e) => {
                                if (handleFieldChange) {
                                    handleFieldChange(
                                        field.name,
                                        e.target.checked ? "true" : "false"
                                    );
                                }
                            }}
                            className="hidden"
                            {...field}
                            type="checkbox"
                        />
                        <div
                            onClick={() => {
                                if (handleFieldChange) {
                                    handleFieldChange(
                                        field.name,
                                        value === "true" ? "false" : "true"
                                    );
                                }
                            }}
                            className="cursor-pointer flex items-center justify-center p-2 w-8 h-8 
                                bg-transparent rounded focus:ring-2 focus:ring-offset-2 
                                focus:ring-light-purple9 dark:focus:ring-dark-purple9"
                        >
                            <span
                                className={`text-3xl material-icons transition-all
                                    text-light-mauve12 dark:text-dark-mauve12 
                                    ${value === "true" ? "rotate-180" : ""}`}
                            >
                                ↓
                            </span>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex flex-row">
                        <input
                            value={value}
                            onChange={(e) => {
                                if (handleFieldChange)
                                    handleFieldChange(field.name, e.target.value);
                            }}
                            className="border p-2 w-full self-start rounded-full px-4"
                            onFocus={() => setIsInputOnFocus(true)}
                            onBlur={() => setIsInputOnFocus(false)}
                            {...field}
                        />
                        {field.content}
                    </div>
                );
        }
    };

    return (
        <div key={field.name} className="size-full">
            {!["sort"].includes(field.type) && (
                <label className="block font-semibold mb-1 pl-2 dark:text-dark-mauve12 text-light-mauve12">
                    {field.label}
                </label>
            )}
            {["radio", "sort", "range"].includes(field.type) ? (
                getComponent(field)
            ) : (
                <Input isFocused={isInputOnFocus} input={getComponent(field)} />
            )}
        </div>
    );
};

export default InputForm;
