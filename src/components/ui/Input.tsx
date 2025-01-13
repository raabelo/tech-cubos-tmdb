import React, { ReactNode, useState } from "react";

type InputIconPosition = "right" | "left";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    iconPosition?: InputIconPosition;
    input?: ReactNode;
    isFocused?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    icon,
    iconPosition = "right",
    input,
    isFocused,
    ...props
}) => {
    const [isInputOnFocus, setIsInputOnFocus] = useState<boolean>(false);

    return (
        <>
            {label && <label>{label}</label>}
            <div
                className={`rounded-md flex w-full transition-all
                     dark:text-dark-mauve12 text-light-mauve12
                      ${
                          iconPosition === "right" ? "flex-row" : "flex-row-reverse"
                      } items-center justify-between
                      transition-all dark:bg-dark-mauve2 bg-light-mauve2
                      border border-dark-mauve12/20
                      ${
                          isInputOnFocus || isFocused
                              ? "dark:border-dark-purple9 border-light-purple9"
                              : ""
                      }                    
                `}
            >
                {input ? (
                    input
                ) : (
                    <input
                        {...props}
                        onFocus={() => setIsInputOnFocus(true)}
                        onBlur={() => setIsInputOnFocus(false)}
                        className={`bg-transparent size-full p-3 caret-dark-purple8 ${
                            props.className || ""
                        }`}
                    />
                )}
                {icon}
            </div>
        </>
    );
};

export default Input;
