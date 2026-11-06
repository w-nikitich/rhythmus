"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentDirection, setCurrentDirection] = useState("");
  const [duration, setDuration] = useState(0);
  const directions = ["top", "left", "bottom", "right"];
  const textRef = useRef<HTMLParagraphElement>(null);

  const updatePosition = () => {
    if (!textRef.current) return;

    const elementWidth = textRef.current.offsetWidth;
    const elementHeight = textRef.current.offsetHeight;

    const maxPositionX = window.innerWidth - elementWidth;
    const maxPositionY = window.innerHeight - elementHeight;

    const safeMaxX = Math.max(0, maxPositionX);
    const safeMaxY = Math.max(0, maxPositionY);

    const availableDirections = directions.filter(
      (dir) => dir !== currentDirection,
    );

    const randomDirectionIndex = Math.floor(
      Math.random() * availableDirections.length,
    );
    const randomDirection = availableDirections[randomDirectionIndex];
    setCurrentDirection(randomDirection);

    let newX = 0;
    let newY = 0;

    switch (randomDirection) {
      case "top":
        newX = Math.random() * safeMaxX;
        newY = safeMaxY;
        break;
      case "left":
        newX = safeMaxX;
        newY = Math.random() * safeMaxY;
        break;
      case "bottom":
        newX = Math.random() * safeMaxX;
        newY = 0;
        break;
      case "right":
        newX = 0;
        newY = Math.random() * safeMaxY;
        break;
    }

    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    updatePosition();
  }, []);

  const handleTransitionEnd = () => {
    updatePosition();
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray relative overflow-hidden min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl items-center justify-center gap-10 relative">
        <div className="flex flex-col gap-5 items-end">
          <Image src="/logo.png" alt="logo" width={150} height={100} />
          <p className="text-white text-2xl font-black text-center">
            Can't recognize you. Please, sign in.
          </p>
        </div>

        <p
          ref={textRef}
          onTransitionEnd={updatePosition}
          className="fixed text-white/50 text-2xl font-black transition-transform duration-2000 ease-in-out whitespace-nowrap pointer-events-none z-50"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          Or sign up. Anything will do.
        </p>

        <span className="w-0.5 h-screen bg-white/30"></span>

        <div className="flex flex-col gap-4 font-pixelify">
          <Button
            variant="outline"
            className="bg-silver px-10 py-3 border-blue-800 rounded-sm hover:bg-silver"
          >
            Sign in
          </Button>
          <Button
            variant="outline"
            className="bg-silver px-10 py-3 border-blue-800 rounded-sm hover:bg-silver"
          >
            Sign up
          </Button>
        </div>
      </main>
    </div>
  );
}
