import tools from '../data/tools.tsx';
import React, { useEffect, useRef, useState } from 'react';
import useScreen from '../hooks/useScreen.tsx';

const TOOLS = [
  tools["TypeScript"],
  tools["Python"],
  tools["AWS"],
  tools["React"],
  tools["Express"],
  tools["Next.js"],
  tools["Docker"],
  tools["Adobe Photoshop"],
  tools["Prometheus"],
  tools["Grafana"],
  tools["MySQL"],
  tools["Wordpress"],
  tools["Webflow"],
];

export default function ToolCarousel() {
  const {screenWidth} = useScreen();

  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [queueTransition, setQueueTransition] = useState(false);
  const [itemWidth, setItemWidth] = useState(screenWidth >= 768 ? 125 : 70);
  const intervalRef = useRef<number | null>(null);
  const totalItems = TOOLS.length;
  const totalWidth = itemWidth * totalItems;

  useEffect(() => {
    setItemWidth(screenWidth >= 768 ? 125 : 70);
  }, [screenWidth]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setOffset((prev) => {
        if (prev + itemWidth >= totalWidth) {
          setQueueTransition(true);
        }
        setIsTransitioning(true);
        return prev + itemWidth;
      });
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalWidth, itemWidth]);

  useEffect(() => {
    if (queueTransition) {
      const id = setTimeout(() => {
        setIsTransitioning(false);
        setQueueTransition(false);
        setOffset(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [queueTransition]);

  return (
    <div className="relative w-full h-[35px] md:h-[50px] overflow-clip flex flex-row gap-[50px]">
      <div 
        className="absolute w-full h-[35px] md:h-[50px] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--theme-e) 0%, rgba(var(--theme-e-rgb), 0) 20%, rgba(var(--theme-e-rgb), 0) 80%, var(--theme-e) 100%)'
        }}
      />
      <div 
        className="w-0 h-fit flex flex-row gap-[35px] md:gap-[75px] overflow-visible"
        style={{
          transform: `translateX(-${offset}px)` ,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {[...TOOLS, ...TOOLS].map((tool, index) => (
          <div key={index} className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]">
            <div className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]" style={{fill: 'var(--theme-8)',}}>
              {React.cloneElement(tool.icon, { className: "w-[35px] h-[35px] md:w-[50px] md:h-[50px] fill-[var(--theme-8)" })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}