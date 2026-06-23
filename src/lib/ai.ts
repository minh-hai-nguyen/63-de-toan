import "server-only";
import type { AiMessage } from "./ai-utils";

// Tích hợp AI miễn phí qua Google Gemini (REST, gọi thẳng bằng fetch — không thêm thư viện).
// Lấy key miễn phí tại https://aistudio.google.com/apikey rồi đặt GEMINI_API_KEY trong .env.
// Đổi model qua GEMINI_MODEL (mặc định gemini-2.5-flash — có gói free).

export type { AiMessage };

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

/** Đã cấu hình key AI chưa? */
export function aiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

/** Gọi Gemini, trả về văn bản trả lời. Ném lỗi nếu chưa cấu hình / lỗi mạng. */
export async function askGemini(opts: {
  system: string;
  messages: AiMessage[];
  maxTokens?: number;
}): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("AI_NOT_CONFIGURED");

  const res = await fetch(`${ENDPOINT}/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: opts.system }] },
      contents: opts.messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: opts.maxTokens ?? 1024,
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`AI_ERROR ${res.status} ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("") ?? "";
  if (!text.trim()) throw new Error("AI_EMPTY");
  return text.trim();
}

/** Loại bỏ thẻ HTML (giữ lại $...$) để đưa nội dung gọn cho AI. */
export function stripHtml(html: string): string {
  return html
    .replace(/<img[^>]*>/gi, "[hình vẽ]")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export const TUTOR_SYSTEM = `Bạn là gia sư Toán thân thiện cho học sinh lớp 9 ôn thi tuyển sinh lớp 10 tại Việt Nam.
- Trả lời bằng tiếng Việt, ngắn gọn, rõ ràng, khích lệ.
- Ưu tiên GỢI Ý từng bước để học sinh tự suy nghĩ; chỉ trình bày lời giải đầy đủ khi học sinh yêu cầu.
- Viết công thức toán trong dấu $...$ (ví dụ $x^2-4x+3=0$).
- Nếu câu hỏi không liên quan đến học tập, lịch sự từ chối và hướng về việc ôn Toán.`;

export const ESSAY_SYSTEM = `Bạn là giáo viên Toán chấm bài tự luận cho học sinh lớp 9.
Dựa trên ĐỀ BÀI, LỜI GIẢI MẪU và BÀI LÀM của học sinh:
- Nhận xét ngắn gọn: đúng/sai ở đâu, thiếu bước nào, cách sửa.
- Giọng khích lệ, tiếng Việt; công thức để trong $...$.
- KẾT THÚC bằng đúng một dòng: "Điểm gợi ý: X/Y" (Y là thang điểm được cho, X là điểm ước lượng — chỉ mang tính tham khảo).`;
