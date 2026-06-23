// Đo hiệu năng thao tác trên màn làm bài bằng trình duyệt thật (Edge headless).
//
// Cách chạy:
//   1) npm run dev            (chạy server ở cổng 3000)
//   2) npm i -D playwright-core   (nếu chưa có)
//   3) node scripts/perf-test.mjs
//
// Yêu cầu: đã seed dữ liệu (tài khoản hocsinh / 12345678, đề số 1).

import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const PASS = { answerClickMs: 300, bookmarkMs: 400, submitMs: 4000 };

const log = (m) => console.log(m);
const ok = (c) => (c ? "✅ ĐẠT" : "❌ KHÔNG ĐẠT");

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
const results = [];

try {
  // 1) Đăng nhập
  await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
  await page.fill('input[name="username"]', "hocsinh");
  await page.fill('input[name="password"]', "12345678");
  await Promise.all([
    page.waitForURL("**/exams", { timeout: 15000 }),
    page.click('button[type="submit"]'),
  ]);
  log("Đăng nhập: OK");

  // 2) Mở màn làm bài + đo thời gian MathJax render xong
  const tNav = Date.now();
  await page.goto(`${BASE}/exams/1/attempt`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("mjx-container", { timeout: 20000 });
  const mathMs = Date.now() - tNav;
  log(`\n⏱  MathJax hiển thị xong sau: ${mathMs} ms (thông tin)`);

  // Để đồng hồ đếm ngược chạy vài giây — kịch bản dễ gây lag nhất ở bản cũ
  await page.waitForTimeout(3000);

  // 3) Đo độ trễ chọn đáp án cho 8 câu trắc nghiệm (click giữa lúc timer chạy)
  const latencies = [];
  for (let i = 1; i <= 8; i++) {
    const choice = page
      .locator(`#cau-${i} button`)
      .filter({ hasNotText: "Đánh dấu" })
      .first();
    const handle = await choice.elementHandle();
    const t0 = Date.now();
    await choice.click();
    await page.waitForFunction(
      (el) => el.className.includes("ring-indigo"),
      handle,
      { timeout: 5000 }
    );
    latencies.push(Date.now() - t0);
  }
  const max = Math.max(...latencies);
  const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
  log(`\n🖱  Chọn đáp án (8 câu): trung bình ${avg} ms, lớn nhất ${max} ms`);
  log(`   ${ok(max < PASS.answerClickMs)} (ngưỡng < ${PASS.answerClickMs} ms)`);
  results.push(max < PASS.answerClickMs);

  // 4) Đo đánh dấu (độc lập trạng thái ban đầu) + kiểm tra KHÔNG tự đổi sau 6 giây
  const bmBtn = page
    .locator(`#cau-9 button`)
    .filter({ hasText: "Đánh dấu" })
    .first();
  const before = (await bmBtn.textContent()) || "";
  const wasMarked = before.includes("Đã đánh dấu");
  const t1 = Date.now();
  await bmBtn.click();
  // chờ nhãn lật sang trạng thái ngược lại
  await page.waitForFunction(
    (was) => {
      const b = [...document.querySelectorAll("#cau-9 button")].find((x) =>
        x.textContent.includes("🔖")
      );
      return !!b && b.textContent.includes("Đã đánh dấu") === !was;
    },
    wasMarked,
    { timeout: 5000 }
  );
  const bmMs = Date.now() - t1;
  await page.waitForTimeout(6000);
  const stable = await page.evaluate((was) => {
    const b = [...document.querySelectorAll("#cau-9 button")].find((x) =>
      x.textContent.includes("🔖")
    );
    return !!b && b.textContent.includes("Đã đánh dấu") === !was;
  }, wasMarked);
  log(`\n🔖 Đánh dấu: ${bmMs} ms · giữ nguyên trạng thái mới sau 6s: ${stable ? "CÓ" : "KHÔNG"}`);
  log(`   ${ok(bmMs < PASS.bookmarkMs && stable)} (ngưỡng < ${PASS.bookmarkMs} ms & không tự đổi)`);
  results.push(bmMs < PASS.bookmarkMs && stable);

  // 5) Nhập tự luận nhanh (đo phản hồi gõ phím)
  const ta = page.locator(`#cau-9 textarea`);
  const t2 = Date.now();
  await ta.fill("Thử nhập bài làm tự luận để kiểm tra độ mượt.");
  const typeMs = Date.now() - t2;
  log(`\n⌨  Nhập tự luận: ${typeMs} ms ${ok(typeMs < 1000)}`);
  results.push(typeMs < 1000);

  // 6) Nộp bài qua modal → tới trang kết quả
  const t3 = Date.now();
  await page.locator('button:has-text("Nộp bài")').first().click();
  await page.locator('button:has-text("Quyết định nộp bài")').click();
  await page.waitForURL("**/result/**", { timeout: 15000 });
  const submitMs = Date.now() - t3;
  log(`\n📤 Nộp bài → trang kết quả: ${submitMs} ms`);
  log(`   ${ok(submitMs < PASS.submitMs)} (ngưỡng < ${PASS.submitMs} ms)`);
  results.push(submitMs < PASS.submitMs);

  // 7) Trang kết quả có điểm + xem song song
  await page.waitForSelector("text=Bài làm của em", { timeout: 10000 });
  log("\n📄 Trang kết quả hiển thị 'Bài làm của em' (xem song song): ✅");

  const allPass = results.every(Boolean);
  log(`\n${"=".repeat(40)}\nKẾT QUẢ: ${allPass ? "✅ TẤT CẢ ĐẠT" : "❌ CÓ MỤC KHÔNG ĐẠT"}\n${"=".repeat(40)}`);
  process.exitCode = allPass ? 0 : 1;
} catch (e) {
  console.error("Lỗi khi chạy test:", e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
