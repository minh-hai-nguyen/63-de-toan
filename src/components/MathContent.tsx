"use client";

import { MathJax } from "better-react-mathjax";
import { cn } from "@/lib/cn";

/**
 * Hiển thị nội dung có HTML + công thức toán ($...$, $$...$$).
 * Dùng cho đề bài, đáp án và lời giải.
 */
export default function MathContent({
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
    <MathJax dynamic>
      <div
        className={cn("qcontent", solution && "qsolution", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </MathJax>
  );
}
