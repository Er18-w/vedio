/**
 * POST /api/admin/login
 * 校验密码，校验通过设 HttpOnly cookie。
 * 密码从环境变量 ADMIN_PASSWORD 读取，默认 cbti2026（请尽快改）。
 */
export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD || "cbti2026";

    if (typeof password !== "string" || password !== expected) {
      return Response.json({ ok: false, error: "密码错误" }, { status: 401 });
    }

    const cookie = `cbti_admin=${expected}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict`;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    });
  } catch {
    return Response.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
}