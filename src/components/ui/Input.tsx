import React, { ReactNode, useState } from "react";

type InputIconPosition = "right" | "left";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    iconPosition?: InputIconPosition;
}

const Input: React.FC<InputProps> = ({ label, icon, iconPosition = "right", ...props }) => {
    const [isInputOnFocus, setIsInputOnFocus] = useState<boolean>(false);
    return (
        <>
            <div
                className={`rounded-md flex w-full transition-all ${
                    iconPosition === "right" ? "flex-row" : "flex-row-reverse"
                } items-center justify-between
                    transition-all dark:bg-dark-mauve2 bg-light-mauve2
                    border border-dark-mauve12/20
                    ${
                        isInputOnFocus ? "dark:border-dark-purple9 border-light-purple9" : ""
                    }                    
                    `}
            >
                {label && <label>{label}</label>}
                <input
                    {...props}
                    onFocus={() => setIsInputOnFocus(true)}
                    onBlur={() => setIsInputOnFocus(false)}
                    className={`bg-transparent size-full p-3 ${props.className || ""}`}
                />
                {icon}
            </div>
        </>
    );
};

export default Input;
