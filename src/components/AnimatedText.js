import React, { useEffect, useRef } from "react";

const AnimatedText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll(".letter");
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
  }, [text]);

  return (
    <p className="text-xl text-gray-700" ref={containerRef}>
      {text.split("").map((char, index) => (
        <span key={index} className="letter" style={{ fontSize: "inherit" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
};

export default AnimatedText;
