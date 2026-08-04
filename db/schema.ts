import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * 页面访问记录
 * 每次有人打开网站就插入一行
 */
export const pageViews = sqliteTable("page_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(), // ISO 8601 时间戳
  userAgent: text("user_agent"),           // 浏览器信息
  referer: text("referer"),               // 来源页面
});

/**
 * 测试完成记录
 * 每次有人做完 20 题 + 得出结果就插入一行
 */
export const testCompletions = sqliteTable("test_completions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(),
  primaryBean: text("primary_bean").notNull(),  // 主人格豆格代码，如 "HOLD"
  secondaryBean: text("secondary_bean").notNull(), // 副风味豆格代码
});

/**
 * 分享点击记录
 * 每次有人点「保存结果页」或「分享」按钮就插入一行
 */
export const shareClicks = sqliteTable("share_clicks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(),
  action: text("action").notNull(), // "save" | "share"
  primaryBean: text("primary_bean").notNull(),
});

/**
 * 豆格分布汇总表
 * 每次测试完成时更新对应豆格的计数
 */
export const beanDistribution = sqliteTable("bean_distribution", {
  beanCode: text("bean_code").primaryKey(), // 豆格代码，如 "HOLD"
  count: integer("count").notNull().default(0), // 被测出的次数
  updatedAt: text("updated_at").notNull(),
});
