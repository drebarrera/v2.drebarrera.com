import SlideItem from "../library/scroll/SlideItem";
import DreGPT from "../DreGPT";


export default function AskMeAnythingSlide() {

  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-row md:flex-row items-center gap-[10px] md:gap-[50px]">
      <div className="w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0"></div>
      <div className="w-full flex flex-col gap-[40px]">
        <SlideItem
          show={[0.325, 0.6]}
          duration={[0.02, 0.02]}
          className="flex flex-col gap-[20px]"
        >
          <h2 className="w-fit text-lg lg:text-2xl xl:text-3xl text-[var(--theme-6)]">Ask Me Anything</h2>
          <DreGPT />
        </SlideItem>
      </div>
    </section>
  );
}