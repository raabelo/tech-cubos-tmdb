import React from "react";

type ButtonVariants = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariants;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
    const variantProps: { [key in ButtonVariants]: string } = {
        primary: `dark:bg-dark-purple9 dark:hover:bg-dark-purple8 dark:active:bg-dark-purple7 dark:disabled:text-dark-mauve12 
            bg-light-purple9 hover:bg-light-purple8 active:bg-light-purple7 disabled:text-light-mauve12
            `,
        secondary: `dark:bg-dark-purple2 dark:hover:bg-dark-purple6 dark:active:bg-dark-purple2 dark:disabled:text-dark-mauve12 
            bg-light-purple2 hover:bg-light-purple6 active:bg-light-purple2 disabled:text-light-mauve12
            `,
    };

    return (
        <button
            {...props}
            type={props.type || "button"}
            className={`rounded-md p-4 flex items-center justify-center transition-all ${
                variantProps[variant]
            } ${props.className || ""}`}
        >
            {children}
        </button>
    );
};

export default Button;
