import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';

interface CountdownProps {
  initialSeconds: number;
  onComplete?: () => void; // optional callback when timer hits 0
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    // reset seconds if initialSeconds changes
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [onComplete]); // ✅ only depends on onComplete

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;





  

  return (
    <span className="fw-bold">
      {minutes}:{secs.toString().padStart(2, '0')}
    </span>
  );
};

export default Countdown;
