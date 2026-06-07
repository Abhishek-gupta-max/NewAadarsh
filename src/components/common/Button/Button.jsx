import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary: 'bg-[#0047ba] hover:bg-[#152e72] text-white shadow-sm hover:shadow-md active:scale-[0.98]',
    outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 active:scale-[0.98]',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm active:scale-[0.98]',
    ghost: 'hover:bg-slate-100 text-slate-700'
  };

  const sizes = 'px-4 py-2.5 text-sm rounded-lg';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes} ${className} ${disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
