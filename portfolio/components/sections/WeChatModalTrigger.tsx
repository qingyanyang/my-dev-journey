"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

export default function WeChatModalTrigger({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      {/* Trigger (inline, safe in Server layout) */}
      <span
        onClick={() => setOpen(true)}
        className="underline cursor-pointer hover:text-primary transition-colors"
      >
        {label}
      </span>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[9999]">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
              <div className="relative bg-card/80 backdrop-blur-md p-8 rounded-3xl border border-border energetic-shadow text-center space-y-6 w-full max-w-sm">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/40 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="font-heading text-xl font-bold text-foreground">
                  微信 “扫一扫” 添加
                </h2>

                <div className="relative mx-auto w-60 h-75 rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="zh/QR-code.png"
                    alt="WeChat QR Code"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </>
  );
}
