import { useState } from "react"
import { useScrollProgress } from "./ScrollContext";
import { useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollTypewriterText({ children, className, show, duration, onFinish, spaceLatency, onClick }) {
  const { smoothYProgress } = useScrollProgress();
  const [visibleChars, setVisibleChars] = useState(0);

  const [start, end] = show;
  let [enterDuration, exitDuration] = duration;
  if (start + enterDuration > end || end - exitDuration < start) {
    console.error("Error: Duration exceeds show range");
    enterDuration = 0;
    exitDuration = 0;
  }

  const enter = start + enterDuration;
  const exit = end - exitDuration;

  const charShown = useTransform(smoothYProgress, [start, enter, exit, end], [0, children.length, children.length, 0]);

  useMotionValueEvent(charShown, "change", (latest) => {
    const floored = Math.floor(latest);
    setVisibleChars((prev) =>
      prev !== floored ? floored : prev
    );
  });

  return <div className={`${className} overflow-clip`} onClick={onClick && (() => onClick())}>
    {children.substring(0, visibleChars)}
  </div>
}