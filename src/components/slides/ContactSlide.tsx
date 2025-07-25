import CalendlyEmbed from "../CalendlyEmbed";
import SlideItem from "../library/scroll/SlideItem";


export default function ContactSlide() {
  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-row md:flex-row items-center md:items-end 2xl:items-center gap-[10px] md:gap-[50px] p-[20px]">
      <div className="hidden md:flex w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0"></div>
      <div className="w-full h-full flex flex-col gap-[40px] overflow-y-auto justify-center">
        <SlideItem
          show={[0.925, 1.1]}
          duration={[0.04, 0]}
          className="h-fit flex flex-col gap-[30px] items-center md:mt-[60px]"
        >
          <div className="flex flex-col gap-[10px]">
            <h2 className="w-full text-2xl lg:text-2xl xl:text-3xl text-[var(--theme-6)]">Let's Build Together</h2>
            <p className="w-full text-2xl lg:text-2xl xl:text-2xl font-light leading-tight">I am open to new opportunities and ready to design, build, and deploy.</p>
          </div>
          <a 
            href="https://drebarrera.fillout.com/connect" 
            target="_blank" className="w-fit bg-[var(--accent-6)] py-[4px] px-[12px] text-xl font-medium text-[var(--theme-f)] flex flex-row items-center gap-[7px]"
            style={{borderRadius: "20px"}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="var(--theme-f)"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240zm160-320h320v-80H240zm0-120h480v-80H240zm0-120h480v-80H240z"/></svg>
            Send Me a Message
          </a>
          <div className="w-full flex flex-row items-center shrink">
            <div className="w-full bg-[var(--theme-c)] h-[2px] shrink"/>
            <p className="text-lg px-[10px] text-[var(--theme-6)]">OR</p>
            <div className="w-full bg-[var(--theme-c)] h-[2px] shrink"/>
          </div>
          <div className="hidden md:flex">
            <CalendlyEmbed />
          </div>
          <a 
            href="https://drebarrera.fillout.com/connect" 
            target="_blank" className="md:hidden w-fit bg-[var(--accent-6)] py-[4px] px-[12px] text-xl font-medium text-[var(--theme-f)] flex flex-row items-center gap-[7px]"
            style={{borderRadius: "20px"}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="var(--theme-f)" height="28" viewBox="0 -960 960 960" width="28"><path d="M580-240q-42 0-71-29t-29-71 29-71 71-29 71 29 29 71-29 71-71 29M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880t28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880t28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200z"/></svg>
            Schedule a Meeting
          </a>
        </SlideItem>
      </div>
    </section>
  );
}