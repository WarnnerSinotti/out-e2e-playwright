import { expect, test } from "@playwright/test";

import { parsePost } from "../../schemas";
import { apiPosts } from "../../support/api/posts/apiPosts";

test.describe("API Posts - POST", () => {
  const payloadValido = {
    title: "Post de teste",
    body: "Corpo do post criado via API",
    userId: 1,
  };

  test("POST /posts - validar status code 201", async ({ request }) => {
    const response = await apiPosts.CriarPost(request, payloadValido);
    expect(response.status()).toBe(201);
  });

  test("POST /posts - validar headers Content-Type na resposta", async ({
    request,
  }) => {
    const response = await apiPosts.CriarPost(request, payloadValido);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
  });

  test("POST /posts - validar corpo retornado com id e dados enviados (Zod)", async ({
    request,
  }) => {
    const response = await apiPosts.CriarPost(request, payloadValido);
    const body = parsePost(await response.json());
    expect(body.id).toBeDefined();
    expect(body.title).toBe(payloadValido.title);
    expect(body.body).toBe(payloadValido.body);
    expect(body.userId).toBe(payloadValido.userId);
  });

  test("POST /posts - payload malformado (JSON inválido) retorna erro 4xx ou 5xx", async ({
    request,
  }) => {
    const response = await apiPosts.CriacaoCustomizada(
      request,
      "POST",
      "/posts",
      "{ invalid json }",
    );
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test("POST /posts - payload com dados ausentes (campos obrigatórios vazios) valida resposta", async ({
    request,
  }) => {
    const response = await apiPosts.CriarPost(request, {
      title: "",
      body: "",
    });
    expect([200, 201, 400, 422]).toContain(response.status());
    if (response.ok()) {
      const body = parsePost(await response.json());
      expect(body).toHaveProperty("id");
    }
  });
});
