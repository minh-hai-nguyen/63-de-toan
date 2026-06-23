// Kiểm thử tiện ích AI (chuẩn hoá hội thoại + escape HTML).
// Chạy:  npx tsx scripts/test-ai.ts
import assert from "node:assert/strict";
import { normalizeChatMessages, escapeHtml } from "../src/lib/ai-utils";

let passed = 0;
const test = (name: string, fn: () => void) => {
  fn();
  passed++;
  console.log("  ✓ " + name);
};

console.log("CHUẨN HOÁ HỘI THOẠI GEMINI");

test("Bỏ lời chào (model) ở đầu → bắt đầu bằng user", () => {
  const out = normalizeChatMessages([
    { role: "model", text: "Chào em!" },
    { role: "user", text: "1+1=?" },
  ]);
  assert.equal(out.length, 1);
  assert.equal(out[0].role, "user");
  assert.equal(out[0].text, "1+1=?");
});

test("Nhiều tin model liên tiếp ở đầu đều bị bỏ", () => {
  const out = normalizeChatMessages([
    { role: "model", text: "a" },
    { role: "model", text: "b" },
    { role: "user", text: "hỏi" },
    { role: "model", text: "đáp" },
    { role: "user", text: "hỏi tiếp" },
  ]);
  assert.equal(out[0].role, "user");
  assert.equal(out[0].text, "hỏi");
  assert.equal(out[out.length - 1].role, "user");
});

test("Map field content→text và mặc định role=user", () => {
  const out = normalizeChatMessages([{ content: "xin chào" }]);
  assert.equal(out[0].role, "user");
  assert.equal(out[0].text, "xin chào");
});

test("Bỏ tin rỗng/khoảng trắng", () => {
  const out = normalizeChatMessages([
    { role: "user", text: "   " },
    { role: "user", text: "ok" },
  ]);
  assert.equal(out.length, 1);
  assert.equal(out[0].text, "ok");
});

test("Cắt còn tối đa 12 lượt gần nhất", () => {
  const many = Array.from({ length: 20 }, (_, i) => ({
    role: "user",
    text: "m" + i,
  }));
  const out = normalizeChatMessages(many);
  assert.ok(out.length <= 12);
  assert.equal(out[out.length - 1].text, "m19");
});

test("Đầu vào không hợp lệ → mảng rỗng", () => {
  assert.deepEqual(normalizeChatMessages(null), []);
  assert.deepEqual(normalizeChatMessages("abc"), []);
  assert.deepEqual(normalizeChatMessages([{ role: "model", text: "chỉ chào" }]), []);
});

console.log("\nESCAPE HTML (chống XSS output AI)");

test("Escape thẻ HTML, giữ nguyên $...$", () => {
  assert.equal(
    escapeHtml('<script>alert(1)</script> $x^2$'),
    "&lt;script&gt;alert(1)&lt;/script&gt; $x^2$"
  );
  assert.equal(escapeHtml("a & b"), "a &amp; b");
});

console.log(`\n✅ ${passed} test ĐẠT`);
