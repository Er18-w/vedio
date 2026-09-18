import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("builds the interactive CBTI opening", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>CBTI 豆格测试｜人格如何在杯中形成<\/title>/i);
  assert.match(html, /咖啡豆型/);
  assert.match(html, /人格测试/);
  assert.match(html, /开始萃取我的豆格/);
  assert.match(html, /assets\/home-hero-original\.mp4/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("keeps all questions, page-turn flow, and normalized scoring in source", async () => {
  const client = await readFile(new URL("../app.js", import.meta.url), "utf8");

  assert.equal((client.match(/"scene": "第\d+题"/g) ?? []).length, 12);
  assert.match(client, /const SCORING_BASELINE/);
  assert.match(client, /HOLD: \{ max: 5, base: 1\.67 \}/);
  assert.match(client, /correctedIndex/);
  assert.match(client, /scheduleAutoAdvance/);
  assert.match(client, /calculateResult/);
  assert.match(client, /renderResult/);
});

test("ships all CBTI identity cards and the save/share flow", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const client = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const cardFiles = (await readdir(new URL("../assets/share-cards/", import.meta.url)))
    .filter((file) => file.endsWith(".jpg"))
    .sort();
  const expectedCodes = ["HOLD", "HUGS", "IDOL", "IMOK", "LOAD", "LOL", "OKOK", "RETRY", "SOLO", "SUGR", "WHY", "YOLO"];

  assert.deepEqual(cardFiles, expectedCodes.map((code) => `${code}.jpg`).sort());
  assert.match(html, /id="share-card-modal"/);
  assert.match(html, /data-action="download-share-card"/);
  assert.match(html, /data-action="share-card"/);
  assert.match(html, /data-action="share-moments"/);
  assert.match(html, /id="share-photo-sheet"/);
  assert.match(html, /assets\/shanyuyunchuan-logo\.webp/);
  assert.match(html, /山屿云川<\/strong>特约推荐饮品/);
  assert.match(client, /"drinkMatch":/);
  assert.match(client, /navigator\.share/);
  assert.match(client, /MicroMessenger/);
  assert.match(client, /files: \[file\]/);
  assert.match(client, /openPhotoGuide\("moments"\)/);
  for (const code of expectedCodes) {
    assert.match(client, new RegExp(`${code}: "assets/share-cards/${code}\\.jpg"`));
  }
});
