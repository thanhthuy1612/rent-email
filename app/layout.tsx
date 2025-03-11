import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { baseOpenGraph } from "@/app/shared-metadata";

const roboto = Roboto({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rent gmail",
    default: "Rent gmail",
  },
  description: "",
  openGraph: baseOpenGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
