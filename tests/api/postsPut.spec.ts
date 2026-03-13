import { expect, test } from "@playwright/test";

import { apiPosts } from "../../support/api/apiPosts";

test.describe("API Posts - PUT", () => {
  const payloadValido = {
    title: "Título atualizado",
    body: "Corpo atualizado via PUT",
    userId: 1,
  };

  test("PUT /posts/1 - validar status code 200", async ({ request }) => {
    const response = await apiPosts.atualizar(request, 1, payloadValido);
    expect(response.status()).toBe(200);
  });

  test("PUT /posts/1 - validar headers Content-Type", async ({ request }) => {
    const response = await apiPosts.atualizar(request, 1, payloadValido);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
  });

  test("PUT /posts/1 - validar corpo retornado com dados atualizados", async ({
    request,
  }) => {
    const response = await apiPosts.atualizar(request, 1, payloadValido);
    const body = (await response.json()) as {
      id?: number;
      title?: string;
      body?: string;
      userId?: number;
    };
    expect(body.id).toBe(1);
    expect(body.title).toBe(payloadValido.title);
    expect(body.body).toBe(payloadValido.body);
  });

  test("PUT /posts/999999 - ID inexistente retorna 404 ou 500", async ({
    request,
  }) => {
    const response = await apiPosts.atualizar(request, 999999, payloadValido);
    expect([404, 500]).toContain(response.status());
  });

  test("PUT /posts/1 - payload malformado retorna erro", async ({
    request,
  }) => {
    const response = await apiPosts.requisicao(
      request,
      "PUT",
      "/posts/1",
      "not valid json",
    );
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
