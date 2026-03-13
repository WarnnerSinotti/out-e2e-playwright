import { type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  get inputUsername() {
    return this.page.locator("#username");
  }

  get inputPassword() {
    return this.page.locator("#password");
  }

  get btnLogin() {
    return this.page.locator('button[type="submit"]');
  }

  get mensagemErro() {
    return this.page.locator("#flash");
  }

  async Visitar() {
    await this.page.goto("/login");
  }

  async PreencherUsuario(usuario: string) {
    await this.inputUsername.fill(usuario);
  }

  async PreencherSenha(senha: string) {
    await this.inputPassword.fill(senha);
  }

  async ClicarEmLogin() {
    await this.btnLogin.click();
  }

  async FazerLogin(usuario: string, senha: string) {
    await this.PreencherUsuario(usuario);
    await this.PreencherSenha(senha);
    await this.ClicarEmLogin();
  }
}
