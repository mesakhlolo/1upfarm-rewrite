"use client";

import { useEffect } from "react";

/** Registrasi SW hanya di production */
export function SWRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // best-effort
    });
  }, []);
  return null;
}
