"use client";

import React, { useEffect, useRef } from "react";

const CurveLoading = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const initialCurve = 200;
  const duration = 600;

  const easeOutQuad = (
    time: number,
    start: number,
    change: number,
    duration: number
  ) => {
    time /= duration;
    return -change * time * (time - 2) + start;
  };

  const loaderHeight = () =>
    loaderRef.current?.getBoundingClientRect().height ?? 0;

  const setPath = (curve: number) => {
    if (!pathRef.current || !loaderRef.current) return;

    const width = window.innerWidth;
    const height = loaderHeight();

    pathRef.current.setAttribute(
      "d",
      `M0 0
       L${width} 0
       L${width} ${height}
       Q${width / 2} ${height - curve} 0 ${height}
       L0 0`
    );
  };

  const animate = (timestamp: number) => {
    if (startRef.current === null) {
      startRef.current = timestamp;
    }

    const elapsed = timestamp - startRef.current;

    const curve = easeOutQuad(elapsed, initialCurve, -initialCurve, duration);
    setPath(curve);

    if (loaderRef.current) {
      const translateY = easeOutQuad(elapsed, 0, -loaderHeight(), duration);
      loaderRef.current.style.transform = `translateY(${translateY}px)`;
    }

    if (elapsed < duration) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    startRef.current = null;
    setPath(initialCurve);

    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 h-[calc(100vh+200px)] pointer-events-none"
    >
      <svg className="w-full h-full">
        <path
          ref={pathRef}
          className="fill-primary stroke-primary stroke-[1px]"
        />
      </svg>
    </div>
  );
};

export default CurveLoading;
