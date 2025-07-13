import { useEffect, useState } from "react"

export default function TypewriterText({ children, className, show=true, trigger, timeout, step, onFinish, spaceLatency, onClick } : { children: string, className?: string, show?: boolean, trigger: any, timeout?: number, step: number, onFinish?: Function, spaceLatency?: number, onClick?: Function }) {
  const [charShown, setCharShown] = useState<number>(0);

  useEffect(() => {
    if (!trigger) return;

    const timeouts: number[] = [];

    var space_latency = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] == ' ') space_latency += spaceLatency || 0;
      const t = setTimeout(() => {
        setCharShown(i + 1);
      }, (i * step) + space_latency + (timeout || 0));
      timeouts.push(t);
    }

    if (onFinish) {
      const finishTimeout = setTimeout(() => {
        onFinish();
      }, ((children.length + 1) * step) + space_latency + (timeout || 0));
      timeouts.push(finishTimeout);
    }
    
    return () => timeouts.forEach(clearTimeout);
  }, [trigger, children]);

  return (show || true) && <div className={`${className} overflow-clip`} onClick={onClick && (() => onClick())}>
    {children.substring(0, charShown)}
  </div>
}