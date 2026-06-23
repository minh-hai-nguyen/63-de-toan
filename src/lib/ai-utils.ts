// Tiện ích thuần cho AI — KHÔNG có I/O, dùng được cả server lẫn client (và test bằng tsx).

export type AiMessage = { role: "user" | "model"; text: string };

/**
 * Chuẩn hoá lịch sử chat trước khi gửi Gemini:
 * - map về {role, text}; cắt 12 lượt gần nhất; bỏ tin rỗng;
 * - BỎ các tin 'model' ở ĐẦU (vd lời chào của giao diện) vì Gemini yêu cầu
 *   hội thoại bắt đầu bằng vai 'user'.
 */
export function normalizeChatMessages(raw: unknown): AiMessage[] {
  const arr = Array.isArray(raw) ? raw : [];
  let msgs: AiMessage[] = arr
    .slice(-12)
    .map((m): AiMessage => {
      const o = (m ?? {}) as { role?: string; text?: string; content?: string };
      return {
        role: o.role === "model" ? "model" : "user",
        text: String(o.text ?? o.content ?? "").slice(0, 4000),
      };
    })
    .filter((m) => m.text.trim().length > 0);

  while (msgs.length > 0 && msgs[0].role === "model") msgs = msgs.slice(1);
  return msgs;
}

/** Escape ký tự HTML (vẫn giữ $...$ cho MathJax). Dùng khi hiển thị nội dung do AI sinh ra. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
