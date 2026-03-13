import { APIRequestContext } from "@playwright/test";

const baseUrl =
  process.env.API_POSTS_BASE_URL ?? "https://jsonplaceholder.typicode.com";

export interface PostPayload {
  title: string;
  body: string;
  userId?: number;
}

export const apiPosts = {
  async BuscarPosts(request: APIRequestContext) {
    return request.get(`${baseUrl}/posts`);
  },

  async BuscarPostsPorId(request: APIRequestContext, id: number) {
    return request.get(`${baseUrl}/posts/${id}`);
  },

  async CriarPost(request: APIRequestContext, payload: PostPayload) {
    return request.post(`${baseUrl}/posts`, {
      data: payload,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  async AtualizarPost(
    request: APIRequestContext,
    id: number,
    payload: Partial<PostPayload>,
  ) {
    return request.put(`${baseUrl}/posts/${id}`, {
      data: payload,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  async DeletarPostPorId(request: APIRequestContext, id: number) {
    return request.delete(`${baseUrl}/posts/${id}`);
  },

  /** Requisição com método HTTP customizado (para cenários negativos) */
  async CriacaoCustomizada(
    request: APIRequestContext,
    method: string,
    path: string,
    body?: unknown,
  ) {
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
    return request.fetch(url, {
      method,
      headers: body
        ? { "Content-type": "application/json; charset=UTF-8" }
        : undefined,
      data: body,
    });
  },
};
