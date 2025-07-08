import type { MotionValue } from "framer-motion";

export type AppContextType = {
  theme: "light" | "dark";
  toggleTheme: Function;
}

export type ScrollContextType = {
  scrollYProgress: MotionValue<number>;
  smoothYProgress: MotionValue<number>;
  containerRef: any;
  scrollYValue: number | null;
}