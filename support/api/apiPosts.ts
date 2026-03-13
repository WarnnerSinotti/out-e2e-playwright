import { APIRequestContext } from '@playwright/test';

const BASE_URL = process.env.API_POSTS_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

export interface PostPayload {
    title: string;
    body: string;
    userId?: number;
}

export const apiPosts = {
    async listar(request: APIRequestContext) {
        return request.get(`${BASE_URL}/posts`);
    },

    async buscarPorId(request: APIRequestContext, id: number) {
        return request.get(`${BASE_URL}/posts/${id}`);
    },

    async criar(request: APIRequestContext, payload: PostPayload) {
        return request.post(`${BASE_URL}/posts`, {
            data: payload,
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
    },

    async atualizar(request: APIRequestContext, id: number, payload: Partial<PostPayload>) {
        return request.put(`${BASE_URL}/posts/${id}`, {
            data: payload,
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
    },

    async deletar(request: APIRequestContext, id: number) {
        return request.delete(`${BASE_URL}/posts/${id}`);
    },
};
