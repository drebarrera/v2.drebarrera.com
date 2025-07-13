import './App.css';
import '/src/assets/fonts/fonts.css';
import Header from './components/Header';
import HeroSlide from './components/slides/HeroSlide';
import useScreen from './hooks/useScreen';
import AboutSlide from './components/slides/AboutSlide';
import AskMeAnythingSlide from './components/slides/AskMeAnythingSlide';
import ContactSlide from './components/slides/ContactSlide';
import { useScrollProgress } from './context/ScrollContext';
import BlobSlide from './components/slides/BlobSlide';

const N_SLIDES = 4;

function App() {
  const {screenHeight} = useScreen();
  const {scrollYValue} = useScrollProgress();

  return (
    <div 
      className="w-screen flex flex-col items-center bg-[var(--theme-e)]"
      style={{ height: screenHeight * N_SLIDES }}
    >
      <Header />
      <BlobSlide />
      {(scrollYValue == null || scrollYValue < 0.15) && <HeroSlide />}
      {(scrollYValue != null && scrollYValue > 0.15 && scrollYValue < 0.5) && <AboutSlide />}
      {(scrollYValue != null && scrollYValue > 0.475 && scrollYValue < 0.95) && <AskMeAnythingSlide />}
      {(scrollYValue != null && scrollYValue > 0.9) && <ContactSlide />}
    </div>
  );
}

export default App;
