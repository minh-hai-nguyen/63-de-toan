"use client";

import { useCallback, useState } from "react";

/** Quản lý trạng thái bookmark phía client (cập nhật lạc quan, tự revert khi lỗi). */
export function useBookmarks(initial: string[]) {
  const [ids, setIds] = useState<Set<string>>(() => new Set(initial));

  const flip = useCallback(
    (qid: string) =>
      setIds((prev) => {
        const next = new Set(prev);
        if (next.has(qid)) next.delete(qid);
        else next.add(qid);
        return next;
      }),
    []
  );

  const toggle = useCallback(
    async (qid: string) => {
      flip(qid); // cập nhật ngay cho mượt
      try {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: qid }),
        });
        if (!res.ok) throw new Error("failed");
      } catch {
        flip(qid); // revert nếu lỗi
      }
    },
    [flip]
  );

  const has = useCallback((qid: string) => ids.has(qid), [ids]);

  return { ids, has, toggle };
}
