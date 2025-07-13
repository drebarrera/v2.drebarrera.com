import CalendlyEmbed from "../CalendlyEmbed";
import SlideItem from "../library/scroll/SlideItem";


export default function ContactSlide() {

  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-row md:flex-row items-center gap-[10px] md:gap-[50px]">
      <div className="w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0"></div>
      <div className="w-full flex flex-col gap-[40px]">
        <SlideItem
          show={[0.925, 1.1]}
          duration={[0.04, 0]}
          className="flex flex-col gap-[20px] items-center"
        >
          <h2 className="w-full text-lg lg:text-2xl xl:text-3xl text-[var(--theme-6)]">Let's Build Together</h2>
          <div className="w-full flex flex-col gap-[5px]">
          <p className="w-full text-lg lg:text-2xl xl:text-2xl font-light leading-tight">I am open to new opportunities and ready to design, build, and deploy.</p>
          <p className="w-full text-lg lg:text-2xl xl:text-2xl font-light leading-tight">Feel free to send me a message via <a href="https://drebarrera.fillout.com/connect" target="_blank" className="text-[var(--accent-6)] underline underline-offset-2">my contact form</a> or schedule time to meet with me below.</p>
          </div>
          <CalendlyEmbed />
        </SlideItem>
      </div>
    </section>
  );
}