import React from "react";

interface FormInputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    name?: string;
    error?: string;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    name,
    error,
    className = "",
}) => {
    return (
        <div className={className}>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
                {label}
            </label>

            <input
                type={type}
                name={name}
                required={required}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full px-4 py-3 text-base sm:text-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none ${error
                    ? "border-red-400"
                    : "border-slate-200"
                    }`}
            />

            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;