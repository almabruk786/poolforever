"use client";

import { MouseEvent, useState } from "react";

type MagnifierProps = {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  magnifierHeight?: number;
  magnifierWidth?: number;
};

export function Magnifier({
  src,
  alt,
  className = "",
  zoomLevel = 2,
  magnifierHeight = 160,
  magnifierWidth = 160
}: MagnifierProps) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setImgSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    
    // Calculate mouse position relative to the element
    const xPos = e.clientX - left;
    const yPos = e.clientY - top;
    
    setXY([xPos, yPos]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", position: "relative" }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto max-h-[68vh] object-contain block select-none pointer-events-none" 
      />

      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            borderRadius: "50%",
            border: "2px solid rgba(19, 200, 242, 0.6)", // Match aqua branding accent
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.3)",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPosition: `${-x * zoomLevel + magnifierWidth / 2}px ${-y * zoomLevel + magnifierHeight / 2}px`
          }}
        />
      )}
    </div>
  );
}
