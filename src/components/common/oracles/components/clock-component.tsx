import React, { useState, useEffect } from "react";

export const LiveClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatTime(now));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-2xl">{currentTime}</div>;
};
