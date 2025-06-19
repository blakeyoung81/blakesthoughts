import { z, defineCollection } from "astro:content";

export const collections = {
  blog: defineCollection({ 
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string().or(z.date()),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
    })
  }),
  poetry: defineCollection({ 
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string().or(z.date()),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
    })
  }),
  projects: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string().or(z.date()),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      repo: z.string().url(),
      tech: z.array(z.string()),
      cover: z.string().optional(),
      liveDemo: z.string().url().optional(),
    }),
  }),
}; 