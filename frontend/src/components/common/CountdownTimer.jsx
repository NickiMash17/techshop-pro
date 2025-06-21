import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="bg-primary/20 px-2 py-1 rounded">
        {String(timeLeft.hours).padStart(2, '0')}h
      </div>
      <div className="bg-primary/20 px-2 py-1 rounded">
        {String(timeLeft.minutes).padStart(2, '0')}m
      </div>
      <div className="bg-primary/20 px-2 py-1 rounded">
        {String(timeLeft.seconds).padStart(2, '0')}s
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  endTime: PropTypes.number.isRequired
};

export default CountdownTimer;