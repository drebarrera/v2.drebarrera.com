import { useEffect, useMemo, useState } from "react";
import AutoGrowTextarea from "./AutoGrowTextarea";
import TypewriterDiv from "./library/text/TypewriterDiv";

export default function DreGPT() {
  const [show, setShow] = useState<boolean>(false);
  const [gptInput, setGptInput] = useState<string>('');
  const [gptResponse, setGptResponse] = useState<string>("Hi, I'm DreGPT - An AI agent equipped with Mistral 7B and FAISS vector store for searching anything and everything about Andrés. How may I help you today?");
  const [gptSources, setGptSources] = useState<string[]>([]);

  const gptResponseMemo = useMemo(() => [
    { node: gptResponse, className: "w-full" },
    ...gptSources.map((source) => ({
      node: source,
      className: "font-light text-xl text-[var(--accent-6)] hover:underline underline-offset-2 cursor-pointer",
      onClick: () => window.open(source, '_blank')
    }))
  ], [gptResponse, gptSources]);

  useEffect(() => {
    fetch('/api/testDre', { method: 'GET' }).then((response) => {
      if (response.status == 200) {
        setShow(true);
      } else {
        setShow(false);
        console.error('DreGPT Test Status:', response.status);
      }
    });
  }, [])

  /*useEffect(() => {
    console.log(gptResponseMemo);
  }, [gptResponseMemo]) */

  async function invokeDre() {
    const input = gptInput;
    setGptInput('');
    setGptResponse('Loading DreGPT...');
    
    try {
      const response = await fetch('/api/invokeDre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      //const body = await response.json();
      if (response.status != 200) {
        setGptResponse('DreGPT is currently down for maintenence. For more information about Andrés and his professional experience, please visit the below link.')
        //console.log(body);
      }
    } catch (e) {
      setGptResponse('DreGPT is currently down for maintenence. For more information about Andrés and his professional experience, please visit the below link.')
      setGptSources(['https://www.drebarrera.com'])
      console.error('DreGPT Error:', e);
    }
  }

  return (
    show && <div 
    className="w-full max-h-[calc(100vh - 100px)] ml-[40px] p-[15px] bg-[var(--theme-f)] flex flex-col gap-[20px] border-1 border-[var(--theme-c)]"
    style={{
      borderRadius: "25px",
      transition: "height 0.5s linear"
    }}
    >
      <TypewriterDiv 
        className="font-light text-2xl text-[var(--theme-2)] flex flex-row gap-x-[10px] gap-y-[10px] flex-wrap"
        trigger={gptResponseMemo}
        step={25}
        content={gptResponseMemo}
      />
      <div className="py-[5px] px-[15px]">
      </div>
      <div className="w-full flex flex-row gap-[8px] items-end">
        <AutoGrowTextarea
          className="w-full px-[10px] py-[4px] bg-[var(--theme-e)] rounded-lg text-lg resize-none"
          placeholder="Ask Anything"
          value={gptInput}
          onChange={e => setGptInput(e.target.value)}
        />
        <div 
          className="h-fit p-[4px] bg-[var(--theme-d)] hover:bg-[var(--accent-a)]" 
          style={{borderRadius: "50%"}}
          onClick={() => invokeDre()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="var(--theme-0)"><path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368z"/></svg>
        </div>
      </div>
      <div className="w-full flex flex-row gap-[10px] items-center">
        <p className="text-lg text-[var(--theme-2)]">Ask Me About:</p>
        <div 
          className="h-fit px-[10px] py-[4px] bg-[var(--theme-e)] hover:bg-[var(--accent-c)] flex flex-row gap-[8px] items-center text-[var(--theme-4)]"
          style={{borderRadius: "20px"}}
          onClick={() => {setGptInput("Tell me about Andrés' tech non-profit, Hispanic Hackers.")}}  
        >
          <p>My Non-Profit</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="var(--theme-4)"><path d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520t134 21.5 93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17M160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440m640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440M480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560"/></svg>
        </div>
        <div 
          className="h-fit px-[10px] py-[4px] bg-[var(--theme-e)] hover:bg-[var(--accent-c)] flex flex-row gap-[8px] items-center text-[var(--theme-4)]" 
          style={{borderRadius: "20px"}}
          onClick={() => {setGptInput("Tell me about Andrés' global impact mission and experience.")}}
        >
          <p>Traveling the World</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--theme-4)"><path d="M472-159q-33 0-56.5-24T392-240q0-33 23.5-56.5T472-320l24-23q8-8 18.5-12.5T536-360q23 0 39.5 17t16.5 40v17q0 20 13 33t33 13q15 0 27-9t17-23l12-33q9-24 29-39.5t46-15.5q11-28 17.5-58t6.5-62q0-89-44.5-162.5T632-758v38q0 33-23.5 56.5T552-640h-40v80q0 17-11.5 28.5T472-520h-40v68q0 22-15 37t-37 15q-14 0-25.5-6T336-423l-64-97h-40v40q0 31-21 53t-50 26q26 104 112.5 173T472-159Zm80-241q-17 0-28.5-11.5T512-440q0-17 11.5-28.5T552-480h40q17 0 28.5 11.5T632-440q0 17-11.5 28.5T592-400h-40Zm93-120q-20 0-31.5-15.5T608-570l15-44q4-12 14-19t22-7q20 0 31.5 15.5T696-590l-15 44q-4 12-14 19t-22 7ZM472-80q-83 0-156-31.5T189-197q-54-54-85.5-127T72-480q0-83 31.5-156T189-763q54-54 127-85.5T472-880q83 0 156 31.5T755-763q54 54 85.5 127T872-480q0 83-31.5 156T755-197q-54 54-127 85.5T472-80Z"/></svg>
        </div>
        <div 
          className="h-fit px-[10px] py-[4px] bg-[var(--theme-e)] hover:bg-[var(--accent-c)] flex flex-row gap-[8px] items-center text-[var(--theme-4)]" 
          style={{borderRadius: "20px"}}
          onClick={() => {setGptInput("Tell me about Andrés' core technical and non-technical skills.")}}
        >
          <p>My Core Skills</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--theme-4)"><path d="m270-120-10-88 114-314q15 14 32.5 23.5T444-484L334-182l-64 62Zm420 0-64-62-110-302q20-5 37.5-14.5T586-522l114 314-10 88ZM480-520q-50 0-85-35t-35-85q0-39 22.5-69.5T440-752v-88h80v88q35 12 57.5 42.5T600-640q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Z"/></svg>
        </div>
      </div>
    </div>
  )
}