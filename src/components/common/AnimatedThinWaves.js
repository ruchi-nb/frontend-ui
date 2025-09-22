// common/AnimatedThinWaves.js
import { useEffect, useRef } from "react";

export default function AnimatedThinWaves({ className = "", color = "text-blue-500" }) {
  const wavesRef = useRef([]);

  useEffect(() => {
    let frame;
    const animate = () => {
      wavesRef.current.forEach((path, index) => {
        if (!path) return;
        const offset = (Date.now() / 1000 + index) % 2;
        const amplitude = 10 + index * 2;
        const y = 40 + amplitude * Math.sin((offset * Math.PI * 2));
        path.setAttribute("d", `M0,${y} C300,${y+20} 900,${y-20} 1200,${y}`);
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`relative ${className} w-full h-32`}>
      <svg
        className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            ref={(el) => (wavesRef.current[i] = el)}
            d="M0,40 C300,60 900,20 1200,40"
            stroke="currentColor"
            strokeWidth={1 + i * 0.5}
            fill="none"
            opacity={0.6 - i * 0.1}
            className={color}
          />
        ))}
      </svg>
    </div>
  );
}
