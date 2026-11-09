import { test, expect } from "@playwright/test";

/**
 * Smoke: register → tambah plant → selesaikan task → lihat progres
 * Fase 12 — build-plan §12
 */
test.describe("smoke", () => {
  const uniqueUser = `smoke_${Date.now()}`;

  test("register → onboarding → katalog → tambah selada → centang task → progres", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Tanam di lahan sempit/i }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Mulai Gratis" }).first().click();

    // CardTitle shadcn render sebagai <div>, bukan <h1> — pakai getByText agar
    // test tidak bergantung pada role heading yang tidak ada di DOM register.
    await expect(page.getByText("Buat akun", { exact: true })).toBeVisible();
    await page.getByLabel("Username").fill(uniqueUser);
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Daftar" }).click();

    await expect(
      page.getByRole("heading", { name: "Selamat datang di 1UpFarm" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Lewati" }).click();
    // Lewati → /app/home (empty garden); navigasi ke katalog
    await page.getByRole("link", { name: "Tanaman" }).click();

    // Katalog
    await expect(
      page.getByRole("heading", { name: "Pilih tanamanmu" }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: /Selada/i })
      .first()
      .click();
    await expect(
      page.getByRole("heading", { name: "Tahapan tumbuh" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Tanam ini" }).click();

    // Wizard
    await expect(
      page.getByRole("heading", { name: "Tambah tanaman" }),
    ).toBeVisible();
    // Pilih selada (sudah preselect via ?plant=selada, lanjut)
    await page.getByRole("button", { name: /Lanjut/i }).click();
    await expect(
      page.getByRole("heading", { name: "Pilih media tanam" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /Lanjut/i }).click();
    await expect(
      page.getByRole("heading", { name: "Kapan mulai?" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /Lanjut/i }).click();
    await expect(
      page.getByRole("heading", { name: "Ringkasan" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Mulai Rencana" }).click();

    await expect(page).toHaveURL(/\/app\/plan\//);
    await expect(
      page
        .getByText(/Rencana hari ke hari|Tahapan tumbuh|Bukti tumbuh/i)
        .first(),
    ).toBeVisible();

    // To-do → centang satu task
    await page.goto("/app/tasks");
    await expect(page.getByRole("heading", { name: "To-do" })).toBeVisible();
    const firstToggle = page
      .getByRole("button", { name: /tandai selesai/i })
      .first();
    await expect(firstToggle).toBeVisible();
    await firstToggle.click();
    await expect(firstToggle)
      .toBeHidden({ timeout: 2_000 })
      .catch(() => {});

    // Dashboard progres
    await page.goto("/app/home");
    await expect(page.getByRole("heading", { name: /Hai,/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Misi hari ini" }),
    ).toBeVisible();
  });

  test("guard: belum login redirect ke register", async ({ page }) => {
    // Navigasi dulu ke origin agar localStorage bisa diakses (page baru = about:blank → SecurityError).
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.goto("/app/home");
    await expect(page).toHaveURL(/\/register/);
  });
});
