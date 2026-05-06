// Accessible Button Component
const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200 focus:ring-4 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-green-700 text-white hover:bg-green-800 focus:ring-green-500", 
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;