/** Nối className có điều kiện (gọn, không cần thư viện ngoài). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
