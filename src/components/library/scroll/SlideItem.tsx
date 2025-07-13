'use client';

import { motion, useTransform } from 'framer-motion';
import { useScrollProgress } from "../../../context/ScrollContext";
import { useState, useEffect, type ReactNode } from 'react';

type Position = "relative" | "absolute" | "fixed" | "sticky" | "static" | undefined;
type MotionValueHelper<T> = T | any; // Replace 'any' with the actual type if available

export default function SlideItem({
  show,
  duration,
  overrideVisible,
  className,
  children,
  position = 'relative',
}: {
  show: number[];
  duration: number[];
  overrideVisible?: boolean;
  className?: string;
  children?: ReactNode;
  position?: MotionValueHelper<Position>;
}) {
  const { smoothYProgress } = useScrollProgress();
  const [isVisible, setIsVisible] = useState(false);

  const [start, end] = show;
  let [enterDuration, exitDuration] = duration;
  if (start + enterDuration > end || end - exitDuration < start) {
    console.error("Error: Duration exceeds show range");
    enterDuration = 0;
    exitDuration = 0;
  }
  const enter = start + enterDuration;
  const exit = end - exitDuration;

  const opacity = useTransform(smoothYProgress, [start, enter, exit, end], [0, 1, 1, 0]);
  const translateY = useTransform(smoothYProgress, [start, enter, exit, end], [50, 0, 0, -50]);

  useEffect(() => {
    const unsubscribe = opacity.on("change", (latest) => {
      setIsVisible(latest > 0);
    });
    return unsubscribe;
  }, [opacity]);

  return (overrideVisible || isVisible) ? (
    <motion.div
      className={`grow-0 shrink-0 ${className}`}
      style={{
        opacity,
        y: translateY,
        position,
        zIndex: 1,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  ) : null;
}
