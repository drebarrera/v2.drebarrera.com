import { useEffect, useState, type ReactNode } from "react";
import TypewriterText from "./TypewriterText";

export default function TypewriterDiv({ content, className, show=true, trigger, timeout, step, onFinish }: { content: {node: ReactNode | string, className?: string, timeout?: number, spaceLatency?: number, onClick?: Function, step?: number}[], className?: string, show?: boolean, trigger: boolean, timeout?: number, step: number, onFinish?: Function }) {
  const [itemShown, setItemShown] = useState<number>(-1);

  useEffect(() => {
    if (!trigger) return;

    setTimeout(() => {
      setItemShown(0);
    }, timeout || 0);

  }, [trigger]);

  useEffect(() => {
    if (!show || itemShown == -1) return;

    if (content[itemShown]?.node && typeof content[itemShown]?.node !== "string") {
      setTimeout(() => {
        setItemShown((prev) => prev + 1);
      }, step);
    }

    if (itemShown != content.length || !onFinish) return;
    
    onFinish();
  }, [itemShown]);
  
  return (show) && <div className={className}>
    {
      content.map((item, index) => 
        (
          typeof item.node === "string") ? <TypewriterText 
            className={item.className || ""} 
            show={show || true}
            trigger={itemShown == index}
            timeout={item.timeout}
            step={item.step ?? step}
            spaceLatency={item.spaceLatency}
            onFinish={() => setItemShown((prev) => prev + 1)}
            onClick={item.onClick}
          >
            {item.node}
          </TypewriterText> : itemShown >= index && item.node
      )
    }
  </div>
}