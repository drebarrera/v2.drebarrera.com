import React, { useEffect, useState, useRef } from "react";
import skills from "../data/skills";
import useScreen from "../hooks/useScreen";

export default function SkillAreas() {
  const {screenWidth} = useScreen();

  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [queueTransition, setQueueTransition] = useState(false);
  const [itemWidth, setItemWidth] = useState(screenWidth >= 768 ? 275 : 175);
  const intervalRef = useRef<number | null>(null);
  const totalItems = skills.length;
  const totalWidth = itemWidth * totalItems;

  useEffect(() => {
    setItemWidth(screenWidth >= 768 ? 275 : 175);
  }, [screenWidth]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setOffset((prev) => {
        if (prev + itemWidth >= totalWidth) {
          setQueueTransition(true);
        }
        setIsTransitioning(true);
        return prev + itemWidth;
      });
    }, 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalWidth, itemWidth]);

  useEffect(() => {
    if (queueTransition) {
      const id = setTimeout(() => {
        setIsTransitioning(false);
        setQueueTransition(false);
        setOffset(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [queueTransition]);

  function nextSkill() {
    console.log('next clicked');
    setOffset(prev => {
      if (prev + itemWidth >= totalWidth) {
        setQueueTransition(true);
      }
      setIsTransitioning(true);
      return prev + itemWidth;
    })
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setOffset((prev) => {
        if (prev + itemWidth >= totalWidth) {
          setQueueTransition(true);
        }
        setIsTransitioning(true);
        return prev + itemWidth;
      });
    }, 5000);
  }

  return (
    <div className="relative w-full bg-[#fff] flex flex-row border-1 border-[var(--theme-d)] overflow-clip">
      <div className="w-full flex flex-col justify-center">
        <div 
          className="w-0 overflow-visible flex flex-row items-center"
          style={{
            transform: `translateX(-${offset}px)` ,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
        { 
          [...skills, ...skills].map((skill, index) => 
            <div key={index} className="relative shrink-0 w-[275px] h-[400px] p-[20px] py-[40px] flex flex-col items-center border-r-1 border-r-[var(--theme-d)] gap-[30px]">
              <div className="w-[175px] h-[175px] bg-[#eee] z-0">
                {skill.i ? React.cloneElement(skill.i, {play: Math.round(offset / itemWidth) == index}) : undefined}
              </div>
              <div className="flex flex-col gap-[5px] z-0">
                <h3 className="text-lg text-[#000]">{skill.h}</h3>
                <p className="font-light text-[#444] text-sm leading-[1.75]">{skill.p}</p>
              </div>
            </div>
          ) 
        }
        </div>
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 80%, #fff 100%)'
          }}
        />
        <div 
          className="absolute w-[50px] h-[50px] right-0 mr-[10px] bg-[var(--theme-f)] z-20 border-1 border-[var(--theme-c)] p-[8px] cursor-pointer"
          onClick={() => nextSkill()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--theme-2)"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z"/></svg>
        </div>
      </div>
    </div>
  );
}