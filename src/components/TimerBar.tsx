import React, { useEffect, useState } from "react";

interface TimerBarProps {
  duration: number; // Duration in milliseconds
}

const TimerBar: React.FC<TimerBarProps> = ({ duration }) => {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    let startTime: number | null = null;

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      // Calculate progress as a percentage
      const remainingPercentage = Math.max(100-(elapsedTime/duration) *100,0)

      setProgress(remainingPercentage);

      if (elapsedTime < duration) {
        requestAnimationFrame(animateProgress); // Continue animation until the duration ends
      }
    };

    const animationFrame = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrame); // Cleanup animation on unmount
    };
  }, [duration]);

  return (
    <div className={`progress-container circular`}>
        <svg className="circular-bar" viewBox="0 0 36 36">
          <path
            className="progress-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="progress-circle"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
    </div>
  );
};

export default TimerBar;