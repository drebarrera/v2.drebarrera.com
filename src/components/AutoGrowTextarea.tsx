import React, { useRef, useEffect, type TextareaHTMLAttributes } from "react";

interface AutoGrowTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoGrowTextarea: React.FC<AutoGrowTextareaProps> = ({ value, onChange, className = "", ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={`w-full px-[10px] py-[4px] bg-[var(--theme-e)] rounded-lg text-lg resize-none ${className}`}
      rows={1}
      {...props}
    />
  );
};

export default AutoGrowTextarea; 