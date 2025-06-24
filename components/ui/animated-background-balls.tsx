import React, { useEffect, useRef, useState } from "react";

const COLORS = [
  "bg-fest-primary",
  "bg-pink-400",
  "bg-pink-300",
  "bg-fest-primary/60",
  "bg-fest-primary/30",
  "bg-fest-primary/50",
  "bg-fest-primary/20",
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function randomOpacity() {
  return randomBetween(0.2, 0.7).toFixed(2);
}

function randomSize() {
  // Tamanhos menores e mais padronizados
  const sizes = [0.5, 0.7, 0.8, 1, 1.2, 1.4, 1.6];
  return sizes[Math.floor(Math.random() * sizes.length)].toFixed(2);
}

function randomLeft() {
  return `${randomBetween(0, 100)}vw`;
}

interface Ball {
  id: string;
  left: string;
  size: string;
  color: string;
  opacity: string;
  duration: number;
}

export default function AnimatedBackgroundBalls() {
  const [balls, setBalls] = useState<Ball[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const addBall = () => {
      idRef.current += 1;
      // Gera um id único usando crypto.randomUUID para garantir unicidade
      const uniqueId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}-${Math.random()}`;
      setBalls((prev) => [
        ...prev,
        {
          id: uniqueId,
          left: randomLeft(),
          size: randomSize(),
          color: randomColor(),
          opacity: randomOpacity(),
          duration: randomBetween(6, 18),
        },
      ]);
    };
    // Inicial
    for (let i = 0; i < 100; i++) addBall();
    // Novas bolinhas a cada 1.5s
    const interval = setInterval(addBall, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleAnimationEnd = (id: string) => {
    setBalls((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {balls.map((ball) => (
        <div
          key={ball.id}
          className={`absolute rounded-full ${ball.color}`}
          style={{
            left: ball.left,
            width: `${ball.size}rem`,
            height: `${ball.size}rem`,
            opacity: ball.opacity,
            top: `-3rem`,
            animation: `falling-ball ${ball.duration}s linear forwards`,
          }}
          onAnimationEnd={() => handleAnimationEnd(ball.id)}
        />
      ))}
      <style>{`
        @keyframes falling-ball {
          to {
            top: 110vh;
          }
        }
      `}</style>
    </div>
  );
}
