import productEngineeringLottie from "./lottie/product_engineering.json";
import productDesignLottie from "./lottie/product_design.json";
import dataAutomationLottie from "./lottie/data_automation.json";
import aiIntegrationLottie from "./lottie/ai_integration.json";
import globalReachLottie from "./lottie/global_reach.json";
import SMLottie from "../components/library/animation/SMLottie";

const skills = [
  {
    i: <SMLottie
      data={productEngineeringLottie}
      play={true}
      frame={350}
      continueOnToggleOff={true}
    />,
    h: "Product Engineering",
    p: "Programming since I was 13, I build and scale full-stack software applications with clean architecture."
  },
  {
    i: <SMLottie
      data={productDesignLottie}
      play={true}
      frame={350}
      continueOnToggleOff={true}
    />,
    h: "Product Design",
    p: "I create intuitive and functional digital experiences that users love."
  },
  {
    i: <SMLottie
      data={dataAutomationLottie}
      play={true}
      frame={200}
      continueOnToggleOff={true}
    />,
    h: "Data Automation",
    p: "Streamlining workflows by automating data ingestion, transformation, and reporting"
  },
  {
    i: <SMLottie
      data={aiIntegrationLottie}
      play={true}
      frame={50}
      continueOnToggleOff={true}
    />,
    h: "AI Integration",
    p: "Embedding AI tools into products to enhance performance, insight, and interaction."
  },
  {
    i: <SMLottie
      data={globalReachLottie}
      play={true}
      frame={50}
      continueOnToggleOff={true}
    />,
    h: "Global Reach",
    p: "I innovate with a global lens, am fluent in multiple languages, and work with nearshore and offshore teams."
  }
];

export default skills;