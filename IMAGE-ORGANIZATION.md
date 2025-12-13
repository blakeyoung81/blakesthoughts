# Image Organization Guide

This document explains where images are located, how they're used, and how to manage them effectively.

## 📁 Directory Structure

### `/public/images/` - Main Image Directory

All images are stored in the `public/` directory so they're accessible at the root URL path.

```
public/
├── images/
│   ├── topics/          # Topic images for homepage hero section
│   ├── projects/        # Project hero images
│   ├── blog/            # Blog post images (if any)
│   └── placeholders/    # Placeholder images for blog posts
├── fonts/               # Custom fonts
└── favicon.svg          # Site favicon
```

## 🎨 Topic Images (`/public/images/topics/`)

**Purpose**: These images appear in the homepage hero section - both on mobile (carousel) and desktop (3D neural net scene).

**Location**: `/public/images/topics/`

**Current Images**:
- `Business.png`
- `Chess.png`
- `Coding.png`
- `Default.png` (fallback image)
- `Default2.png` (alternative fallback)
- `Essays.png`
- `Free Will.png` (note: space in filename)
- `Meaning.png`
- `Music.png`
- `Philosophy.png`
- `Poetry.png`
- `Religion.png`
- `Software.png`
- `Streaming.png`
- `Truth.png`

**Usage**:
- **Mobile**: Displayed in `MobileTopicCarousel` component (`src/components/MobileTopicCarousel.tsx`)
- **Desktop**: Displayed in `NeuralNetScene` component (`src/components/NeuralNetScene.tsx`)
- Images are referenced by topic name: `/images/topics/${topic}.png`

**Important Notes**:
- Topic names must match exactly (case-sensitive)
- Spaces in topic names are preserved (e.g., "Free Will.png")
- If an image is missing, it falls back to `Default.png`
- Images should be PNG format with transparent backgrounds
- Recommended size: 800x800px to 1200x1200px (square aspect ratio works best)

**How They're Loaded**:
1. Topics are extracted from blog post tags in `src/pages/index.astro`
2. Each topic gets its corresponding image from `/images/topics/`
3. Images are preloaded for performance
4. Aspect ratio is preserved to prevent clipping

## 🚀 Project Images (`/public/images/projects/`)

**Purpose**: Hero images for featured projects on the homepage.

**Location**: `/public/images/projects/`

**Current Images**:
- `board-buddy-hero.png`
- `ivy-med-hero.png`
- `ivy-sprouts-hero.png`
- `ivy-tutoring-hero.png`
- `restoring-hope-hero.png`

**Usage**:
- Referenced in `src/pages/index.astro` in the `blakeProjects` array
- Displayed in project cards on the homepage
- Format: `/images/projects/${project.image}`

**Recommended Specs**:
- Aspect ratio: 16:9 or 4:3
- Size: 1200x675px or 1200x900px
- Format: PNG or JPG

## 📝 Blog Placeholder Images (`/public/images/placeholders/`)

**Purpose**: Default images for blog posts that don't have featured images.

**Location**: `/public/images/placeholders/`

**Current Images**:
- `blog-placeholder-1.jpg` through `blog-placeholder-5.jpg`
- `blog-placeholder-about.jpg`

**Usage**:
- Used as fallback images for blog posts
- Can be referenced in blog post frontmatter or components

## 🖼️ Image Display Fixes

### Recent Fixes (2024)

**Issue**: Images were being cut off/clipped in both mobile and desktop views.

**Solutions Applied**:

1. **MobileTopicCarousel** (`src/components/MobileTopicCarousel.tsx`):
   - Changed from fixed `w-3/4 max-w-md` to flexible `w-full max-w-md` with padding
   - Added `max-h-[60vh]` to prevent vertical overflow
   - Added `object-contain` to preserve aspect ratio
   - Added explicit `style` prop for max-width

2. **NeuralNetScene** (`src/components/NeuralNetScene.tsx`):
   - Now calculates actual image aspect ratio before scaling
   - Dynamically adjusts scale to fit viewport without clipping
   - Preserves aspect ratio regardless of image dimensions
   - Uses `maxWidth` and `maxHeight` constraints

3. **Image Optimization Utility** (`src/utils/imageOptimization.ts`):
   - Updated `getOptimizedImageSize` to use more flexible sizing
   - Better viewport-based calculations

### How Images Are Sized Now

**Mobile**:
- Max width: 80% of viewport width
- Max height: 60% of viewport height
- Aspect ratio: Preserved from original image

**Desktop**:
- Max width: 50% of viewport width  
- Max height: 60% of viewport height
- Aspect ratio: Preserved from original image

## 📋 Adding New Topic Images

1. **Create the image**:
   - Format: PNG with transparent background
   - Size: 800x800px to 1200x1200px (square recommended)
   - Name: Must match topic name exactly (e.g., "Business.png")

2. **Save to**: `/public/images/topics/`

3. **Ensure topic exists**:
   - Topic must be used as a tag in at least one blog post
   - Or add to fallback topics in `src/pages/index.astro`

4. **Test**:
   - Check mobile carousel displays correctly
   - Check desktop 3D scene displays correctly
   - Verify no clipping occurs

## 🧹 Duplicate Files Cleanup

**Issue**: Many files have " 2" or " 3" suffixes, likely from iCloud sync conflicts.

**Duplicate Files Found**:
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Component files (`*.astro`, `*.tsx`)
- Content files (`*.md`, `*.mdx`)
- Image files (`*.jpg`, `*.png`, `*.svg`)

**Recommendation**:
1. Review each duplicate file
2. Keep the version without the number suffix (original)
3. Delete numbered duplicates unless they contain unique content
4. Use version control to track changes

**Safe to Delete** (after verification):
- All files ending in ` 2.*` or ` 3.*` that are exact duplicates
- Keep originals without numbers

**Before Deleting**:
- Compare file contents
- Check git history if using version control
- Backup important files

## 🔍 Finding Images in Code

### Where Images Are Referenced

1. **Homepage Topic Images**:
   - `src/pages/index.astro` - Topic extraction and preloading
   - `src/components/MobileTopicCarousel.tsx` - Mobile display
   - `src/components/NeuralNetScene.tsx` - Desktop 3D display

2. **Project Images**:
   - `src/pages/index.astro` - `blakeProjects` array

3. **Blog Images**:
   - Individual blog post files in `src/content/blog/`
   - Blog layout in `src/layouts/BlogPost.astro`

### Search Commands

```bash
# Find all image references
grep -r "/images/" src/

# Find topic image references
grep -r "topics/" src/

# Find project image references  
grep -r "projects/" src/
```

## ✅ Best Practices

1. **Naming Conventions**:
   - Use descriptive, lowercase filenames with hyphens
   - Match topic names exactly (case-sensitive)
   - Use consistent formats (PNG for topics, JPG for photos)

2. **File Organization**:
   - Keep images in appropriate subdirectories
   - Don't mix image types in same directory
   - Use descriptive folder names

3. **Optimization**:
   - Compress images before adding (use tools like ImageOptim, TinyPNG)
   - Use appropriate formats (PNG for transparency, JPG for photos)
   - Keep file sizes reasonable (< 500KB when possible)

4. **Version Control**:
   - Commit images separately from code changes
   - Use descriptive commit messages
   - Consider using Git LFS for large images

## 🐛 Troubleshooting

### Images Not Displaying

1. **Check file path**: Ensure path matches exactly (case-sensitive)
2. **Check file exists**: Verify file is in correct directory
3. **Check browser console**: Look for 404 errors
4. **Check fallback**: Verify `Default.png` exists

### Images Being Cut Off

1. **Check aspect ratio**: Ensure image isn't too wide/tall
2. **Check viewport**: Test on different screen sizes
3. **Check CSS**: Look for `overflow: hidden` or fixed dimensions
4. **Check component code**: Verify sizing logic in components

### Performance Issues

1. **Image size**: Large images slow down loading
2. **Preloading**: Check if images are being preloaded correctly
3. **Caching**: Ensure browser caching is working
4. **Format**: Use optimized formats (WebP when possible)

## 📚 Related Files

- `src/components/MobileTopicCarousel.tsx` - Mobile image display
- `src/components/NeuralNetScene.tsx` - Desktop 3D image display
- `src/utils/imageOptimization.ts` - Image sizing utilities
- `src/pages/index.astro` - Homepage with image references
- `src/pages/topics/[slug].astro` - Topic pages (may use images)

---

**Last Updated**: 2024
**Maintained By**: Blake's Thoughts Development

