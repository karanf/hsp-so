import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const lato = Lato({ 
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "HSP - SO - POC",
  description: "Proof of concept for the Student Experience for Spanish students applying through Educatius SO's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="educatius">
      <body className={`${lato.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
