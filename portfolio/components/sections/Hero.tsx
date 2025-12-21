import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { linkedin } from "@/app/[lang]/page";
import { getDictionary } from "@/lib/getDictionary";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hero = async ({ lang }: any) => {
  const isZh = lang === "zh";
  const dic = await getDictionary(lang);
  const heroDic = dic.hero;
  return (
    <section className="min-h-screen w-full bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center w-full relative z-10">
        {/* LEFT */}
        <div className="space-y-8 lg:space-y-12 text-center lg:text-left">
          <div className="space-y-6 lg:space-y-8">
            <h1
              className={clsx(
                "font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground",
                isZh
                  ? "tracking-wide leading-[1.2]"
                  : "tracking-tight leading-[1.1]"
              )}
            >
              {heroDic.hello}
              <br />
              {heroDic.intro}
              <br />
              {!isZh && (
                <span className="flex items-center justify-center lg:justify-start gap-3 leading-[1.3]">
                  Chelsea Yang
                  <Sparkles className="w-8 h-8 lg:w-12 lg:h-12 text-accent animate-pulse" />
                </span>
              )}
            </h1>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-primary">
              {heroDic.title}
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-muted-foreground">
              {heroDic.basedIn}{" "}
              <span className="text-secondary font-semibold">
                {heroDic.location}
              </span>
              .
            </p>
          </div>

          {/* CTA Button */}
          <button className="cursor-pointer relative overflow-hidden rounded-full px-8 sm:px-12 lg:px-16 xl:px-20 py-4 lg:py-6 text-base lg:text-lg font-bold tracking-wide bg-gradient-to-r from-primary to-primary hover:from-secondary/90 hover:to-secondary/90 text-primary-foreground backdrop-blur-md border border-border/40 shadow-lg shadow-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-secondary/50 group">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="absolute top-1 left-4 text-background/70 text-2xl">
              ❄
            </span>
            <span className="absolute bottom-1 right-6 text-background/60 text-xs">
              ❄
            </span>
            <span className="absolute top-3 right-10 text-background/40 text-xl">
              ❄
            </span>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={linkedin}
              className="relative z-10 flex items-center gap-2 text-2xl"
            >
              {heroDic.cta}
              <ArrowRight />
            </a>
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative transition-all duration-[1200ms] delay-200">
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/girl-developer-4-1.gif"
                alt="Developer illustration"
                width={1600}
                height={1600}
                priority
                unoptimized
                className="object-cover w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
