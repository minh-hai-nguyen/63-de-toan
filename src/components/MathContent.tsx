"use client";

import { memo } from "react";
import { MathJax } from "better-react-mathjax";
import { cn } from "@/lib/cn";

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
}: {
  html: string;
  className?: string;
  /** true: giữ xuống dòng (dùng cho lời giải đã soạn sẵn). */
  solution?: boolean;
}) {
  return (
    <MathJax>
      <div
        className={cn("qcontent", solution && "qsolution", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </MathJax>
  );
}

export default memo(MathContent);
