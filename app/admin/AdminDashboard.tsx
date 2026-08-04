"use client";

import { useRouter } from "next/navigation";

interface Stats {
  totals: { pageViews: number; testCompletions: number; shareClicks: number };
  today: { pageViews: number; testCompletions: number; shareClicks: number };
  dailyTrend: { date: string; visits: number; completions: number; shares: number }[];
  beanDistribution: { code: string; name: string; count: number }[];
  recentCompletions: {
    createdAt: string;
    primaryBean: string;
    secondaryBean: string;
    primaryName: string;
    secondaryName: string;
  }[];
}

// 12 种豆格配色
const BEAN_COLORS: Record<string, string> = {
  HOLD: "#51745b",
  LOL: "#e19b45",
  OKOK: "#c9896b",
  WHY: "#674f7a",
  LOAD: "#6d8490",
  IMOK: "#556171",
  IDOL: "#c88096",
  YOLO: "#df755e",
  HUGS: "#b77d59",
  SUGR: "#e4a63c",
  RETRY: "#a94f3f",
  SOLO: "#4d7476",
};

export default function AdminDashboard({ stats }: { stats: Stats }) {
  const router = useRouter();

  // 完成率（完成/访问）
  const completionRate =
    stats.totals.pageViews > 0
      ? ((stats.totals.testCompletions / stats.totals.pageViews) * 100).toFixed(1)
      : "0.0";
  const shareRate =
    stats.totals.testCompletions > 0
      ? ((stats.totals.shareClicks / stats.totals.testCompletions) * 100).toFixed(1)
      : "0.0";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#e5e5e5",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "32px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>📊 CBTI 数据后台</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>
            www.cbtidd.top · 实时统计
          </p>
        </div>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin");
            router.refresh();
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "transparent",
            color: "#aaa",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          退出
        </button>
      </header>

      {/* 数字卡片 */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="总访问量" value={stats.totals.pageViews} sub={`今日 ${stats.today.pageViews}`} color="#3b82f6" />
        <StatCard label="总完成测试" value={stats.totals.testCompletions} sub={`今日 ${stats.today.testCompletions}`} color="#10b981" />
        <StatCard label="总分享点击" value={stats.totals.shareClicks} sub={`今日 ${stats.today.shareClicks}`} color="#f59e0b" />
        <StatCard label="完成率" value={`${completionRate}%`} sub="完成/访问" color="#8b5cf6" />
        <StatCard label="分享率" value={`${shareRate}%`} sub="分享/完成" color="#ec4899" />
      </section>

      {/* 折线图：近 7 天 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>📈 近 7 天趋势</h2>
        <TrendChart data={stats.dailyTrend} />
      </section>

      {/* 豆格分布 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>🫘 豆格分布（主人格）</h2>
        {stats.beanDistribution.length === 0 ? (
          <p style={{ color: "#666", fontSize: 14 }}>暂无数据，等待用户完成测试…</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <BarChart data={stats.beanDistribution} />
            <PieChart data={stats.beanDistribution} />
          </div>
        )}
      </section>

      {/* 最近完成记录 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>🕐 最近 20 条完成记录</h2>
        {stats.recentCompletions.length === 0 ? (
          <p style={{ color: "#666", fontSize: 14 }}>暂无数据</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333" }}>
                  <th style={thStyle}>时间</th>
                  <th style={thStyle}>主人格</th>
                  <th style={thStyle}>副风味</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCompletions.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #222" }}>
                    <td style={tdStyle}>
                      {new Date(r.createdAt).toLocaleString("zh-CN", { hour12: false })}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: 12,
                          background: BEAN_COLORS[r.primaryBean] || "#666",
                          color: "#fff",
                          fontSize: 12,
                        }}
                      >
                        {r.primaryName} · {r.primaryBean}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: "#aaa" }}>
                      {r.secondaryName} · {r.secondaryBean}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
};

const h2Style: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: 18,
  fontWeight: 600,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  color: "#888",
  fontWeight: 500,
  fontSize: 13,
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
};

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: number | string;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: `4px solid ${color}`,
        borderRadius: 12,
        padding: 20,
      }}
    >
      <p style={{ margin: 0, color: "#888", fontSize: 13 }}>{label}</p>
      <p style={{ margin: "6px 0 0", fontSize: 32, fontWeight: 700, color: "#fff" }}>{value}</p>
      <p style={{ margin: "4px 0 0", color: "#666", fontSize: 12 }}>{sub}</p>
    </div>
  );
}

function TrendChart({ data }: { data: { date: string; visits: number; completions: number; shares: number }[] }) {
  const W = 1100;
  const H = 240;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxVal = Math.max(1, ...data.flatMap((d) => [d.visits, d.completions, d.shares]));
  const xStep = chartW / (data.length - 1 || 1);

  const toX = (i: number) => padL + i * xStep;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const linePath = (key: "visits" | "completions" | "shares") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d[key])}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* 网格线 */}
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <g key={p}>
          <line x1={padL} y1={padT + chartH * p} x2={W - padR} y2={padT + chartH * p} stroke="#333" strokeWidth="0.5" />
          <text x={padL - 8} y={padT + chartH * p + 4} fill="#666" fontSize="10" textAnchor="end">
            {Math.round(maxVal * (1 - p))}
          </text>
        </g>
      ))}
      {/* X 轴标签 */}
      {data.map((d, i) => (
        <text key={d.date} x={toX(i)} y={H - 10} fill="#888" fontSize="11" textAnchor="middle">
          {d.date}
        </text>
      ))}
      {/* 访问线 */}
      <path d={linePath("visits")} stroke="#3b82f6" strokeWidth="2" fill="none" />
      {data.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.visits)} r="3" fill="#3b82f6" />
      ))}
      {/* 完成线 */}
      <path d={linePath("completions")} stroke="#10b981" strokeWidth="2" fill="none" />
      {data.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.completions)} r="3" fill="#10b981" />
      ))}
      {/* 分享线 */}
      <path d={linePath("shares")} stroke="#f59e0b" strokeWidth="2" fill="none" />
      {data.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.shares)} r="3" fill="#f59e0b" />
      ))}
      {/* 图例 */}
      <g transform={`translate(${padL}, ${padT - 8})`}>
        <circle cx="0" cy="0" r="4" fill="#3b82f6" />
        <text x="10" y="4" fill="#bbb" fontSize="11">访问</text>
        <circle cx="60" cy="0" r="4" fill="#10b981" />
        <text x="70" y="4" fill="#bbb" fontSize="11">完成</text>
        <circle cx="120" cy="0" r="4" fill="#f59e0b" />
        <text x="130" y="4" fill="#bbb" fontSize="11">分享</text>
      </g>
    </svg>
  );
}

function BarChart({ data }: { data: { code: string; name: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map((d) => (
        <div key={d.code} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
          <span style={{ width: 70, color: "#aaa" }}>{d.name}</span>
          <div style={{ flex: 1, height: 22, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                width: `${(d.count / max) * 100}%`,
                height: "100%",
                background: BEAN_COLORS[d.code] || "#666",
                borderRadius: 4,
                transition: "width 0.3s",
              }}
            />
          </div>
          <span style={{ width: 40, textAlign: "right", color: "#fff", fontWeight: 600 }}>{d.count}</span>
        </div>
      ))}
    </div>
  );
}

function PieChart({ data }: { data: { code: string; name: string; count: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  if (total === 0) return null;
  const R = 100;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const segments = data
    .filter((d) => d.count > 0)
    .map((d) => {
      const len = (d.count / total) * C;
      const seg = (
        <circle
          key={d.code}
          r={R}
          cx={120}
          cy={120}
          fill="transparent"
          stroke={BEAN_COLORS[d.code] || "#666"}
          strokeWidth={40}
          strokeDasharray={`${len} ${C - len}`}
          strokeDashoffset={-offset}
          transform="rotate(-90 120 120)"
        />
      );
      offset += len;
      return seg;
    });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <svg viewBox="0 0 240 240" style={{ width: 200, height: 200 }}>
        <circle r={R} cx={120} cy={120} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth={40} />
        {segments}
        <text x="120" y="118" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700">
          {total}
        </text>
        <text x="120" y="138" textAnchor="middle" fill="#888" fontSize="11">
          总完成
        </text>
      </svg>
    </div>
  );
}