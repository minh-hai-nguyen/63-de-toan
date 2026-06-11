# Bộ Test Case — Web luyện thi 63 đề Toán

Tài liệu kiểm thử: **hiệu năng**, **chức năng** và **kiểm tra hồi quy** (các lỗi đã sửa).

## 0. Test tự động

| Lệnh | Nội dung | Yêu cầu |
|---|---|---|
| `npm test` | Kiểm thử logic chấm điểm & thống kê thể loại (6 test) | tsx (có sẵn) |
| `npm run test:perf` | Đo hiệu năng thao tác bằng Edge headless | `playwright-core` + server đang chạy (`npm start`) + đã seed |

> `test:perf` cần Microsoft Edge (mặc định có trên Windows) và server ở `http://localhost:3000`.
> Đặt `BASE_URL` để test trên domain khác (vd Render): `BASE_URL=https://... node scripts/perf-test.mjs`.

## 1. Hiệu năng (Performance)

Kết quả đo thực tế (Edge headless, bản production `npm start`):

| Mã | Hạng mục | Ngưỡng đạt | Đo được | Kết quả |
|---|---|---|---|---|
| P1 | Độ trễ **chọn đáp án** (8 câu, lúc đồng hồ chạy) | < 300 ms | TB 75 ms / max 164 ms | ✅ |
| P2 | Độ trễ **đánh dấu** + giữ trạng thái sau 6s | < 400 ms, không tự mất | 61 ms, không mất | ✅ |
| P3 | Độ trễ **nhập tự luận** | < 1000 ms | 12 ms | ✅ |
| P4 | **Nộp bài → trang kết quả** | < 4000 ms | 156 ms | ✅ |
| P5 | MathJax hiển thị xong (tham khảo) | — | ~674 ms | — |

**Cách kiểm tra tay (DevTools):**
1. Mở đề bất kỳ → F12 → tab **Performance** → Record.
2. Bấm chọn nhiều đáp án liên tiếp + vài lần đánh dấu trong ~5 giây → Stop.
3. Đạt khi: không có tác vụ (Long Task) > 300 ms khi click; con trỏ phản hồi tức thì.
4. Lưu ý: đồng hồ đếm ngược chạy mỗi giây **không** được làm câu hỏi nhấp nháy/giật.

## 2. Chức năng (Functional)

### Đăng nhập / Đăng ký
| Mã | Bước | Kỳ vọng |
|---|---|---|
| F1 | Mở `/` khi chưa đăng nhập | Chuyển ngay tới `/login` |
| F2 | Đăng nhập sai mật khẩu | Báo "Sai tên đăng nhập hoặc mật khẩu" |
| F3 | Đăng nhập `hocsinh`/`12345678` | Vào `/exams` |
| F4 | Đăng ký tài khoản mới (mật khẩu < 6 ký tự) | Báo lỗi, không tạo |
| F5 | Đăng ký hợp lệ | Về `/login?registered=1`, đăng nhập được |

### Làm bài
| Mã | Bước | Kỳ vọng |
|---|---|---|
| F6 | Mở đề 1 → trang chi tiết | Thứ tự: Cách làm + nút "Bắt đầu" ở trên, "Thể loại" ở dưới cùng |
| F7 | Bắt đầu làm bài | Đồng hồ đếm ngược chạy; danh sách 15 câu bên phải |
| F8 | Chọn đáp án câu trắc nghiệm | Ô đáp án sáng (viền xanh), navigator ô đó chuyển xanh |
| F9 | Nhập nội dung ô tự luận | Navigator ô đó chuyển xanh (tính là đã làm) |
| F10 | Bấm "Đánh dấu" 1 câu | Nút đổi "Đã đánh dấu"; navigator hiện **góc vàng** |
| F11 | Bấm "Nộp bài" | Hiện **modal** với nút "Quyết định nộp bài" / "Tiếp tục làm bài" |
| F12 | Mới làm 5/15 rồi nộp | Modal báo đúng "còn 10/15 câu chưa hoàn thành" |
| F13 | "Tiếp tục làm bài" | Đóng modal, không nộp |
| F14 | "Quyết định nộp bài" | Chuyển tới trang kết quả |
| F15 | Hết giờ | Tự động nộp bài |

### Kết quả & ôn lại
| Mã | Bước | Kỳ vọng |
|---|---|---|
| F16 | Trang kết quả | Điểm trắc nghiệm đúng; câu đúng tô xanh lá, sai tô đỏ |
| F17 | Câu tự luận ở kết quả | 2 cột song song: "Bài làm của em" \| "Hướng dẫn & lời giải" |
| F18 | Bấm "Hướng dẫn giải" / "Lời giải chi tiết" | Hiện/ẩn nội dung, công thức render đẹp |
| F19 | "Kết quả theo thể loại" | Hiển thị tỉ lệ đúng từng thể loại |

### Dashboard / Xem lại / Giáo viên
| Mã | Bước | Kỳ vọng |
|---|---|---|
| F20 | `/dashboard` | Thẻ "Số đề đã làm", "Tỉ lệ đúng TB"; **hover sáng lên** |
| F21 | Thẻ "Câu đã đánh dấu" → "Xem chi tiết" | Sang `/review`, liệt kê câu đã đánh dấu kèm đáp án |
| F22 | "Thống kê các đề đã làm" | Bảng lịch sử: đề, điểm, %, thời gian |
| F23 | Đăng nhập `gv`/`12345678` → `/teacher` | Danh sách HS, tỉ lệ đúng, thể loại yếu của lớp |
| F24 | HS mở `/teacher` | Bị chuyển hướng (không có quyền) |

## 3. Bảo mật / Hồi quy (các lỗi đã sửa)

| Mã | Kiểm tra | Kỳ vọng |
|---|---|---|
| R1 | **Lag chọn đáp án/đánh dấu** (lỗi cũ 3–5s) | Phản hồi tức thì (< 300 ms) — xem P1, P2 |
| R2 | **Đánh dấu tự mất sau ~5s** (lỗi cũ) | Giữ nguyên trạng thái — xem P2 |
| R3 | **"Có lỗi khi nộp bài" khi đủ 8 câu** (lỗi cũ) | Nộp thành công, ra trang kết quả — xem P4 |
| R4 | **Đếm sai câu chưa làm** (lỗi cũ) | Đếm đúng trên 15 câu — xem F12 |
| R5 | **Lộ đáp án khi đang làm bài** | Mở DevTools → Network/HTML màn làm bài: `correctKey`, `solution`, `hint` đều `null` |

**Cách kiểm tra R5 nhanh (terminal):**
```bash
# sau khi đăng nhập, tải HTML màn làm bài và đảm bảo không lộ đáp án
curl -s -b cookie.txt http://localhost:3000/exams/1/attempt | grep -o 'correctKey[^,]*' | sort -u
# kỳ vọng chỉ thấy:  correctKey":null
```
