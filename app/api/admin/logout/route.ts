/**
 * POST /api/admin/logout
 * 清除 admin cookie。
 */
export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "cbti_admin=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
    },
  });
}

/**
 * 检查当前请求是否已登录。供 /admin 页面在服务端调用。
 */
export function isAdmin(request: Request): boolean {
  const cookie = request.headers.get("cookie") || "";
  const expected = process.env.ADMIN_PASSWORD || "cbti2026";
  return cookie.split(";").some((c) => c.trim() === `cbti_admin=${expected}`);
}