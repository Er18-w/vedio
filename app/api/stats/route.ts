import { getDb } from "@/db";
import { pageViews, testCompletions, shareClicks, beanDistribution } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

/** 上报事件类型 */
type EventType = "visit" | "complete" | "share";

interface EventPayload {
  type: EventType;
  /** complete 事件需要 */
  primaryBean?: string;
  secondaryBean?: string;
  /** share 事件需要 */
  action?: "save" | "share";
}

/** POST /api/stats/event — 前端上报事件 */
export async function POST(request: Request) {
  try {
    const body: EventPayload = await request.json();

    if (!body.type || !["visit", "complete", "share"].includes(body.type)) {
      return Response.json({ error: "Invalid event type" }, { status: 400 });
    }

    const db = getDb();
    const now = new Date().toISOString();

    switch (body.type) {
      case "visit": {
        const ua = request.headers.get("user-agent") || null;
        const ref = request.headers.get("referer") || null;
        await db.insert(pageViews).values({
          createdAt: now,
          userAgent: ua,
          referer: ref,
        });
        break;
      }

      case "complete": {
        if (!body.primaryBean || !body.secondaryBean) {
          return Response.json({ error: "Missing bean codes" }, { status: 400 });
        }
        await db.insert(testCompletions).values({
          createdAt: now,
          primaryBean: body.primaryBean,
          secondaryBean: body.secondaryBean,
        });
        // 更新豆格分布计数
        await db
          .insert(beanDistribution)
          .values({ beanCode: body.primaryBean, count: 1, updatedAt: now })
          .onConflictDoUpdate({
            target: beanDistribution.beanCode,
            set: { count: sql`${beanDistribution.count} + 1`, updatedAt: now },
          });
        break;
      }

      case "share": {
        if (!body.action || !body.primaryBean) {
          return Response.json({ error: "Missing action or bean code" }, { status: 400 });
        }
        await db.insert(shareClicks).values({
          createdAt: now,
          action: body.action,
          primaryBean: body.primaryBean,
        });
        break;
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Stats event error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

/** GET /api/stats — 查询统计数据（供你后台看） */
export async function GET() {
  try {
    const db = getDb();

    const [pv] = await db
      .select({ total: sql<number>`count(*)` })
      .from(pageViews);

    const [tc] = await db
      .select({ total: sql<number>`count(*)` })
      .from(testCompletions);

    const [sc] = await db
      .select({ total: sql<number>`count(*)` })
      .from(shareClicks);

    const beans = await db.select().from(beanDistribution);

    // 今日数据
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

    // 近 7 天每日数据
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
        date: ds.slice(5), // MM-DD
        visits: pvD?.total ?? 0,
        completions: tcD?.total ?? 0,
        shares: scD?.total ?? 0,
      });
    }

    // 最近 20 条完成记录
    const recentCompletions = await db
      .select({
        createdAt: testCompletions.createdAt,
        primaryBean: testCompletions.primaryBean,
        secondaryBean: testCompletions.secondaryBean,
      })
      .from(testCompletions)
      .orderBy(sql`created_at DESC`)
      .limit(20);

    return Response.json({
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
      beanDistribution: beans,
      recentCompletions,
    });
  } catch (err) {
    console.error("Stats query error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
