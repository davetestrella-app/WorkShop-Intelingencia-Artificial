import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface BannerCounterProps {
  targetDate: string;
}

export default function BannerCounter({ targetDate }: BannerCounterProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftData = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: false,
      };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCompleted: false,
        };
      } else {
        timeLeftData.isCompleted = true;
      }
      setTimeLeft(timeLeftData);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isCompleted) {
    return (
      <div className="flex items-center justify-center space-x-2.5 py-4 px-6 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm text-amber-800 text-center animate-pulse">
        <Clock className="w-5 h-5 text-amber-600 animate-spin-slow" />
        <span className="font-display font-semibold text-sm sm:text-base">
          💥 ¡EL LANZAMIENTO HA COMENZADO! ¡Grupo VIP de Whatsapp abierto!
        </span>
      </div>
    );
  }

  const items = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SEGS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center sm:items-start">
      <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold tracking-wider uppercase mb-3.5">
        <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
        <span>Las inscripciones cierran pronto:</span>
      </div>
      <div className="flex space-x-2 sm:space-x-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm w-16 h-18 sm:w-20 sm:h-22 p-2 relative overflow-hidden group hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-blue-600"></div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tracking-tight group-hover:scale-105 transition-transform">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-550 tracking-wider mt-1 uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
