import React from 'react';
type ButtonProps = {
    children: React.ReactNode;
    color?: string;
};

const Button = ({ children, color }: ButtonProps) => {
    return (
        <button className={`border ${color} px-4 py-2 rounded  transition font-semibold sm:text-lg`}>
            {children}
        </button>
    );
};

export default Button;