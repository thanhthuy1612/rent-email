import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { baseOpenGraph } from "@/constants/shared-metadata";

const roboto = Roboto({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rent email",
    default: "Rent email",
  },
  description: "",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string | undefined };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            {children}
            <Toaster />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
