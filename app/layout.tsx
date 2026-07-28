import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBTI 人格测试｜你是哪颗云南咖啡豆？",
  description: "20 个生活现场，12 种云南咖啡豆人格。完成测试，发现你的主人格与副风味。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
