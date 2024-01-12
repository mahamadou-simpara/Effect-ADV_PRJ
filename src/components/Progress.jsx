import { useEffect, useState } from "react";

export default function Progress({ timeout, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeout);

    return () => {clearTimeout(timer)};

  }, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {clearInterval(interval)};
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
