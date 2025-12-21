"use client";
import { useEffect, useState } from "react";
import CurveLoading from "@/components/CurveLoading";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 500ms delay + 600ms animation = ~1100ms
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  // start at top (prevents refresh-restored scroll from clashing with reveal)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {loading && <CurveLoading />}
      <div
        className={`transition-all duration-700 ${
          loading ? "opacity-0 translate-y-12" : "opacity-100 translate-y-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
