import { expect, test } from "@playwright/test";

import { apiPosts } from "../../support/api/apiPosts";

test.describe("API Posts - CRUD", () => {
  test("GET /posts - Listar todos os posts - status 200", async ({
    request,
  }) => {
    const response = await apiPosts.listar(request);
    expect(response.status()).toBe(200);

    const body = (await response.json()) as Record<string, unknown>[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    const primeiroPost = body[0] as {
      id?: number;
      title?: string;
      userId?: number;
    };
    expect(primeiroPost).toHaveProperty("id");
    expect(primeiroPost).toHaveProperty("title");
    expect(primeiroPost).toHaveProperty("userId");
  });

  test("GET /posts/1 - Buscar post por ID - status 200", async ({
    request,
  }) => {
    const response = await apiPosts.buscarPorId(request, 1);
    expect(response.status()).toBe(200);

    const body = (await response.json()) as {
      id?: number;
      title?: string;
      body?: string;
      userId?: number;
    };
    expect(body.id).toBe(1);
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("body");
    expect(body).toHaveProperty("userId");
  });

  test("POST /posts - Criar novo post - status 201", async ({ request }) => {
    const payload = {
      title: "Post de teste",
      body: "Corpo do post criado via API",
      userId: 1,
    };

    const response = await apiPosts.criar(request, payload);
    expect(response.status()).toBe(201);

    const body = (await response.json()) as {
      id?: number;
      title?: string;
      body?: string;
    };
    expect(body.id).toBeDefined();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
  });

  test("PUT /posts/1 - Atualizar post - status 200", async ({ request }) => {
    const payload = {
      title: "Título atualizado",
      body: "Corpo atualizado via PUT",
      userId: 1,
    };

    const response = await apiPosts.atualizar(request, 1, payload);
    expect(response.status()).toBe(200);

    const body = (await response.json()) as {
      id?: number;
      title?: string;
      body?: string;
    };
    expect(body.id).toBe(1);
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
  });

  test("DELETE /posts/1 - Deletar post - status 200", async ({ request }) => {
    const response = await apiPosts.deletar(request, 1);
    expect(response.status()).toBe(200);
  });
});
