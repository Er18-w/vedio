import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the interactive CBTI opening", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CBTI 咖啡豆型人格测试｜你是哪颗云南豆？<\/title>/i);
  assert.match(html, /咖啡豆型/);
  assert.match(html, /人格测试/);
  assert.match(html, /把“丝绸号”拉出云端/);
  assert.match(html, /\/media\/cbti-story-continuous\.mp4/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("keeps all questions, page-turn flow, and normalized scoring in source", async () => {
  const page = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );

  assert.equal((page.match(/\n    scene:/g) ?? []).length, 20);
  assert.match(page, /const maxScore: Record<BeanCode, number>/);
  assert.match(page, /HOLD:\s*23/);
  assert.match(page, /OKOK:\s*17/);
  assert.match(page, /RETRY:\s*21/);
  assert.match(page, /topTwo\[0\]\.score - topTwo\[1\]\.score < 5/);
  assert.match(page, /page-leave/);
  assert.match(page, /这颗豆不想掉——把它往下拽/);
  assert.match(page, /打开我的豆格报告/);
  assert.match(page, /展开完整解释/);
  assert.match(page, /whyCoffee/);
  assert.match(page, /K72通常指累计约72小时/);
  assert.match(page, /你的性格配方/);
  assert.match(page, /YOUR YUNNAN FLAVOR/);
  assert.doesNotMatch(page, /scrollIntoView/);
});
