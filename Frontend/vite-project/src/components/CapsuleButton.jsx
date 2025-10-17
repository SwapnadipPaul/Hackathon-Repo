import { useState } from "react";

const CapsuleButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  showPrompt = true,
  promptMessage = "Button clicked!",
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e) => {
    if (disabled || loading) return;

    setIsPressed(true);

    if (showPrompt) {
      // Show a nice prompt
      const prompt = document.createElement("div");
      prompt.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      `;

      prompt.textContent = promptMessage;
      document.body.appendChild(prompt);

      setTimeout(() => {
        prompt.style.animation = "slideOut 0.3s ease-in forwards";
        setTimeout(() => document.body.removeChild(prompt), 300);
      }, 2000);
    }

    // Add animation keyframes if not exists
    if (!document.querySelector("#button-animation-styles")) {
      const style = document.createElement("style");
      style.id = "button-animation-styles";
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => setIsPressed(false), 150);

    if (onClick) onClick(e);
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-500 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl",
    warning:
      "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white focus:ring-yellow-500 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white focus:ring-green-400",
    ghost: "text-green-400 hover:bg-green-400/10 focus:ring-green-400",
  };

  const capsuleClasses = "rounded-full";
  const pressedClasses = isPressed ? "scale-95" : "hover:scale-105";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${capsuleClasses} ${pressedClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default CapsuleButton;
