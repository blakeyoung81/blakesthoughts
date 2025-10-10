# Blake's Thoughts

A personal website and blog built with Astro, Tailwind CSS, and Markdown content collections.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Content Management

This site uses Astro's Content Collections to manage blog posts, poetry, and projects.

### Creating New Content

Use the built-in content creation script:

```bash
# Create a new blog post
npm run new blog "My New Blog Post"

# Create a new poem
npm run new poetry "My New Poem"

# Create a new project
npm run new projects "My New Project"
```

The script will prompt for additional information like description, repository URL (for projects), etc.

### Content Structure

- `src/content/blog/` - Blog posts
- `src/content/poetry/` - Poetry
- `src/content/projects/` - Projects

## 🧞 Project Structure

```
├── public/                    # Static assets (served from root)
│   ├── fonts/                 # Web fonts (Atkinson)
│   ├── images/
│   │   ├── topics/            # Topic PNG icons (Business, Chess, etc.)
│   │   ├── placeholders/      # Blog placeholder images
│   │   └── blog/              # Blog-specific images
│   ├── favicon.svg            # Site favicon
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── BaseHead.astro     # SEO and meta tags
│   │   ├── Header.astro       # Navigation header
│   │   ├── Footer.astro       # Site footer
│   │   ├── Logo.astro         # Animated logo
│   │   └── NeuralNetScene.tsx # 3D topic visualization
│   ├── content/               # Content collections
│   │   ├── blog/              # Blog posts (.md, .mdx)
│   │   ├── poetry/            # Poetry posts
│   │   ├── projects/          # Project showcases
│   │   └── config.ts          # Content schemas
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro   # Main layout wrapper
│   │   └── BlogPost.astro     # Blog post layout
│   ├── pages/                 # Page routes
│   │   ├── blog/              # Blog pages
│   │   ├── poetry/            # Poetry pages
│   │   ├── projects/          # Project pages
│   │   ├── topics/            # Topic aggregation pages
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro        # About page
│   │   └── contact.astro      # Contact page
│   ├── styles/                # Global styles
│   │   └── global.css         # Global CSS
│   └── consts.ts              # Site constants
├── scripts/                   # Utility scripts
│   └── new-post.js            # Create new content script
├── .cursorrules               # AI assistant guidelines
├── astro.config.mjs           # Astro configuration
├── tailwind.config.cjs        # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

See [ORGANIZATION.md](./ORGANIZATION.md) for detailed file organization guidelines.

## 🔧 Configuration

### Site Configuration

Update the site URL and other settings in `astro.config.mjs`.

### Tailwind Configuration

Customize colors, fonts, and other Tailwind settings in `tailwind.config.cjs`.

## 📦 Deployment

This site is configured to deploy to DigitalOcean App Platform:

1. Create a new app on DigitalOcean App Platform
2. Connect your GitHub repository
3. Configure as a Static Site:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add your custom domain in Settings → Domains
5. Update your domain's nameservers to:
   - ns1.digitalocean.com
   - ns2.digitalocean.com
   - ns3.digitalocean.com

## 📄 License

This project is for personal use only. All content and code © Blake Young.

## 🙏 Acknowledgments

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DigitalOcean](https://www.digitalocean.com/) # Force deployment trigger

