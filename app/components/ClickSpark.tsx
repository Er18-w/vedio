"use client";

import {
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startedAt: number;
};

type ClickSparkProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  count?: number;
  duration?: number;
  radius?: number;
  size?: number;
};

/**
 * Adapted from React Bits' ClickSpark component for CBTI.
 * Source: https://github.com/DavidHDev/react-bits
 * License: MIT + Commons Clause.
 */
export default function ClickSpark({
  children,
  className,
  color = "#f6bf66",
  count = 10,
  duration = 460,
  radius = 26,
  size = 11,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;

    const draw = (time: number) => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.scale(ratio, ratio);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.startedAt;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = progress * (2 - progress);
        const distance = eased * radius;
        const line = size * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + line) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + line) * Math.sin(spark.angle);

        context.globalAlpha = 1 - progress;
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        return true;
      });

      context.restore();
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [color, duration, radius, size]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const startedAt = performance.now();

      sparksRef.current.push(
        ...Array.from({ length: count }, (_, index) => ({
          x,
          y,
          angle: (Math.PI * 2 * index) / count,
          startedAt,
        })),
      );
    },
    [count],
  );

  return (
    <div className={`click-spark ${className ?? ""}`} onClick={handleClick}>
      <canvas ref={canvasRef} aria-hidden="true" />
      {children}
    </div>
  );
}
