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
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const N_SLIDES = 4;

function App() {
  const {screenHeight} = useScreen();
  const {scrollYValue} = useScrollProgress();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      window.location.replace(`https://docs.drebarrera.com${location.pathname}`);
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100)
    }
  }, [location]);

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
      {(scrollYValue != null && scrollYValue > 0.925) && <ContactSlide />}
      <div className="fixed w-[40px] h-[40px] md:w-[60px] md:h-[60px] bottom-0 right-0 m-[20px] md:m-[50px] bg-[var(--theme-f)] flex items-center justify-center" style={{
          borderRadius: "40px",
          animation: scrollYValue != null && scrollYValue >= 0.95 ? "float-rotated 3s ease-in-out infinite" : "float 3s ease-in-out infinite"
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487z"/></svg>
      </div>
    </div>
  );
}

export default App;
