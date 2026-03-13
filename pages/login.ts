import { type Page } from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) {}

    get inputUsername() {
        return this.page.locator('#username');
    }

    get inputPassword() {
        return this.page.locator('#password');
    }

    get btnLogin() {
        return this.page.locator('button[type="submit"]');
    }

    get mensagemErro() {
        return this.page.locator('#flash');
    }

    async visitar() {
        await this.page.goto('/login');
    }

    async preencherUsuario(usuario: string) {
        await this.inputUsername.fill(usuario);
    }

    async preencherSenha(senha: string) {
        await this.inputPassword.fill(senha);
    }

    async clicarEmLogin() {
        await this.btnLogin.click();
    }

    async fazerLogin(usuario: string, senha: string) {
        await this.preencherUsuario(usuario);
        await this.preencherSenha(senha);
        await this.clicarEmLogin();
    }
}
