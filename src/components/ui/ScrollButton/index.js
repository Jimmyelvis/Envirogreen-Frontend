import { useState, useEffect } from 'react';
import useScrollProgress from './hooks/useScrollProgress';

const ScrollButton = () => {
  const scrollProgress = useScrollProgress();
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show button after 20% scroll
  useEffect(() => {
    setIsVisible(scrollProgress > 10);
  }, [scrollProgress]);

  const circumference = 2 * Math.PI * 100; // For r = 150

  return (
    isVisible && (
      <button
        onClick={handleScrollToTop}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '6rem', // Adjust button size for the larger circle
          height: '6rem',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="240" height="240" viewBox="0 0 240 240">
          {/* Outer Background Circle */}
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="#ddd"
            strokeWidth="20"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="#1BC197"
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${
              circumference - (scrollProgress / 100) * circumference
            }`}
            transform="rotate(-90 120 120)"
          />
          {/* Arrow SVG */}
          <g transform="translate(64, 64)">
            {/* Arrow SVG Content */}
            <svg width="120.874" height="120.874" viewBox="0 0 48.874 48.874">
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="1.117"
                  y1="-0.139"
                  x2="0.165"
                  y2="0.847"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#c9fff2" />
                  <stop offset="1" stopColor="#00a279" />
                </linearGradient>
                <filter
                  id="scroll-up"
                  x="0"
                  y="0"
                  width="48.874"
                  height="48.874"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feFlood floodOpacity="0.161" result="color" />
                  <feComposite operator="out" in="SourceGraphic" in2="blur" />
                  <feComposite operator="in" in="color" />
                  <feComposite operator="in" in2="SourceGraphic" />
                </filter>
              </defs>
              <g data-type="innerShadowGroup">
                <path
                  id="scroll-up-2"
                  data-name="scroll-up"
                  d="M37.974,4.58,4.931,18.982a.757.757,0,0,0,.027,1.377l8.938,5.05a1.441,1.441,0,0,0,1.647-.162L33.168,10.053c.117-.1.4-.288.5-.18s-.063.387-.162.5L18.262,27.551a1.436,1.436,0,0,0-.144,1.719l5.842,9.37a.76.76,0,0,0,1.368-.018L38.991,5.579A.758.758,0,0,0,37.974,4.58Z"
                  transform="translate(-6.368 24.438) rotate(-45)"
                  fill="url(#linear-gradient)"
                />
                <g
                  transform="matrix(1, 0, 0, 1, 0, 0)"
                  filter="url(#scroll-up)"
                >
                  <path
                    id="scroll-up-3"
                    data-name="scroll-up"
                    d="M37.974,4.58,4.931,18.982a.757.757,0,0,0,.027,1.377l8.938,5.05a1.441,1.441,0,0,0,1.647-.162L33.168,10.053c.117-.1.4-.288.5-.18s-.063.387-.162.5L18.262,27.551a1.436,1.436,0,0,0-.144,1.719l5.842,9.37a.76.76,0,0,0,1.368-.018L38.991,5.579A.758.758,0,0,0,37.974,4.58Z"
                    transform="translate(-6.37 24.44) rotate(-45)"
                    fill="#fff"
                  />
                </g>
              </g>
            </svg>
          </g>
        </svg>
      </button>
    )
  );
};

export default ScrollButton;
