# out-e2e-playwright

Neste projeto, exploramos testes automatizados de **API** e **E2E (end-to-end)** usando o framework **Playwright**. A missão é garantir que as aplicações web e APIs estejam funcionando corretamente, com cenários de login, fluxos críticos e validações de endpoints REST.

O poderoso framework **Playwright** permite realizar testes rápidos, confiáveis e cross-browser, simulando interações reais de usuários e chamadas de API.

---

## 🚀 Framework Playwright

O **Playwright** é uma ferramenta de código aberto, moderna e poderosa para automação de testes. Ideal para testes E2E em aplicações web e testes de API REST. Oferece execução paralela, geração de relatórios, screenshots em falhas e suporte a múltiplos navegadores.

### Tipos de Testes Realizados

-   **🧪 Testes de API:** Validação de endpoints REST (GET, POST, PUT, DELETE) com verificação de status HTTP, estrutura de resposta e dados retornados.
-   **🖥️ Testes E2E:** Simulação de interações reais do usuário em aplicações web, como login, navegação e validação de fluxos completos.

---

## 📦 Configuração do Projeto

### Pré-requisitos

-   **Node.js**: Para rodar o projeto, é necessário ter o [Node.js](https://nodejs.org/en/) (de preferência, versão LTS 20.x).
-   **Git**: Utilizamos o [Git](https://git-scm.com/) para controle de versão. Recomendamos o uso do [GitHub Desktop](https://desktop.github.com/).
-   **Editor de Código**: Recomendamos o uso do [Visual Studio Code](https://code.visualstudio.com/) (VS Code) ou [Cursor](https://cursor.com/), com as extensões sugeridas abaixo.

### 1. Instalação do Playwright

O Playwright é instalado como dependência do projeto. Após o `npm install`, os navegadores são instalados automaticamente. Se precisar reinstalar:

```bash
npx playwright install
```

---

### 2. Extensões Recomendadas para o VS Code 🔌

-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
-   [Git Extension Pack](https://marketplace.visualstudio.com/items?itemName=donjayamanne.git-extension-pack)
-   [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

### 3. Instalação das Dependências 📥

Execute na raiz do projeto:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

---

### 4. Configuração das Variáveis de Ambiente ⚙️

Crie um arquivo `.env` na raiz do projeto com base no `.envExample`:

```bash
cp .envExample .env
```

Edite o `.env` e configure as variáveis conforme necessário:

---

### 5. Executando os Testes ▶️

**Comandos disponíveis:**

```bash
# Rodar todos os testes (API + E2E em sequência)
npm run test

# Rodar apenas testes de API
npm run playwright:api

# Rodar apenas testes E2E (login, fluxos web)
npm run playwright:e2e

# Abrir interface gráfica do Playwright
npm run playwright:open

# Gerar e visualizar relatório HTML após os testes
npm run playwright:Report
```

**Como visualizar o relatório HTML:**

1. Após executar `npm run test` ou `npm run playwright:test`, gere o relatório:
   ```bash
   npm run playwright:Report
   ```
2. O relatório será aberto no navegador com detalhes de cada teste, screenshots em falhas e traces.

**No pipeline CI:** após a execução, baixe o artefato `playwright-api-report` ou `playwright-e2e-report` no GitHub Actions e abra o `index.html` no navegador.

---

### Pipeline CI/CD (GitHub Actions)

| Workflow       | Descrição                                  |
|----------------|--------------------------------------------|
| `playwright.yml` | Rodar **apenas** testes API + E2E          |

**Quando rodar só API + E2E:** use o workflow **Playwright API + E2E** neste repositório (workflow_dispatch, push ou PR na main).

**Pipeline completo (API → E2E → K6):** rodar no repositório [out-test-pipeline](https://github.com/SEU_ORG/out-test-pipeline).

---

## Prefixos de Commit

| Prefixo  | Significado                                      |
| -------- | ------------------------------------------------ |
| feat     | Nova funcionalidade de teste                     |
| fix      | Correção de quebra de id ou test-id              |
| docs     | Alterações em documentação                       |
| config   | Alterações na configuração do Playwright        |
| refactor | Refatoração de código, sem nova funcionalidade   |

---

## 📜 Licença

-   Este projeto é público, com o objetivo de compartilhar conhecimento e promover estudos.
-   O uso do projeto é de responsabilidade do usuário.
-   Todos os recursos utilizados são gratuitos e adequados para uso livre.

### 💻 QA Engineer

-   Desenvolvido por **Warnner**
