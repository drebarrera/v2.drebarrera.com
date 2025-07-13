import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useState, useEffect, useRef } from "react";

export default function SMLottie({data, play, loop = false, frame = 0, playTime = 5000, continueOnToggleOff = false}: {data: any, play: boolean, loop?: boolean, frame?: number, playTime?: number, continueOnToggleOff?: boolean}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (play && !isPlaying && lottieRef.current) {
      lottieRef.current.goToAndPlay(0, true);
      setIsPlaying(true);
      setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.goToAndStop(frame, true);
        }
      }, playTime);
    } else if (!play && isPlaying && lottieRef.current) {
      if (!continueOnToggleOff) {
        lottieRef.current.goToAndStop(frame, true);
      }
      setIsPlaying(false);
    }
  }, [play, isPlaying]);

  return <Lottie
    lottieRef={lottieRef}
    animationData={data}
    loop={loop}
    autoplay={false}
  />
}