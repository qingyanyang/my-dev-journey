import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getPreferredLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Array.from(i18n.locales);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, i18n.locales, i18n.defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;

  // Check if pathname already has a locale prefix: "/en" or "/zh"
  const hasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If locale is missing → redirect to preferred locale
  if (!hasLocale) {
    const locale = getPreferredLocale(request);

    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);

    // preserve query params
    if (search) redirectUrl.search = search;

    // preserve hash (#timetable)
    if (hash) redirectUrl.hash = hash;

    return NextResponse.redirect(redirectUrl);
  }

  // Already has locale — continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.swa/health).*)"],
};
