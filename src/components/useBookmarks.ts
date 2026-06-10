"use client";

import { useCallback, useState } from "react";
import { toggleBookmarkAction } from "@/server/actions";

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
      flip(qid);
      try {
        await toggleBookmarkAction(qid);
      } catch {
        flip(qid); // revert
      }
    },
    [flip]
  );

  const has = useCallback((qid: string) => ids.has(qid), [ids]);

  return { ids, has, toggle };
}
