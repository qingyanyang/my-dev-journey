import { Heart } from "lucide-react";
import { getDictionary } from "@/lib/getDictionary";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Footer = async ({ lang }: any) => {
  const isZh = lang === "zh";
  const dic = await getDictionary(lang);
  const footerDic = dic.footer;
  return (
    <div
      className="relative h-[800px] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[800px] sticky top-[calc(100vh-800px)]">
          <section className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-foreground text-background relative overflow-hidden">
            <div className="max-w-5xl mx-auto text-center space-y-12 lg:space-y-16 relative z-10">
              <div className="space-y-6 lg:space-y-8">
                <h2
                  className={clsx(
                    "font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold ",
                    isZh ? "tracking-wider" : "tracking-tight"
                  )}
                >
                  {footerDic.heading}
                </h2>

                <p className="text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                  {footerDic.description}
                  <br />
                  <span className="inline-flex items-center gap-2 mt-2">
                    {footerDic.subline}
                    <Heart className="w-5 h-5 text-accent animate-pulse" />
                  </span>
                </p>
              </div>

              <div className="pt-12 lg:pt-16 border-t border-border/40">
                <p className="text-muted-foreground font-medium">
                  {footerDic.copyright}
                  <br />
                  <span className="text-sm">{footerDic.note}</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Footer;
