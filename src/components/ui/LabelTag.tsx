import React, { ReactNode } from "react";

interface LabelTagProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}

const LabelTag: React.FC<LabelTagProps> = ({ children, ...props }) => {
    return (
        <>
            <label
                className={`rounded-sm transition-all bg-dark-purple7/20 hover:bg-dark-purple7/80 ${
                    props.className || ""
                }`}
            >
                {children}
            </label>
        </>
    );
};

export default LabelTag;
