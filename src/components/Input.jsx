import React, { forwardRef, useId } from 'react';

function Input({ label, type = "text", className = "", ...props }, ref) {
    const id = useId();
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <input 
                ref={ref}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`} 
                type={type} 
                id={id} 
                {...props} 
            />
        </div>
    );
}

export default forwardRef(Input);
