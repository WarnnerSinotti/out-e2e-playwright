import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number().optional(),
});

export const postArraySchema = z.array(postSchema);

export const postPayloadSchema = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.number().optional(),
});

export type Post = z.infer<typeof postSchema>;
export type PostPayload = z.infer<typeof postPayloadSchema>;

export const parsePost = (data: unknown) => postSchema.parse(data);
export const parsePostArray = (data: unknown) => postArraySchema.parse(data);
export const parsePostPayload = (data: unknown) =>
  postPayloadSchema.parse(data);
