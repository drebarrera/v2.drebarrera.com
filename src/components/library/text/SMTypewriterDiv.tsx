import { useState, type ReactNode } from "react";
import TypewriterDiv from "./TypewriterDiv";

export default function SMTypewriterDiv({ triggerNode, content, className, show=true, timeout, step, onFinish }: { triggerNode?: ReactNode, content: {node: ReactNode | string, className?: string, timeout?: number, spaceLatency?: number, onClick?: Function, step?: number}[], className: string, show?: boolean, timeout?: number, step: number, onFinish?: Function }) {
  const [showContent, setShowContent] = useState<boolean>(false);

  return show && !showContent ? 
    <p 
      className="text-base md:text-lg font-medium cursor-pointer text-[#bbbbbb] hover:text-[#ffffff] fill-[#bbbbbb] hover:fill-[#ffffff]" 
      onClick={() => setShowContent(true)}
    >
      {triggerNode ?? "✦"}
    </p> :
    <TypewriterDiv 
      className={className} 
      trigger={showContent} 
      step={step} 
      onFinish={onFinish} 
      content={content}
      timeout={timeout}
    />
}