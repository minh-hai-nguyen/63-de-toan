"use client";

import { useEffect, useRef, useState } from "react";
import MathContent from "@/components/MathContent";
import { cn } from "@/lib/cn";

type Msg = { role: "user" | "model"; text: string };

const GREETING: Msg = {
  role: "model",
  text: "Chào em! Mình là trợ lý Toán. Em đang vướng câu nào hay khái niệm gì, cứ hỏi nhé 😊",
};

export default function AiTutor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "model",
          text: res.ok
            ? data.reply
            : data.error || "Xin lỗi, hiện chưa trả lời được.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "model", text: "Lỗi kết nối, em thử lại nhé." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Nút nổi */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
      >
        {open ? "✕ Đóng" : "🤖 Hỏi AI"}
      </button>

      {/* Bảng chat */}
      {open && (
        <div className="fixed bottom-20 right-5 z-40 flex h-[70vh] max-h-[560px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 bg-indigo-600 px-4 py-3 text-white">
            <p className="font-semibold">Trợ lý Toán AI</p>
            <p className="text-xs text-indigo-100">
              Trao đổi kiến thức, hỏi cách làm bài
            </p>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                  m.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-800"
                )}
              >
                {m.role === "model" ? (
                  <MathContent html={m.text} />
                ) : (
                  <span className="whitespace-pre-line">{m.text}</span>
                )}
              </div>
            ))}
            {loading && (
              <div className="w-fit rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-400">
                Đang soạn câu trả lời…
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 p-2">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={1}
                placeholder="Nhập câu hỏi… (Enter để gửi)"
                className="max-h-28 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
