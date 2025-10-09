import type { SVGProps } from 'react';

export function BeachNightBg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="none" {...props}>
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3d3d3d', stopOpacity: 1 }} />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
          <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#skyGradient)" />

      <g transform="translate(1760, 120)" />

      <path d="M 0 550 Q 480 530 960 550 T 1920 550 L 1920 850 L 0 850 Z" fill="url(#oceanGradient)" />
      <path d="M 0 570 Q 480 560 960 570 T 1920 570 L 1920 850 L 0 850 Z" fill="#1a1a1a" opacity="0.3" />

      <path
        d="M 0 550 Q 240 540 480 550 T 960 550 T 1440 550 T 1920 550"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M 0 580 Q 300 570 600 580 T 1200 580 T 1920 580"
        stroke="#ffffff"
        strokeWidth="0.5"
        fill="none"
        opacity="0.15"
      />

      <ellipse cx="960" cy="960" rx="1250" ry="250" fill="#1a1a1a" opacity="0.9" />

      <g transform="translate(300, 750)" opacity="0.8">
        <path d="M 0 0 Q -5 80 0 200" stroke="#000000" strokeWidth="8" fill="none" />
        <path d="M 0 0 Q -80 -40 -120 -60" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 0 0 Q -60 -70 -80 -110" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 0 0 Q 0 -80 0 -120" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 0 0 Q 60 -70 80 -110" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 0 0 Q 80 -40 120 -60" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      <g opacity="0.5">
        <polygon points="1200,500 1200,570 1190,570" fill="#FFFFFF" />
        <line x1="1190" y1="570" x2="1210" y2="570" stroke="#8B4513" strokeWidth="2" />
      </g>

      <circle cx="800" cy="150" r="2" fill="#ffffff" opacity="0.8" />
      <circle cx="1200" cy="200" r="1.5" fill="#ffffff" opacity="0.7" />
      <circle cx="1500" cy="120" r="2" fill="#ffffff" opacity="0.9" />
      <circle cx="200" cy="100" r="1" fill="#ffffff" opacity="0.6" />
      <circle cx="1700" cy="300" r="1.5" fill="#ffffff" opacity="0.8" />
      <circle cx="600" cy="180" r="1" fill="#ffffff" opacity="0.7" />
      <circle cx="1400" cy="250" r="2" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
