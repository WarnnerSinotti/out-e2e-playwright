# Pipeline: Completo (Playwright → K6 → WebdriverIO)

## Ordem de execução
1. **out-e2e-playwright** — E2E + testes integrados (Playwright)
2. **out-performance-k6** — Testes de performance (K6)
3. **out-e2e-webdriverIO** — Testes mobile (WebdriverIO) - Desenvolvido testes mas não inserido no pipeline

## Onde o pipeline está

O arquivo `pipeline.yml` que está em **out-e2e-playwright**. Executa todos os testes:
- API   - Integrated Test
- E2E   - E2E Test
- K6    - Performance Test

## Repositórios necessários

Os 3 repositórios estao na mesma organização:
- `/out-e2e-playwright`
- `/out-performance-k6`
- `/out-e2e-webdriverIO`

## Relatorios por projeto

| Projeto | Comando de teste | Caminho dos artifacts |
|---------|------------------|------------------------|
| Playwright | `npm run test` | `playwright/test-results` |
| K6 | `npm run test-break` | `k6/src/reports/` |
| WebdriverIO | `npm run test` | `webdriver/allure-results` |

## Secrets

- `BASE_URL_TEST` (opcional): URL da API para K6. Se não for definido, usa JSONPlaceholder.


