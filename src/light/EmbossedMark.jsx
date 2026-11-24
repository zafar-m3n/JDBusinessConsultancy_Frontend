import { useEffect, useId, useRef } from 'react';
import { useLight } from '@/light/LightProvider';

/**
 * The JD monogram pressed into the paper in black ink, as on the business card.
 * A specular-lighting filter's point light tracks the global light, so a soft sheen moves across it.
 */
const VB = { x: 645, y: 460, w: 305, h: 427 };

export default function EmbossedMark({ className = '' }) {
  const id = useId().replace(/:/g, '');
  const svgRef = useRef(null);
  const lightRef = useRef(null);
  const { subscribe } = useLight();

  useEffect(() => {
    return subscribe((x, y) => {
      const svg = svgRef.current;
      const light = lightRef.current;
      if (!svg || !light) return;
      const r = svg.getBoundingClientRect();
      if (!r.width) return;
      const sx = VB.x + ((x - r.left) / r.width) * VB.w;
      const sy = VB.y + ((y - r.top) / r.height) * VB.h;
      light.setAttribute('x', sx.toFixed(1));
      light.setAttribute('y', sy.toFixed(1));
    });
  }, [subscribe]);

  const stops = ['#2b2b2b', '#121212', '#050505'];

  return (
    <svg
      ref={svgRef}
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      className={className}
      role="img"
      aria-label="JD monogram"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="472" x2="0" y2="875" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.5" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
        <filter id={`${id}-f`} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="9"
            specularConstant="1.25"
            specularExponent="22"
            lightingColor="#ffffff"
            result="spec"
          >
            <fePointLight ref={lightRef} x="700" y="500" z="260" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.32" k4="0" />
        </filter>
      </defs>
      <g filter={`url(#${id}-f)`} fill={`url(#${id}-g)`}>
        <path
          fillRule="evenodd"
          d="M800 472H880Q938 472 938 530V690Q938 748 880 748H800ZM853 520V697H866Q882 697 882 681V536Q882 520 866 520Z"
        />
        <path d="M735 598H790V820Q790 875 735 875H712Q657 875 657 820V743H712V808Q712 824 723.5 824Q735 824 735 808Z" />
      </g>
    </svg>
  );
}
