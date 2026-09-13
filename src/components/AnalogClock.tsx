import React from 'react';

interface AnalogClockProps {
  hour?: number; // 1 - 12
  minute?: number; // 0 - 59
  size?: number;
  showDigital?: boolean;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({
  hour = 3,
  minute = 0,
  size = 200,
  showDigital = true
}) => {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;

  const center = size / 2;
  const radius = size * 0.44;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const formatDigital = () => {
    const h = hour.toString();
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div 
        className="relative bg-white rounded-full shadow-md border-6 border-[#F8C84E] p-2 flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius} fill="#F7FAFA" stroke="#E2EDED" strokeWidth="2" />

          {numbers.map(num => {
            const angle = (num * 30 - 90) * (Math.PI / 180);
            const numRadius = radius * 0.78;
            const x = center + numRadius * Math.cos(angle);
            const y = center + numRadius * Math.sin(angle) + (size > 180 ? 6 : 4);

            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize={size > 180 ? '16' : '13'}
                fontWeight="900"
                fill="#18364D"
              >
                {num}
              </text>
            );
          })}

          {/* Jarum Pendek Merah (JAM) */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - radius * 0.52}
            stroke="#F47E69"
            strokeWidth={size > 180 ? '7' : '5'}
            strokeLinecap="round"
            transform={`rotate(${hourAngle} ${center} ${center})`}
          />

          {/* Jarum Panjang Biru (MINIT) */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - radius * 0.74}
            stroke="#1BAE9D"
            strokeWidth={size > 180 ? '5' : '3.5'}
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} ${center} ${center})`}
          />

          <circle cx={center} cy={center} r={size > 180 ? '7' : '5'} fill="#18364D" />
          <circle cx={center} cy={center} r={size > 180 ? '3' : '2'} fill="#FFFFFF" />
        </svg>
      </div>

      {showDigital && (
        <div className="flex items-center gap-2 bg-[#18364D] text-[#F8C84E] font-mono px-4 py-1.5 rounded-2xl shadow-sm text-base font-black tracking-widest">
          <span>⏰ PUKUL {formatDigital()}</span>
        </div>
      )}
    </div>
  );
};
