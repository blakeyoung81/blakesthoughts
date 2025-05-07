import { z, defineCollection } from "astro:content";

const base = {
  title: z.string(),
  description: z.string().max(200),
  pubDate: z.date(),
  draft: z.boolean().optional(),
};

export const collections = {
  blog: defineCollection({ schema: z.object(base) }),
  poetry: defineCollection({ schema: z.object(base) }),
  projects: defineCollection({
    schema: z.object({
      ...base,
      repo: z.string().url(),
      tech: z.array(z.string()),
      cover: z.string().optional(),
      liveDemo: z.string().url().optional(),
    }),
  }),
}; 