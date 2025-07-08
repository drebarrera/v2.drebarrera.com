import { useEffect, useState, type ReactNode } from "react"

export default function SMTypewriterText({ children, className, show=true, triggerNode, timeout, step, onFinish, spaceLatency, onClick } : { children: string, className: string, show?: boolean, triggerNode?: ReactNode, timeout?: number, step: number, onFinish?: Function, spaceLatency?: number, onClick?: Function }) {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [charShown, setCharShown] = useState<number>(0);

  useEffect(() => {
    if (!showContent) return;

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
  }, [showContent]);

  return show && !showContent ? <p 
    className="text-base md:text-lg font-medium cursor-pointer text-[#bbbbbb] hover:text-[#ffffff] fill-[#bbbbbb] hover:fill-[#ffffff]" 
    onClick={() => setShowContent(true)}
  >
    {triggerNode ?? "✦"}
  </p> : <div className={`${className} overflow-clip`} onClick={onClick && (() => onClick())}>
    {children.substring(0, charShown)}
  </div>
}