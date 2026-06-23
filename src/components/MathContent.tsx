"use client";

import { memo } from "react";
import { MathJax } from "better-react-mathjax";
import { cn } from "@/lib/cn";
import { escapeHtml } from "@/lib/ai-utils";

/**
 * Hiển thị nội dung có HTML + công thức toán ($...$, $$...$$).
 * Dùng cho đề bài, đáp án và lời giải.
 *
 * Không dùng prop `dynamic`: nội dung là tĩnh nên chỉ typeset một lần khi mount.
 * (Dùng `dynamic` sẽ khiến MathJax typeset lại mỗi lần re-render — rất nặng khi
 * có đồng hồ đếm giây trên màn làm bài.)
 */
function MathContent({
  html,
  className,
  solution = false,
  escape = false,
}: {
  html: string;
  className?: string;
  /** true: giữ xuống dòng (dùng cho lời giải đã soạn sẵn). */
  solution?: boolean;
  /** true: escape HTML trước khi render (dùng cho nội dung do AI sinh ra). */
  escape?: boolean;
}) {
  const content = escape ? escapeHtml(html) : html;
  return (
    <MathJax>
      <div
        className={cn("qcontent", solution && "qsolution", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </MathJax>
  );
}

export default memo(MathContent);
