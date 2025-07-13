import SlideItem from "../library/scroll/SlideItem";
import DreGPT from "../DreGPT";
import SkillAreas from "../SkillAreas";


export default function AskMeAnythingSlide() {

  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-row md:flex-row items-center gap-[10px] md:gap-[50px]">
      <div className="hidden md:flex w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0"/>
      <div className="w-full flex flex-col p-[20px]">
        <SlideItem
          show={[0.475, 0.95]}
          duration={[0.04, 0.04]}
          className="w-full flex flex-col gap-[20px]"
        >
          <h2 className="w-fit text-2xl lg:text-2xl xl:text-3xl text-[var(--theme-6)]">My Skill Areas</h2>
          <SkillAreas />
        </SlideItem>
        <SlideItem
          show={[0.65, 0.95]}
          duration={[0.04, 0.04]}
          className="absolute w-full flex flex-col mt-[-30px] z-50"
        >
          <DreGPT />
        </SlideItem>
      </div>
    </section>
  );
}