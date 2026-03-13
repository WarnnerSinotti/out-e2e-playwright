import { expect, test } from "@playwright/test";

import { assertionGlobal } from "../../../assertions/global";
import { LoginPage } from "../../../pages/login";

const user: any = process.env.USUARIO;

test.describe("Login E2E", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Visitar();
  });

  test("Login com credenciais incorretas - exibe mensagem de erro", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.FazerLogin("usuarioInvalido", "senhaErrada");

    await assertionGlobal.url(page, "/login");
    await expect(loginPage.mensagemErro).toContainText(
      "Your username is invalid",
    );
  });

  test("Login com senha incorreta - exibe mensagem de erro", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.FazerLogin(user, "senhaErrada");

    await assertionGlobal.url(page, "/login");
    await expect(loginPage.mensagemErro).toContainText(
      "Your password is invalid",
    );
  });
});
