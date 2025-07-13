import BlobCenterpiece from "../BlobCenterpiece";
import SlideItem from "../library/scroll/SlideItem";

export default function BlobSlide() {
  return (
    <section className="fixed w-screen h-screen max-w-[1400px] flex flex-col md:flex-row items-center gap-[10px] md:gap-[50px] pt-[25px] md:pt-0">
      <BlobCenterpiece className="relative z-[1] w-[225px] h-[225px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] m-[30px] shrink-0" />
      <SlideItem
        show={[0.15, 1.1]}
        duration={[0.04, 0]}
        className="md:hidden z-[2] top-0 w-full h-full bg-[rgba(var(--theme-e-rgb),0.925)]"
        position="absolute"
      />
    </section>
  );
}