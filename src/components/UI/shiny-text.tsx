import React, { useEffect } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  useEffect(() => {
    // Inject keyframes into document head
    const styleId = 'shine-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const shineAnimation = {
    backgroundImage:
      "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(153, 235, 255, 1) 50%, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 1) 100%)",
    backgroundSize: "200% 100%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    animation: disabled ? "none" : `shine ${speed}s linear infinite`,
  } as React.CSSProperties;

  return (
    <div
      className={`inline-block ${className}`}
      style={shineAnimation}
    >
      {text}
    </div>
  );
};

export default ShinyText;
