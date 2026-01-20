import React from 'react';
import { Search } from 'lucide-react';
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
            icon={<Search size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
            className={`${sizeClasses[size]} ${className}`}
        />
    );
};

export default SearchField;
