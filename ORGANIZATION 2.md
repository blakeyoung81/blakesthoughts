# Blake's Thoughts - File Organization Guide

This document provides comprehensive guidelines for organizing files and maintaining the codebase structure.

## 📁 Directory Structure

### `/public/` - Static Assets
All files in `public/` are served directly from the site root. URLs map directly to file paths (e.g., `public/images/topics/Business.png` → `/images/topics/Business.png`).

#### `/public/images/`
Organized by content type for better maintainability:

- **`/images/topics/`** - Topic icon PNGs
  - Used by the 3D neural network visualization on homepage
  - Referenced in `src/components/NeuralNetScene.tsx`
  - **Required topics**: Business, Chess, Coding, Default, Essays, Free Will, Meaning, Music, Philosophy, Poetry, Religion, Software, Truth
  - **Naming convention**: Exact case-sensitive match with topic names (e.g., `Free Will.png`)
  - **Format**: PNG with transparent backgrounds
  - **When adding**: Update `NeuralNetScene.tsx` topic list and create matching PNG

- **`/images/placeholders/`** - Blog placeholder images
  - Used for meta tags and blog post hero images
  - Referenced in `src/components/BaseHead.astro` and blog post frontmatter
  - **Naming convention**: `blog-placeholder-[number].jpg` or `blog-placeholder-[descriptor].jpg`

- **`/images/blog/`** - Blog-specific images
  - Post-specific images, graphics, and media
  - Reference in posts with `/images/blog/filename.ext`
  - Keep organized by creating subdirectories for posts with multiple images

#### `/public/fonts/`
Web fonts for the site (Atkinson typeface).

#### `/public/favicon.svg`
Site favicon - SVG format for scalability.

---

### `/src/` - Source Code

#### `/src/components/` - Reusable Components
UI components used across the site:

- **`BaseHead.astro`** - SEO meta tags, Open Graph, Twitter Cards
- **`Header.astro`** - Navigation header with responsive menu
- **`Footer.astro`** - Site footer
- **`HeaderLink.astro`** - Navigation link component
- **`Logo.astro`** - Animated logo component
- **`FormattedDate.astro`** - Date formatting component
- **`NeuralNetScene.tsx`** - React Three Fiber 3D visualization for homepage

**When creating new components:**
- Use `.astro` for static/server-side components
- Use `.tsx` for React components requiring client-side interactivity
- Follow naming convention: PascalCase for components
- Document component props with TypeScript interfaces

#### `/src/content/` - Content Collections
Managed by Astro's Content Collections API with Zod schemas in `config.ts`.

##### `/src/content/blog/` - Blog Posts
Main blog content in Markdown/MDX format.

**Required frontmatter:**
```yaml
---
title: "Post Title"
description: "SEO-friendly description"
pubDate: 2024-01-01  # YYYY-MM-DD or Date object
tags: ["Tag1", "Tag2"]  # Must match available topic PNGs
draft: false  # Optional, defaults to false
---
```

**Creating new posts:**
```bash
node scripts/new-post.js "Your Post Title"
```

**Best practices:**
- Use semantic heading hierarchy (H1 → H2 → H3)
- Include engaging meta descriptions
- Tags must correspond to PNG files in `/public/images/topics/`
- Use relative paths for internal links
- Place post-specific images in `/public/images/blog/`

##### `/src/content/poetry/` - Poetry Posts
Same structure as blog posts, primarily using `Poetry` tag.

##### `/src/content/projects/` - Project Showcases
Project documentation with additional frontmatter:

```yaml
---
title: "Project Name"
description: "Project description"
pubDate: 2024-01-01
tags: ["Coding", "Software"]
technologies: ["Tech1", "Tech2"]
githubUrl: "https://github.com/..."
liveUrl: "https://..."  # Optional
featured: true  # Optional, for homepage
---
```

##### `/src/content/config.ts` - Content Schemas
Zod validation schemas for all content collections. Update when adding new frontmatter fields.

#### `/src/layouts/` - Page Layouts
Reusable page structure components:

- **`BaseLayout.astro`** - Main site wrapper with header, footer, navigation
- **`BlogPost.astro`** - Specific layout for blog posts with meta tags

**When to create new layouts:**
- For pages with unique structural patterns
- When you need different header/footer configurations
- For collection-specific styling needs

#### `/src/pages/` - Route Pages
Astro's file-based routing. File structure determines URL structure.

**Static pages:**
- `index.astro` → `/` (Homepage)
- `about.astro` → `/about`
- `contact.astro` → `/contact`

**Dynamic routes:**
- `blog/[slug].astro` → `/blog/post-slug`
- `poetry/[slug].astro` → `/poetry/poem-slug`
- `projects/[slug].astro` → `/projects/project-slug`
- `topics/[slug].astro` → `/topics/topic-slug`

**Index pages:**
- `blog/index.astro` → `/blog` (All blog posts)
- `poetry/index.astro` → `/poetry` (All poetry)
- `projects/index.astro` → `/projects` (All projects)

**Special files:**
- `rss.xml.js` - RSS feed generation

#### `/src/styles/` - Global Styles
- **`global.css`** - Site-wide CSS, Tailwind directives, custom utilities

**When to add styles here:**
- Global typography settings
- Custom CSS utilities beyond Tailwind
- Third-party library style overrides
- Animation keyframes used across the site

#### `/src/consts.ts` - Site Constants
Centralized configuration values (site title, description, social links, etc.).

---

### `/scripts/` - Utility Scripts
Helper scripts for development and content management:

- **`new-post.js`** - Interactive CLI for creating new blog posts with proper frontmatter

**Usage:**
```bash
node scripts/new-post.js "Post Title"
```

**When to add scripts:**
- Automating repetitive tasks
- Content generation helpers
- Build process utilities

---

## 🗂️ File Naming Conventions

### Content Files (Markdown/MDX)
- **Format**: `kebab-case.md` or `kebab-case.mdx`
- **Examples**: `my-blog-post.md`, `using-mdx.mdx`
- URL slug is derived from filename

### Components
- **Format**: `PascalCase.astro` or `PascalCase.tsx`
- **Examples**: `BaseHead.astro`, `NeuralNetScene.tsx`

### Images
- **Topics**: Exact match with topic name, including spaces (e.g., `Free Will.png`)
- **Placeholders**: `blog-placeholder-[descriptor].jpg`
- **Blog images**: Descriptive kebab-case names

### Configuration Files
- Standard names: `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`

---

## 🧹 Maintenance Guidelines

### Regular Cleanup Tasks

1. **Remove build artifacts:**
   ```bash
   rm -rf dist/ .astro/
   ```

2. **Check for orphaned images:**
   - Search for image references in codebase
   - Delete unused files from `/public/images/`

3. **Update dependencies:**
   ```bash
   npm outdated
   npm update
   ```

4. **Validate content:**
   - Ensure all blog post tags have corresponding PNG files
   - Check for broken internal links
   - Verify all frontmatter is valid

### Adding New Topics

When adding a new topic to the site:

1. Create PNG icon: `/public/images/topics/TopicName.png`
2. Update `NeuralNetScene.tsx` if needed
3. Update fallback topic list in `src/pages/index.astro`
4. Update topic mapping in `src/pages/topics/[slug].astro`
5. Add to available topics list in `.cursorrules`

### Git Best Practices

**Always include:**
- `.gitignore` excludes `dist/`, `node_modules/`, `.DS_Store`, etc.

**Never commit:**
- Build output (`dist/`)
- Dependencies (`node_modules/`)
- Environment files (`.env`)
- OS-specific files (`.DS_Store`)
- Editor files (`.vscode/`, `.idea/`)

### Asset Optimization

**Before committing images:**
- Optimize PNGs (use tools like ImageOptim, TinyPNG)
- Compress JPGs to reasonable quality
- Ensure PNGs have transparency where needed
- Keep file sizes under 500KB when possible

---

## 📋 Content Checklist

### Before Publishing a Blog Post

- [ ] Frontmatter complete and valid
- [ ] Tags match available topic PNGs
- [ ] Description is SEO-friendly
- [ ] Internal links are correct
- [ ] Images are optimized and in correct directory
- [ ] Heading hierarchy is semantic
- [ ] Spell check and grammar check
- [ ] Preview in development server
- [ ] Test on mobile viewport

### Before Deploying

- [ ] Run `npm run build` successfully
- [ ] Preview production build with `npm run preview`
- [ ] Check for linter errors
- [ ] Test all navigation links
- [ ] Verify meta tags in browser dev tools
- [ ] Check Lighthouse scores
- [ ] Validate RSS feed

---

## 🚨 Common Issues & Solutions

### Issue: Topic PNG not showing on homepage
**Solution:** 
- Verify PNG exists at `/public/images/topics/[TopicName].png`
- Check exact capitalization and spacing
- Update `NeuralNetScene.tsx` if topic name changed

### Issue: Blog post returns 404
**Solution:**
- Verify file is in `/src/content/blog/`
- Check filename doesn't have special characters
- Ensure frontmatter is valid
- Rebuild site: `rm -rf dist/ .astro/ && npm run build`

### Issue: Images not loading
**Solution:**
- Verify path starts with `/` (e.g., `/images/blog/photo.jpg`)
- Check file exists in `/public/` directory
- Ensure no typos in filename
- Clear browser cache

### Issue: Build fails with content error
**Solution:**
- Check `src/content/config.ts` schema matches frontmatter
- Validate all dates are in correct format
- Ensure required fields are present
- Check for YAML syntax errors in frontmatter

---

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
- [MDX in Astro](https://docs.astro.build/en/guides/integrations-guide/mdx/)

---

**Last Updated:** October 2025

For questions or suggestions about this organization system, create an issue or update this document.

