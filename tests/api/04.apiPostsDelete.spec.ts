import { expect, test } from "@playwright/test";

import { apiPosts } from "../../support/api/posts/apiPosts";

test.describe("API Posts - DELETE", () => {
  test("DELETE /posts/1 - validar status code 200", async ({ request }) => {
    const response = await apiPosts.DeletarPostPorId(request, 1);
    expect(response.status()).toBe(200);
  });

  test("DELETE /posts/1 - validar resposta vazia ou objeto", async ({
    request,
  }) => {
    const response = await apiPosts.DeletarPostPorId(request, 99);
    const text = await response.text();
    expect([200, 204]).toContain(response.status());
    if (text) {
      expect(() => JSON.parse(text)).not.toThrow();
    }
  });

  test("DELETE /posts/999999 - ID inexistente retorna 404 ou 200", async ({
    request,
  }) => {
    const response = await apiPosts.DeletarPostPorId(request, 999999);
    expect([200, 404]).toContain(response.status());
  });
});
