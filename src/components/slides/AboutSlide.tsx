import SlideItem from "../library/scroll/SlideItem";


export default function AboutSlide() {
  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-row md:flex-row items-center gap-[10px] md:gap-[50px]">
      <div className="w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0"></div>
      <div className="w-full flex flex-col gap-[40px]">
        <SlideItem
          show={[0.05, 0.3]}
          duration={[0.02, 0.02]}
          className="flex flex-col gap-[15px]"
        >
          <h2 className="w-fit text-lg lg:text-2xl xl:text-3xl text-[var(--theme-6)]">About Me</h2>
          <p className="text-2xl lg:text-4xl xl:text-5xl font-light text-[var(--theme-4)] leading-tight">I'm a <span className="text-[var(--accent-6)]">Software and Product Engineer</span> located in <del className="text-[var(--theme-8)]">Tokyo</del> <del className="text-[var(--theme-8)]">San Francisco</del> Austin specializing in system architecture, web and mobile design, and AI integration.</p>
        </SlideItem>
        <SlideItem
          show={[0.075, 0.275]}
          duration={[0.015, 0.015]}
        >
          <p className="text-lg lg:text-2xl xl:text-3xl font-light leading-tight">I have <span className="text-[var(--accent-6)]">7+ years of professional experience</span> in leading software and product development from conception to deployment.</p>
        </SlideItem>
        {/*<SlideItem
          show={[0.1, 0.25]}
          duration={[0.015, 0.015]}
        >
          <p className="text-lg lg:text-2xl xl:text-3xl font-light leading-tight">I established <a href="https://www.hispanichackers.org" className="text-[var(--accent-6)] underline underline-offset-2">Hispanic Hackers</a> as a 501(c)(3) <span className="text-[var(--accent-6)]">non-profit of 2,700+ members</span> to address the lack of Latino representation in tech and <span className="text-[var(--accent-6)]">support my community.</span></p>
        </SlideItem>*/}
      </div>
    </section>
  );
}