/**
 * Kompresi foto bukti tumbuh — photo-checkpoint-spec.md §4.
 * Resize sisi terpanjang ≤ 800px, JPEG 0.7, target ≤ 120KB.
 * Fallback: bila canvas gagal, kembalikan dataURL asli.
 */

export async function compressPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca foto"));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Jika bukan image, kembalikan apa adanya
      if (!dataUrl.startsWith("data:image")) {
        resolve(dataUrl);
        return;
      }
      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        try {
          const maxEdge = 800;
          const { width, height } = img;
          const ratio = Math.min(1, maxEdge / Math.max(width, height));
          const w = Math.round(width * ratio);
          const h = Math.round(height * ratio);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(dataUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, w, h);
          const out = canvas.toDataURL("image/jpeg", 0.7);
          resolve(out);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
