import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function createBlobPath(
  baseRadius: number,
  cx: number,
  cy: number,
  mouse: { x: number; y: number },
  time: number,
  numPoints = 64
) {
  const step = (Math.PI * 2) / numPoints;
  const dx = mouse.x - cx;
  const dy = mouse.y - cy;
  const mouseAngle = Math.atan2(dy, dx);
  const dist = Math.sqrt(dx * dx + dy * dy);
  let d = '';
  for (let i = 0; i < numPoints; i++) {
    const angle = i * step;
    // Bulge in the direction of the mouse
    let alignment = Math.cos(angle - mouseAngle);
    alignment = Math.max(0, alignment);
    const bulge = alignment * Math.min(10, 6000 / (dist + 60));
    // Optional: add a subtle sine wave for organic movement
    const organic = Math.sin(angle * 3 + time * 1.5) * 6;
    const r = baseRadius + bulge + organic;
    const p = polarToCartesian(cx, cy, r, angle);
    if (i === 0) {
      d = `M${p.x},${p.y}`;
    } else {
      d += ` L${p.x},${p.y}`;
    }
  }
  d += ' Z';
  return d;
}

export default function BlobCenterpiece({className, style}: {className?: string, style?: React.CSSProperties}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const maskPathRef = useRef<SVGPathElement | null>(null);
  const baseRadius = 100;
  const cx = 100;
  const cy = 100;
  const mouse = useRef({ x: cx - 200, y: cy - 200 });
  const numPoints = 100;

  // Mouse tracking (no React state)
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    let t = 0;
    function animate() {
      t += 0.005;
      // Get bounding rect of SVG to convert mouse to SVG coordinates
      const svg = svgRef.current;
      let mx = mouse.current.x, my = mouse.current.y;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        mx = mouse.current.x - rect.left;
        my = mouse.current.y - rect.top;
      }
      const d = createBlobPath(baseRadius, cx, cy, { x: mx, y: my }, t, numPoints);
      if (pathRef.current) pathRef.current.setAttribute('d', d);
      if (maskPathRef.current) maskPathRef.current.setAttribute('d', d);
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', ...style }}
      className={className}
    >
      <defs>
        <mask id="blob-mask">
          {/* Blob path: visible where blob is */}
          <path ref={maskPathRef} fill="white" />
          {/* Green triangle path as part of the mask, but filled white for masking */}
          <path transform="translate(-80,-100) scale(0.4)" d="M134.196 195.011h591.137L134.196 828.893Z" fill="white" paintOrder="fill markers stroke" />
        </mask>
      </defs>
      {/* Blob as background */}
      <path
        ref={pathRef}
        fill="var(--accent-4)"
        opacity="0.4"
        style={{ overflow: 'visible' }}
      />
      {/* Image in foreground, masked by the union of blob and triangle */}
      <image
        href="/assets/images/andres_barrera_laptop.png"
        x="-30"
        y="-15"
        width="250"
        height="250"
        mask="url(#blob-mask)"
        preserveAspectRatio="xMidYMid"
        style={{ overflow: 'visible' }}
      />
    </svg>
  )
}