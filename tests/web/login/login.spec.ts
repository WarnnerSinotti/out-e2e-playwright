import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login';

const user: any = process.env.USUARIO 
const password: any = process.env.SENHA 

test.describe('Login E2E', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitar();
    });

    test('Login com credenciais corretas - redireciona para área segura', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fazerLogin(user, password);

        await expect(page).toHaveURL(/\/secure$/);
        await expect(page.locator('h2')).toContainText('Secure Area');
    });

    test('Login com credenciais incorretas - exibe mensagem de erro', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fazerLogin('usuarioInvalido', 'senhaErrada');

        await expect(page).toHaveURL(/\/login$/);
        await expect(loginPage.mensagemErro).toContainText('Your username is invalid');
    });

    test('Login com senha incorreta - exibe mensagem de erro', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fazerLogin(user, 'senhaErrada');

        await expect(page).toHaveURL(/\/login$/);
        await expect(loginPage.mensagemErro).toContainText('Your password is invalid');
    });
});
