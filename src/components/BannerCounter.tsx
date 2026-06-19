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
      <div className="flex items-center justify-center space-x-2.5 py-4 px-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-lg text-amber-300 text-center animate-pulse">
        <Clock className="w-5 h-5 text-amber-500 animate-spin-slow" />
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
      <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold tracking-wider uppercase mb-3.5">
        <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>El grupo VIP se cierra antes del Lanzamiento oficial:</span>
      </div>
      <div className="flex space-x-2 sm:space-x-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-lg w-16 h-18 sm:w-20 sm:h-22 p-2 relative overflow-hidden group hover:border-emerald-500/40 hover:bg-white/10 transition-all"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500/60 shadow-[0_0_8px_#10b981]"></div>
            <span className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight group-hover:scale-105 transition-transform">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-wider mt-1 uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
