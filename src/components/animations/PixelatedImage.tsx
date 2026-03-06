"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface PixelatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function PixelatedImage({
  src,
  alt,
  width,
  height,
  className = "",
}: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number>(0);
  const pixelSizeRef = useRef(20);
  const targetPixelRef = useRef(20);
  const [isLoaded, setIsLoaded] = useState(false);

  const drawPixelated = useCallback(
    (pixelSize: number) => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (pixelSize <= 1) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, width, height);
        return;
      }

      const w = Math.ceil(width / pixelSize);
      const h = Math.ceil(height / pixelSize);

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, w, h);
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    },
    [width, height]
  );

  const animate = useCallback(() => {
    const diff = targetPixelRef.current - pixelSizeRef.current;
    if (Math.abs(diff) < 0.5) {
      pixelSizeRef.current = targetPixelRef.current;
      drawPixelated(pixelSizeRef.current);
      return;
    }
    pixelSizeRef.current += diff * 0.12;
    drawPixelated(Math.round(pixelSizeRef.current));
    animationRef.current = requestAnimationFrame(animate);
  }, [drawPixelated]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
      drawPixelated(20);
    };
    img.src = src;

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [src, drawPixelated]);

  const handleMouseEnter = () => {
    targetPixelRef.current = 1;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    targetPixelRef.current = 20;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={alt}
      role="img"
      data-cursor-hover
    />
  );
}
