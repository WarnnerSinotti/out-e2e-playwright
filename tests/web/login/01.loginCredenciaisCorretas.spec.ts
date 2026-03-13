import { expect, test } from "@playwright/test";

import { assertionGlobal } from "../../../assertions/global";
import { LoginPage } from "../../../pages/login";

const user: any = process.env.USUARIO;
const password: any = process.env.SENHA;

test.describe("Login E2E", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Visitar();
    await assertionGlobal.url(page, "/login");
  });

  test("Login com credenciais corretas - redireciona para área segura", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.FazerLogin(user, password);

    await expect(page).toHaveURL(/\/secure$/);
    await expect(page.locator("h2")).toContainText("Secure Area");
  });
});
