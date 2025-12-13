import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

const poetry = defineCollection({
	loader: glob({ base: './src/content/poetry', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.string().or(z.date()),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.string().or(z.date()).optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		repo: z.string().optional(),
		tech: z.array(z.string()).optional(),
		cover: z.string().optional(),
		liveDemo: z.string().optional(),
	}),
});

export const collections = { blog, poetry, projects };
