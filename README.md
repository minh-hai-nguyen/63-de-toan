# Luyện thi Toán — 63 đề tuyển sinh lớp 10

Web động giúp học sinh **ôn luyện 63 đề thi Toán**, có tài khoản, chấm điểm trắc
nghiệm tự động, lời giải tự luận, theo dõi tiến bộ và **phát hiện thể loại còn yếu**.

## Tính năng

- 🔐 **Tài khoản 2 vai trò**: Học sinh (tự đăng ký) & Giáo viên.
- 📝 **Làm bài**: trắc nghiệm chấm điểm tự động; tự luận có nút ẩn/hiện lời giải (công thức render bằng MathJax).
- ⏱️ **Đồng hồ đếm ngược**, tự nộp khi hết giờ.
- 🧭 **Bảng điều hướng câu hỏi**: thấy ngay câu đã/chưa trả lời.
- 🔖 **Đánh dấu câu để xem lại** — tổng hợp ở trang “Xem lại”.
- 🏷️ Mỗi câu gắn **thể loại** + **độ khó**.
- 📊 **Thống kê theo thể loại**: học sinh biết mình yếu phần nào; giáo viên xem cả lớp & từng học sinh.

## Công nghệ

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma 6 · Auth.js v5 ·
MathJax (better-react-mathjax). Dev dùng **SQLite**, deploy khuyến nghị **PostgreSQL (Neon) + Vercel**.

## Chạy thử ở máy (local)

```bash
npm install
cp .env.example .env          # tạo file .env (Windows: copy .env.example .env)
npx prisma migrate deploy     # tạo bảng cho SQLite
npm run db:seed               # nạp Đề 01, 02 + tài khoản mẫu
npm run dev                   # http://localhost:3000
```

**Tài khoản mẫu** (mật khẩu `12345678`): `gv` (giáo viên), `hocsinh` (học sinh).
Học sinh mới có thể tự đăng ký tại `/register`.

## Cấu trúc thư mục

```
data/exams/        Nội dung đề (de-01.ts, de-02.ts, de-template.ts, index.ts)
prisma/            schema.prisma, seed.ts, migrations
src/
  app/             Trang & route (App Router)
  components/      UI dùng chung, QuestionView, AttemptClient, ...
  lib/             config, taxonomy, scoring, types (thuần, không I/O)
  server/
    services/      Lớp truy cập dữ liệu (exam, attempt, analytics, user, bookmark)
    actions.ts     Server Actions (đăng nhập, đăng ký, nộp bài, bookmark)
  auth.ts          Cấu hình Auth.js
```

> Kiến trúc phân lớp: trang gọi **service**, không truy vấn Prisma trực tiếp;
> hằng số gom ở `src/lib/config.ts`; UI cơ bản gom ở `src/components/ui.tsx`.
> Sửa về sau chỉ chạm 1–2 file.

## Thêm đề mới (đến 63 đề)

1. Copy `data/exams/de-template.ts` → `de-03.ts`, điền nội dung (xem hướng dẫn trong file).
2. Mở `data/exams/index.ts`, import và thêm vào mảng `filled`.
3. Chạy lại `npm run db:seed`.

Quy ước toán: inline `$...$`, khối `$$...$$`; dùng `String.raw` để khỏi nhân đôi `\`.
Mã thể loại & độ khó xem `src/lib/taxonomy.ts`.

## Triển khai online (Vercel + Neon)

1. Tạo database PostgreSQL miễn phí ở [Neon](https://neon.tech), lấy connection string.
2. Trong `prisma/schema.prisma`, đổi `provider = "sqlite"` → `"postgresql"`.
3. Push code lên GitHub, import vào [Vercel](https://vercel.com).
4. Đặt biến môi trường trên Vercel: `DATABASE_URL` (Neon), `AUTH_SECRET`, `AUTH_URL` (domain).
5. Chạy migrate + seed lên DB prod:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

## Ghi chú

- Hiện đã nhập đầy đủ **Đề 01 & 02**; các đề còn lại hiển thị “Đang cập nhật” cho tới khi thêm nội dung.
- Phần tự luận không chấm tự động (đối chiếu lời giải); thống kê thể loại dựa trên phần trắc nghiệm.
