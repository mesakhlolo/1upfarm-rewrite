/**
 * Hash password mock untuk auth lokal — master-plan §3.
 * SHA-256 via WebCrypto (bukan bcrypt — backend nyata Fase 13+).
 * Fallback FNV-1a bila WebCrypto tidak tersedia (mis. non-secure context di test).
 */

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  try {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const digest = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {
    // jatuh ke fallback di bawah
  }
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < password.length; i++) {
    const c = password.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619);
    h2 = Math.imul(h2 + c, 16777619);
  }
  return `fnv-${h1.toString(16)}-${h2.toString(16)}`;
}
