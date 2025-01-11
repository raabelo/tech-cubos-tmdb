import React, { ReactNode } from "react";

type InputIconPosition = "right" | "left";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    iconPosition?: InputIconPosition;
}

const Input: React.FC<InputProps> = ({ icon, iconPosition = "right", ...props }) => {
    return (
        <>
            <div
                className={`rounded-sm flex ${
                    iconPosition === "right" ? "flex-row" : "flex-row-reverse"
                } items-center justify-between
                    transition-all dark:bg-dark-mauve2 bg-light-mauve2
                    border border-dark-mauve12/20
                    `}
            >
                <input
                    {...props}
                    className={`bg-transparent size-full p-3 ${props.className || ""}`}
                />
                {icon}
            </div>
        </>
    );
};

export default Input;
