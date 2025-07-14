import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll, useSpring, useMotionValueEvent, useMotionValue } from "framer-motion";
import type { ScrollContextType } from "./types";

const ScrollContext = createContext<ScrollContextType>({} as ScrollContextType);

export function ScrollProvider({ children }: { children: ReactNode | null }) {
  const containerRef = useRef(null);
  const motionValue0 = useMotionValue(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('container Ref change', containerRef.current);
    if (containerRef.current) setIsReady(true);
  }, [containerRef.current]);

  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
    });

  const [scrollYValue, setScrollYValue] = useState<number | null>(0);

  useEffect(() => {
    console.log('sv', scrollYValue, 'sp', scrollYProgress.get(), 'sv', smoothYProgress.get())
  }, [scrollYValue, scrollYProgress]);

  const smoothYProgress = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 20,
      mass: 0.5,
    });

  useMotionValueEvent(smoothYProgress, "change", (latest: number) => {
    setScrollYValue(latest);
  });

  return (
    <ScrollContext.Provider value={{ scrollYProgress, smoothYProgress, containerRef, scrollYValue }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollProgress must be used within a ScrollProvider");
  }
  return context;
}

