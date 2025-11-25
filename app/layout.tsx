import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Git-Fit - 개발자 역량, 깃허브에서 찾고 커리어 매칭까지",
  description: "Git-Fit으로 당신의 진짜 실력을 증명하고 최고의 기업에 지원하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ zoom: 0.85 }}
      >
        {children}
      </body>
    </html>
  );
}
