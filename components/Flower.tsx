import React from 'react';
import { FlowerType } from '../types';

interface FlowerProps {
  type: FlowerType;
  color: string;
  onClick?: () => void;
  className?: string;
}

const Flower: React.FC<FlowerProps> = ({ type, color, onClick, className = "" }) => {
  const getFlowerPath = () => {
    switch (type) {
      case FlowerType.ROSE:
        return (
          <g transform="translate(0, -10)">
            {/* Petals */}
            <path d="M12 5 C12 5 4 8 4 14 C4 20 12 24 12 24 C12 24 20 20 20 14 C20 8 12 5 12 5" fill={color} opacity="0.9" />
            <path d="M12 8 C12 8 6 10 6 14 C6 18 12 21 12 21 C12 21 18 18 18 14 C18 10 12 8 12 8" fill="rgba(255,255,255,0.2)" />
            <circle cx="12" cy="14" r="3" fill={color} filter="brightness(1.1)" />
          </g>
        );
      case FlowerType.TULIP:
        return (
          <g transform="translate(0, -10)">
             <path d="M7 18 C 7 18 4 4 12 4 C 20 4 17 18 17 18 L 12 24 L 7 18" fill={color} />
             <path d="M12 4 V 18" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          </g>
        );
      case FlowerType.SUNFLOWER:
        return (
          <g transform="translate(0, -10)">
            <circle cx="12" cy="12" r="5" fill="#3f2e0d" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M12 7 L14 2 L16 7 Z"
                fill={color}
                transform={`rotate(${i * 45} 12 12)`}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={`inner-${i}`}
                d="M12 9 L13 5 L14 9 Z"
                fill="#fbbf24"
                transform={`rotate(${i * 45 + 22.5} 12 12)`}
              />
            ))}
          </g>
        );
      case FlowerType.DAISY:
        return (
          <g transform="translate(0, -10)">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx="12" cy="6" rx="2" ry="6"
                fill="white"
                stroke={color}
                strokeWidth="0.5"
                transform={`rotate(${i * 30} 12 12)`}
              />
            ))}
            <circle cx="12" cy="12" r="4" fill="#fbbf24" />
          </g>
        );
      default: // LILY
        return (
           <g transform="translate(0, -10)">
             <path d="M12 24 C12 24 2 16 2 8 C2 4 6 2 12 8 C18 2 22 4 22 8 C22 16 12 24 12 24" fill={color} />
             <path d="M12 8 L 12 20" stroke="white" strokeWidth="1" />
           </g>
        );
    }
  };

  return (
    <svg 
      viewBox="0 0 24 64" 
      className={`w-16 h-32 overflow-visible cursor-pointer transition-transform hover:scale-110 ${className}`}
      onClick={onClick}
    >
      {/* Stem */}
      <path d="M12 24 Q 12 40 10 60" stroke="#166534" strokeWidth="2" fill="none" />
      {/* Leaf */}
      <path d="M11 45 Q 4 40 4 35 Q 11 40 11 45" fill="#22c55e" />
      {/* Flower Head */}
      {getFlowerPath()}
    </svg>
  );
};

export default Flower;
