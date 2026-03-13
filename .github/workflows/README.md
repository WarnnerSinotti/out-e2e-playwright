# Workflows

## Playwright API + E2E (`playwright.yml`)

Roda **apenas** os testes de API e E2E deste repositório.

- **Disparo:** workflow_dispatch, push ou PR na main
- **Jobs:** playwright-api → playwright-e2e

## Pipeline completo (API → E2E → K6)

O pipeline completo está no repositório **out-test-pipeline**, que orquestra API + E2E + K6.
