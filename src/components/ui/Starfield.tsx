"use client";

import { useEffect, useRef } from "react";

class Star {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speed: number = 0;
  opacity: number = 0;

  constructor(width: number, height: number) {
    this.reset(width, height, true);
  }

  reset(width: number, height: number, initial: boolean = false) {
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : height;
    this.size = Math.random() * 1.5;
    this.speed = Math.random() * 0.05 + 0.02;
    this.opacity = Math.random();
  }

  update(width: number, height: number) {
    this.y -= this.speed;
    if (this.y < 0) {
      this.reset(width, height, false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      stars = Array.from({ length: count }, () => new Star(canvas.width, canvas.height));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update(canvas.width, canvas.height);
        star.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
