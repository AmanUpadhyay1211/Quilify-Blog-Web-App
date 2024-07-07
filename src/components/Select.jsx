import React, { useId,forwardRef } from 'react';

function Select({ label, options, className = "", ...props },ref) {
    const id = useId();
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <div>
                <select 
                    id={id} 
                    ref={ref}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`} 
                    {...props}
                >
                    {options.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default forwardRef(Select);
