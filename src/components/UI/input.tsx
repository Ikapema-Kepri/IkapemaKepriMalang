import React from 'react';
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground opacity-50">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-foreground placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all hover:border-gray-400",
                        icon && "pl-10",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
