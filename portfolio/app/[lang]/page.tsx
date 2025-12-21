import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/getDictionary";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import WeChatModalTrigger from "@/components/sections/WeChatModalTrigger";

export const email =
  process.env.NEXT_PUBLIC_EMAIL ?? "chelsea.yang.work@gmail.com"; // ← client-safe
export const linkedin =
  process.env.NEXT_PUBLIC_LINKEDIN ??
  "https://www.linkedin.com/in/chelsea-qingyan-yang/";
export const github =
  process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/qingyanyang";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isZh = lang === "zh";
  const dic = await getDictionary(lang);

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 text-foreground font-sans flex flex-col">
      {/* Sidebar */}
      <div
        className="
    m-4 lg:fixed
    top-4 lg:top-8
    right-4 lg:right-8
    z-40

    text-xs lg:text-sm
    text-muted-foreground
    space-y-4 lg:space-y-6
  "
      >
        {/* Language Switcher — TOP RIGHT */}
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-2 backdrop-blur-sm border border-border text font-bold">
            {lang === "en" ? (
              <span className="underline text-primary font-semibold">EN</span>
            ) : (
              <Link href="/en" className="hover:text-primary transition-colors">
                EN
              </Link>
            )}

            <span className="text-muted-foreground">/</span>

            {lang === "zh" ? (
              <span className="underline text-primary font-semibold">中文</span>
            ) : (
              <Link href="/zh" className="hover:text-primary transition-colors">
                中文
              </Link>
            )}
          </div>
        </div>
        <div
          className="bg-card/80
          rounded-2xl
    backdrop-blur-sm
    p-4 lg:p-6
    

    border border-border/50
    energetic-shadow"
        >
          {/* Status */}
          <div className="text-center lg:text-right space-y-1">
            <div className="font-bold text-primary text-sm lg:text-base">
              {dic.status.title}
            </div>
            <div className="leading-relaxed font-medium">
              {dic.status.availability}
              <br />
              {dic.status.availabilityDetail}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-right space-y-1">
            <div className="font-bold text-secondary text-sm lg:text-base">
              {dic.status.sayHi}
            </div>

            <div className="leading-relaxed underline-offset-4 font-medium">
              {isZh ? (
                <WeChatModalTrigger label={dic.status.linkedin} />
              ) : (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-primary transition-colors duration-300"
                >
                  {dic.status.linkedin}
                </a>
              )}
              ,{" "}
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-secondary transition-colors duration-300"
              >
                {dic.status.github}
              </a>
              ,
              <br />
              <a
                href={`mailto:${email}?subject=Hello&body=I want to connect with you`}
                className="underline hover:text-accent transition-colors duration-300"
                rel="noreferrer"
              >
                {dic.status.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Hero lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
