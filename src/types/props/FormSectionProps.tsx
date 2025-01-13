import { ChangeEvent } from "react";

interface FormSectionProps {
    title: string;
    fields: InputFieldProps[];
    onChange?: (name: string, value: string) => void;
    initialValues?: { [key: string]: string };
}

export interface Option {
    label: string;
    value: string;
    checked?: boolean;
}

export interface Range {
    min: number;
    max: number;
    step?: number;
    initialMinValue?: number;
    initialMaxValue?: number;
    unit?: string;
}

type InputType = "text" | "radio" | "select" | "date" | "multiselect" | "sort" | "range";

interface Input extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
    name: string;
    label: string;
    type: InputType;
    options?: Option[];
    range?: Range;
    formatContent?: (e: ChangeEvent<HTMLInputElement>) => string;
}

export type InputFieldProps = Input;

export default FormSectionProps;
