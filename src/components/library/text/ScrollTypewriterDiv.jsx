import { useState } from "react"
import { useScrollProgress } from "./ScrollContext";
import { useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollTypewriterDiv({ content, className, show, duration, onClick }) {
  const { smoothYProgress } = useScrollProgress();
  const [visibleItems, setVisibleItems] = useState(0);

  const [start, end] = show;
  let [enterDuration, exitDuration] = duration;
  if (start + enterDuration > end || end - exitDuration < start) {
    console.error("Error: Duration exceeds show range");
    enterDuration = 0;
    exitDuration = 0;
  }

  const enter = start + enterDuration;
  const exit = end - exitDuration;

  let contentLength = 0;
  content.forEach((item) => {
    item.precedingLength = contentLength;
    item.length = (typeof item.node === "string") ? item.node.length : 1;
    contentLength += item.length;
  });

  const itemShown = useTransform(smoothYProgress, [start, enter, exit, end], [0, contentLength, contentLength, 0]);

  useMotionValueEvent(itemShown, "change", (latest) => {
    const floored = Math.floor(latest);
    setVisibleItems((prev) =>
      prev !== floored ? floored : prev
    );
  });

  return <div className={`${className} overflow-clip`} onClick={onClick && (() => onClick())}>
    {content.map((item) => 
      (
        typeof item.node === "string") ? 
          (visibleItems > item.precedingLength) && <div 
            className={item.className || ""} 
            onClick={item.onClick}
          >
            {item.node.substring(0, visibleItems - item.precedingLength)}
          </div> 
          : (visibleItems >= item.precedingLength + item.length) && item.node
      )
    }
  </div>
}