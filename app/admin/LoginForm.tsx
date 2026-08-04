"use client";

export default function LoginForm() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <form
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: 40,
          width: 320,
          color: "#fff",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: fd.get("password") }),
          });
          if (res.ok) {
            window.location.href = "/admin";
          } else {
            const data = await res.json().catch(() => ({}));
            alert((data as { error?: string }).error || "登录失败");
          }
        }}
      >
        <h1 style={{ margin: "0 0 8px", fontSize: 24 }}>🔒 CBTI 数据后台</h1>
        <p style={{ margin: "0 0 24px", color: "#aaa", fontSize: 14 }}>请输入管理员密码</p>
        <input
          name="password"
          type="password"
          placeholder="密码"
          required
          autoFocus
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.3)",
            color: "#fff",
            fontSize: 16,
            boxSizing: "border-box",
            marginBottom: 16,
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            border: "none",
            background: "#d97706",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          登录
        </button>
        <p style={{ marginTop: 16, fontSize: 12, color: "#666", textAlign: "center" }}>
          默认密码 cbti2026，请尽快修改
        </p>
      </form>
    </main>
  );
}