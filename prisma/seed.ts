import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { exams } from "../data/exams";

const prisma = new PrismaClient();

async function main() {
  console.log("→ Bắt đầu seed dữ liệu...");

  // 1) Nạp đề thi (idempotent: upsert theo number, làm mới câu hỏi).
  let examCount = 0;
  let questionCount = 0;
  for (const e of exams) {
    const exam = await prisma.exam.upsert({
      where: { number: e.number },
      update: {
        title: e.title,
        durationMin: e.durationMin ?? 120,
        isPublished: e.isPublished ?? true,
      },
      create: {
        number: e.number,
        title: e.title,
        durationMin: e.durationMin ?? 120,
        isPublished: e.isPublished ?? true,
      },
    });
    examCount++;

    // Làm mới toàn bộ câu hỏi của đề này.
    await prisma.question.deleteMany({ where: { examId: exam.id } });
    for (const q of e.questions) {
      await prisma.question.create({
        data: {
          examId: exam.id,
          part: q.part,
          order: q.order,
          stem: q.stem,
          choices: q.choices ? JSON.stringify(q.choices) : null,
          correctKey: q.correctKey ?? null,
          hint: q.hint ?? null,
          solution: q.solution ?? null,
          topic: q.topic,
          difficulty: q.difficulty,
          points: q.points ?? (q.part === "MC" ? 0.25 : 1),
        },
      });
      questionCount++;
    }
  }
  console.log(`  ✓ ${examCount} đề, ${questionCount} câu hỏi.`);

  // 2) Tài khoản mẫu: 1 giáo viên + 1 học sinh demo.
  const teacherHash = await bcrypt.hash("12345678", 10);
  await prisma.user.upsert({
    where: { username: "gv" },
    update: { role: "TEACHER" },
    create: {
      username: "gv",
      passwordHash: teacherHash,
      displayName: "Cô/Thầy giáo",
      role: "TEACHER",
    },
  });

  const studentHash = await bcrypt.hash("12345678", 10);
  await prisma.user.upsert({
    where: { username: "hocsinh" },
    update: {},
    create: {
      username: "hocsinh",
      passwordHash: studentHash,
      displayName: "Học sinh Demo",
      role: "STUDENT",
      className: "9A1",
    },
  });
  console.log("  ✓ Tài khoản mẫu: gv / hocsinh (mật khẩu: 12345678)");

  console.log("→ Seed xong!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
