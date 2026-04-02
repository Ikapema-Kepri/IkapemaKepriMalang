import React from 'react';
import Input from './input';

interface SearchFieldProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const SearchField: React.FC<SearchFieldProps> = ({ 
    placeholder = "Cari...", 
    value, 
    onChange,
    className = "",
    size = "md"
}) => {
    const sizeClasses = {
        sm: "h-8 text-sm",
        md: "h-10 text-base",
        lg: "h-12 text-lg"
    };

    return (
        <Input
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${sizeClasses[size]} ${className}`}
        />
    );
};

export default SearchField;
