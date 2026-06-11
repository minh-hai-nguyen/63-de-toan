// Kiểm thử logic chấm điểm & thống kê (không cần framework).
// Chạy:  npx tsx scripts/test-scoring.ts
import assert from "node:assert/strict";
import {
  gradeMultipleChoice,
  aggregateTopicStats,
  type GradeQuestion,
} from "../src/lib/scoring";

let passed = 0;
const test = (name: string, fn: () => void) => {
  fn();
  passed++;
  console.log("  ✓ " + name);
};

const mc = (id: string, correctKey: string, topic = "T"): GradeQuestion => ({
  id,
  part: "MC",
  correctKey,
  points: 0.25,
  topic,
});

console.log("CHẤM ĐIỂM TRẮC NGHIỆM");

test("Đúng hết 8 câu → 2.0/2.0", () => {
  const qs = Array.from({ length: 8 }, (_, i) => mc("q" + i, "A"));
  const ans = Object.fromEntries(qs.map((q) => [q.id, "A"]));
  const r = gradeMultipleChoice(qs, ans);
  assert.equal(r.mcScore, 2);
  assert.equal(r.mcMax, 2);
});

test("Đúng 6, sai 2 → 1.5/2.0", () => {
  const qs = Array.from({ length: 8 }, (_, i) => mc("q" + i, "A"));
  const ans = Object.fromEntries(
    qs.map((q, i) => [q.id, i < 6 ? "A" : "B"])
  );
  const r = gradeMultipleChoice(qs, ans);
  assert.equal(r.mcScore, 1.5);
});

test("Bỏ trống không tính điểm & isCorrect=false", () => {
  const qs = [mc("q1", "A")];
  const r = gradeMultipleChoice(qs, {});
  assert.equal(r.mcScore, 0);
  assert.equal(r.details[0].isCorrect, false);
  assert.equal(r.details[0].selectedKey, null);
});

test("Câu tự luận không tính vào mcMax", () => {
  const qs: GradeQuestion[] = [
    mc("q1", "A"),
    { id: "e1", part: "ESSAY", correctKey: null, points: 1.5, topic: "T" },
  ];
  const r = gradeMultipleChoice(qs, { q1: "A" });
  assert.equal(r.mcMax, 0.25);
  assert.equal(r.details.length, 1); // chỉ MC
});

console.log("\nTHỐNG KÊ THEO THỂ LOẠI");

test("Tỉ lệ đúng theo thể loại + sắp xếp yếu→mạnh", () => {
  const rows = [
    { topic: "DAI_SO", isCorrect: true },
    { topic: "DAI_SO", isCorrect: false },
    { topic: "HINH", isCorrect: false },
  ];
  const stats = aggregateTopicStats(rows);
  assert.equal(stats[0].topic, "HINH"); // yếu nhất trước
  assert.equal(stats[0].accuracy, 0);
  const daiso = stats.find((s) => s.topic === "DAI_SO")!;
  assert.equal(daiso.accuracy, 0.5);
  assert.equal(daiso.correct, 1);
  assert.equal(daiso.total, 2);
});

test("Bỏ qua câu chưa chấm (isCorrect=null)", () => {
  const stats = aggregateTopicStats([{ topic: "X", isCorrect: null }]);
  assert.equal(stats.length, 0);
});

console.log(`\n✅ ${passed} test ĐẠT`);
