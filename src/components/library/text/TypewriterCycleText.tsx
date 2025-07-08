import { useEffect, useRef, useState } from "react"

export default function TypewriterCycleText({ content, className, show=true, trigger, step, endOfWord=0, onClick } : { content: string[], className?: string, show?: boolean, trigger: boolean, step: number, endOfWord?: number, onClick?: Function }) {
  const [shown, setShown] = useState<[number, "left" | "right", boolean, number]>([0, "right", false, 0]);
  const intervalRef = useRef<number | null>(null);



  useEffect(() => {
    if (!trigger) return;
    intervalRef.current = window.setInterval(() => {
      setShown(([prevChar, prevDir, prevEOW, prevChild]) => {
        if (!prevEOW) {
          if (prevDir === "right") {
            if (prevChar < content[prevChild % content.length].length) {
              return [prevChar + 1, prevDir, prevEOW, prevChild];
            } else {
              if (prevChar === content[prevChild % content.length].length) {
                setTimeout(() => {
                  setShown(([prevChar, prevDir]) => [prevChar, prevDir, false, prevChild]);
                }, endOfWord);
                return [prevChar, 'left', true, prevChild];
              }
              return [prevChar - 1, "left", prevEOW, prevChild];
            }
          } else if (prevDir === "left") {
            if (prevChar > 0) {
              return [prevChar - 1, prevDir, prevEOW, prevChild];
            } else {
              return [prevChar + 1, "right", prevEOW, prevChild + 1];
            }
          }
          return [-1, prevDir, prevEOW, prevChild];
        }
        return [prevChar, prevDir, prevEOW, prevChild]
      });
    }, step);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger]);

  return (show || true) && <div className={`${className} overflow-clip`} onClick={onClick && (() => onClick())}>
    {content[shown[3] % content.length]?.substring(0, shown[0])}
  </div>
}