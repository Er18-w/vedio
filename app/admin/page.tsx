import { isAdmin } from "@/app/api/admin/logout/route";
import { getDb } from "@/db";
import { pageViews, testCompletions, shareClicks, beanDistribution } from "@/db/schema";
import { sql, desc } from "drizzle-orm";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import AdminDashboard from "./AdminDashboard";

// 豆格中文名映射（与 page.tsx 一致）
const BEAN_NAMES: Record<string, string> = {
  HOLD: "稳豆",
  LOL: "乐豆",
  OKOK: "圆豆",
  WHY: "反骨豆",
  LOAD: "慢豆",
  IMOK: "硬豆",
  IDOL: "爱豆",
  YOLO: "浪豆",
  HUGS: "暖豆",
  SUGR: "糖豆",
  RETRY: "战豆",
  SOLO: "独豆",
};

async function fetchStats() {
  const db = getDb();
  const [pv] = await db.select({ total: sql<number>`count(*)` }).from(pageViews);
  const [tc] = await db.select({ total: sql<number>`count(*)` }).from(testCompletions);
  const [sc] = await db.select({ total: sql<number>`count(*)` }).from(shareClicks);

  const today = new Date().toISOString().slice(0, 10);
  const [pvToday] = await db
    .select({ total: sql<number>`count(*)` })
    .from(pageViews)
    .where(sql`created_at LIKE ${today + "%"}`);
  const [tcToday] = await db
    .select({ total: sql<number>`count(*)` })
    .from(testCompletions)
    .where(sql`created_at LIKE ${today + "%"}`);
  const [scToday] = await db
    .select({ total: sql<number>`count(*)` })
    .from(shareClicks)
    .where(sql`created_at LIKE ${today + "%"}`);

  const dailyTrend: { date: string; visits: number; completions: number; shares: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const [pvD] = await db
      .select({ total: sql<number>`count(*)` })
      .from(pageViews)
      .where(sql`created_at LIKE ${ds + "%"}`);
    const [tcD] = await db
      .select({ total: sql<number>`count(*)` })
      .from(testCompletions)
      .where(sql`created_at LIKE ${ds + "%"}`);
    const [scD] = await db
      .select({ total: sql<number>`count(*)` })
      .from(shareClicks)
      .where(sql`created_at LIKE ${ds + "%"}`);
    dailyTrend.push({
      date: ds.slice(5),
      visits: pvD?.total ?? 0,
      completions: tcD?.total ?? 0,
      shares: scD?.total ?? 0,
    });
  }

  const beansRaw = await db.select().from(beanDistribution);
  const beanDistributionNamed = beansRaw
    .map((b) => ({
      code: b.beanCode,
      name: BEAN_NAMES[b.beanCode] ?? b.beanCode,
      count: b.count,
    }))
    .sort((a, b) => b.count - a.count);

  const recentCompletions = await db
    .select({
      createdAt: testCompletions.createdAt,
      primaryBean: testCompletions.primaryBean,
      secondaryBean: testCompletions.secondaryBean,
    })
    .from(testCompletions)
    .orderBy(desc(testCompletions.createdAt))
    .limit(20);

  return {
    totals: {
      pageViews: pv?.total ?? 0,
      testCompletions: tc?.total ?? 0,
      shareClicks: sc?.total ?? 0,
    },
    today: {
      pageViews: pvToday?.total ?? 0,
      testCompletions: tcToday?.total ?? 0,
      shareClicks: scToday?.total ?? 0,
    },
    dailyTrend,
    beanDistribution: beanDistributionNamed,
    recentCompletions: recentCompletions.map((r) => ({
      ...r,
      primaryName: BEAN_NAMES[r.primaryBean] ?? r.primaryBean,
      secondaryName: BEAN_NAMES[r.secondaryBean] ?? r.secondaryBean,
    })),
  };
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!isAdmin({ headers: { get: (n: string) => (n === "cookie" ? cookieHeader : null) } } as unknown as Request)) {
    return <LoginForm />;
  }

  let stats;
  try {
    stats = await fetchStats();
  } catch (e) {
    return (
      <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 600, margin: "0 auto" }}>
        <h1>⚠️ 数据库未就绪</h1>
        <p>看起来 Cloudflare D1 还没绑定。请：</p>
        <ol>
          <li>在 Cloudflare 控制台创建 D1 数据库</li>
          <li>把数据库 ID 配到 <code>.openai/hosting.json</code> 的 <code>d1</code> 字段</li>
          <li>执行迁移文件 <code>drizzle/0001_stats_tables.sql</code> 创建表</li>
        </ol>
        <p style={{ color: "#888", marginTop: 20, fontSize: 13 }}>错误详情: {String(e)}</p>
      </main>
    );
  }

  return <AdminDashboard stats={stats} />;
}