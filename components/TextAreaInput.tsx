
import React from 'react';

interface TextAreaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ value, onChange, placeholder, disabled }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full h-64 p-4 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none disabled:opacity-50"
  />
);
