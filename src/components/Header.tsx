import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext";
import useScreen from "../hooks/useScreen";

export default function Header() {
  const {toggleTheme} = useAppContext();
  const {screenHeight} = useScreen();

  const LINKS = [
    {
      label: 'About Me',
      onClick: () => {window.scrollTo(0, screenHeight * 4 * 0.2)}
    },
    {
      label: 'Download CV',
      href: '/Andres_Barrera_Resume.pdf'
    },
    {
      label: 'Contact Me',
      href: 'https://calendly.com/drebarrera/chat'
    },
    {
      icon: <svg className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm1.102 4.297a1.195 1.195 0 1 0 0-2.39 1.195 1.195 0 0 0 0 2.39m1 7.516V6.234h-2v6.579zM6.43 6.234h2v.881c.295-.462.943-1.084 2.148-1.084 1.438 0 2.219.953 2.219 2.766 0 .087.008.484.008.484v3.531h-2v-3.53c0-.485-.102-1.438-1.18-1.438-1.079 0-1.17 1.198-1.195 1.982v2.986h-2z"/></svg>,
      href: 'https://www.linkedin.com/in/drebarrera/'
    },
    {
      icon: <svg className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.163-.613-3.363-1.175a3.64 3.64 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2 2 0 0 1 1.538 1.025 2.137 2.137 0 0 0 2.912.825 2.1 2.1 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.9 3.9 0 0 1 1.025-2.688 3.6 3.6 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.43 9.43 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.6 3.6 0 0 1 .1 2.65 3.87 3.87 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.37 2.37 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75 0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247"/></svg>,
      href: 'https://www.github.com/drebarrera/'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px]" viewBox="0 -960 960 960"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm40-83q119-15 199.5-104.5T800-480q0-123-80.5-212.5T520-797v634Z"/></svg>,
      onClick: () => {toggleTheme();}
    }
  ]

  const [toggleHeight, setToggleHeight] = useState<number>(0);
  
  useEffect(() => {
    function handleResize() {
      setToggleHeight(0);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <menu className="w-full sm:hidden fixed z-50 top-0 right-0 p-[10px] flex flex-col items-end gap-[10px]">
        <div className="p-[5px] w-[45px] h-[45px]" onClick={() => setToggleHeight((prev) => prev ? 0 : 220)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--theme-6)"><path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/></svg>
        </div>
        <div 
          className="w-full h-fit bg-[var(--theme-f)] overflow-clip shadow-lg shadow-black" 
          style={{
            height: toggleHeight,
            transition: "height 0.5s linear",
            borderRadius: "10px"
          }}
        >
          <div className="w-full h-full p-[15px] overflow-clip flex flex-col gap-[10px] items-center">
            {
              LINKS.filter(x => x.label).map((link, index) => 
                <button key={index} onClick={link.href ? () => window.open(link.href, '_blank') : link.onClick} className="text-[var(--theme-4)] hover:text-[var(--accent-6)] fill-[var(--theme-4)] hover:fill-[var(--accent-6)] cursor-pointer flex flex-row gap-[10px] items-center text-lg">{link.icon}{link.label}</button>
              )
            }
            <div className="w-full h-fit flex flex-row flex-wrap gap-[10px] mt-[10px] items-center justify-center">
              {
                LINKS.filter(x => x.icon && !x.label).map((link, index) => 
                  <button key={index} onClick={link.href ? () => window.open(link.href, '_blank') : link.onClick} className="text-[var(--theme-4)] hover:text-[var(--accent-6)] fill-[var(--theme-4)] hover:fill-[var(--accent-6)] cursor-pointer flex flex-row gap-[10px] items-center text-lg">{link.icon}{link.label}</button>
                )
              }
            </div>
          </div>
        </div>
      </menu>
      <header className="hidden fixed top-0 left-0 w-full sm:flex flex-row gap-[25px] p-[25px] justify-end items-center z-50 bg-[var(--theme-e)]">
        {
          LINKS.map((link, index) => (
              <button key={index} onClick={link.href ? () => window.open(link.href, '_blank') : link.onClick} className="text-[var(--theme-4)] hover:text-[var(--accent-6)] fill-[var(--theme-4)] hover:fill-[var(--accent-6)] cursor-pointer flex flex-row gap-[10px] items-center text-lg">{link.icon}{link.label}</button>
          ))
        }
      </header>
    </>
  )
}