import React from "react";

type Props = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// two digits
const two = (n: number) => String(n).padStart(2, "0");

export const Countdown: React.FC<Props> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="cd-base" role="group" aria-label="Compteur avant anniversaire">
      <div className="cd-timer">
        <div className="cd-box">{two(days)}</div>
        <span className="cd-text">jours</span>
      </div>
      <div className="cd-timer">
        <div className="cd-box">{two(hours)}</div>
        <span className="cd-text">heures</span>
      </div>
      <div className="cd-timer">
        <div className="cd-box">{two(minutes)}</div>
        <span className="cd-text">minutes</span>
      </div>
      <div className="cd-timer">
        <div className="cd-box">{two(seconds)}</div>
        <span className="cd-text">secondes</span>
      </div>
    </div>
  );
};
