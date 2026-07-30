import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cbti-yunnan-bean-test.a-msalemariel1386.chatgpt.site"),
  title: "CBTI 咖啡豆型人格测试｜你是哪颗云南豆？",
  description:
    "拖动飞机、找到咖啡豆，再用 20 个生活瞬间萃取你的主人格与副风味。12 种云南豆格，约 3 分钟完成。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "CBTI 咖啡豆型人格测试",
    description: "如果性格有风味，你会是哪颗云南豆？",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "CBTI 咖啡豆型人格测试：咖啡豆搭乘飞机飞越云南高地",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CBTI 咖啡豆型人格测试",
    description: "如果性格有风味，你会是哪颗云南豆？",
    images: ["/og.png"],
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
