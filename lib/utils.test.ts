import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("menggabungkan className", () => {
    expect(cn("rounded-lg", "p-4")).toBe("rounded-lg p-4");
  });
});
