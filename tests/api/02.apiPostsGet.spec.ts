import { expect, test } from "@playwright/test";

import { parsePost, parsePostArray } from "../../schemas";
import { apiPosts } from "../../support/api/posts/apiPosts";

test.describe("API Posts - GET", () => {
  test("GET /posts - validar status code 200", async ({ request }) => {
    const response = await apiPosts.BuscarPosts(request);
    expect(response.status()).toBe(200);
  });

  test("GET /posts - validar headers Content-Type", async ({ request }) => {
    const response = await apiPosts.BuscarPosts(request);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
  });

  test("GET /posts - validar corpo: array com posts (Zod)", async ({
    request,
  }) => {
    const response = await apiPosts.BuscarPosts(request);
    const body = parsePostArray(await response.json());
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("GET /posts - validar estrutura do post (id, title, userId) via Zod", async ({
    request,
  }) => {
    const response = await apiPosts.BuscarPosts(request);
    const body = parsePostArray(await response.json());
    const primeiroPost = body[0];
    expect(primeiroPost).toHaveProperty("id");
    expect(primeiroPost).toHaveProperty("title");
    expect(primeiroPost).toHaveProperty("body");
    expect(primeiroPost).toHaveProperty("userId");
  });

  test("GET /posts/1 - validar status code 200", async ({ request }) => {
    const response = await apiPosts.BuscarPostsPorId(request, 1);
    expect(response.status()).toBe(200);
  });

  test("GET /posts/1 - validar corpo do post retornado (Zod)", async ({
    request,
  }) => {
    const response = await apiPosts.BuscarPostsPorId(request, 1);
    const body = parsePost(await response.json());
    expect(body.id).toBe(1);
    expect(body.userId).toBeDefined();
    expect(body.title).toBeDefined();
    expect(body.body).toBeDefined();
  });

  test("GET /posts/999999 - ID inexistente retorna 404", async ({
    request,
  }) => {
    const response = await apiPosts.BuscarPostsPorId(request, 999999);
    expect(response.status()).toBe(404);
  });

  test("GET /posts - cenário negativo: método inexistente (INVALID) retorna erro 4xx ou 5xx", async ({
    request,
  }) => {
    const response = await apiPosts.CriacaoCustomizada(
      request,
      "INVALID",
      "/posts/1",
    );
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test("GET /posts - cenário negativo: requisição com body (API rejeita ou ignora)", async ({
    request,
  }) => {
    const response = await apiPosts.CriacaoCustomizada(
      request,
      "GET",
      "/posts",
      {
        body: "GET não deve ter body",
      },
    );
    expect(response.status()).toBe(200);
  });
});
