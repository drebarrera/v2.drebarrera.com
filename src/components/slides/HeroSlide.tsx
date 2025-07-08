import BlobCenterpiece from "../BlobCenterpiece";
import ToolCarousel from "../ToolCarousel";
import SlideItem from "../library/scroll/SlideItem";
import TypewriterCycleText from '../library/text/TypewriterCycleText';

export default function HeroSlide() {
  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-col md:flex-row items-center gap-[10px] md:gap-[50px]">
      <BlobCenterpiece className="w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0" />
      <div className="w-full flex flex-col items-center gap-[40px] overflow-x-clip">
        <div className="w-full flex flex-col items-center md:items-start md:gap-[5px]">
          <SlideItem
            show={[0, 0.01]}
            duration={[0, 0.02]}
            overrideVisible={true}
          >
            <TypewriterCycleText
              className="h-[50px] text-3xl lg:text-4xl xl:text-5xl text-[var(--theme-4)]"
              content={[
                "Hello world. I'm",
                "Hola mundo. Soy",
                "こんにちは 世界。僕は",
                "Saluton mondo. Mi estas",
                "Hallo Welt. Ich bin",
                "Bonjour le monde. Je suis",
                "Привет мир. Я"
              ]}
              trigger={true}
              step={70}
              endOfWord={3000}
            />
          </SlideItem>
          <SlideItem
            show={[0, 0.03]}
            duration={[0, 0.02]}
            overrideVisible={true}
          >
            <h1 className="w-fit text-5xl lg:text-7xl xl:text-8xl text-[var(--theme-2)] md:ml-[25px]">Andrés Barrera</h1>
          </SlideItem>
        </div>
        <SlideItem
          show={[0, 0.05]}
          duration={[0, 0.02]}
          overrideVisible={true}
          className="relative w-full overflow-clip"
        >
          <ToolCarousel />
        </SlideItem>
      </div>
    </section>
  );
}