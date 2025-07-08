import './App.css';
import '/src/assets/fonts/fonts.css';
import Header from './components/Header';
import HeroSlide from './components/slides/HeroSlide';
import useScreen from './hooks/useScreen';
import AboutSlide from './components/slides/AboutSlide';
import AskMeAnythingSlide from './components/slides/AskMeAnythingSlide';

const N_SLIDES = 10;

function App() {
  const {screenHeight} = useScreen();

  return (
    <div 
      className="w-screen flex flex-col items-center bg-[var(--theme-e)]"
      style={{ height: screenHeight * N_SLIDES }}
    >
      <Header />
      <HeroSlide />
      <AboutSlide />
      <AskMeAnythingSlide />
    </div>
  );
}

export default App;
