import { APIRequestContext } from "@playwright/test";

const baseUrl =
  process.env.API_POSTS_BASE_URL ?? "https://jsonplaceholder.typicode.com";

export interface PostPayload {
  title: string;
  body: string;
  userId?: number;
}

export const apiPosts = {
  async listar(request: APIRequestContext) {
    return request.get(`${baseUrl}/posts`);
  },

  async buscarPorId(request: APIRequestContext, id: number) {
    return request.get(`${baseUrl}/posts/${id}`);
  },

  async criar(request: APIRequestContext, payload: PostPayload) {
    return request.post(`${baseUrl}/posts`, {
      data: payload,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  async atualizar(
    request: APIRequestContext,
    id: number,
    payload: Partial<PostPayload>,
  ) {
    return request.put(`${baseUrl}/posts/${id}`, {
      data: payload,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  async deletar(request: APIRequestContext, id: number) {
    return request.delete(`${baseUrl}/posts/${id}`);
  },
};
