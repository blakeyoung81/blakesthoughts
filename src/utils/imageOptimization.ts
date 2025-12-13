// Utility for image optimization and device detection

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function getOptimizedImageSize(viewport: any, isMobile: boolean): [number, number] {
  // Calculate size based on viewport while maintaining aspect ratio
  // Use a consistent aspect ratio approach to prevent clipping
  const maxWidth = isMobile ? viewport.width * 0.8 : viewport.width * 0.5;
  const maxHeight = isMobile ? viewport.height * 0.6 : viewport.height * 0.6;
  
  // Return as [width, height] - the Image component will maintain aspect ratio
  // We use a square-ish ratio as base, but the actual image aspect will be preserved
  return [maxWidth, maxHeight];
}

export class ImageLoader {
  private cache: Map<string, HTMLImageElement>;
  private loading: Map<string, Promise<HTMLImageElement>>;

  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }

  async preloadImage(url: string): Promise<HTMLImageElement> {
    // Return cached image if available
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Return ongoing load promise if already loading
    if (this.loading.has(url)) {
      return this.loading.get(url)!;
    }

    // Start new load
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      // Only set crossOrigin if URL is from different origin (browser only)
      if (typeof window !== 'undefined' && url.startsWith('http') && !url.startsWith(window.location.origin)) {
        img.crossOrigin = 'anonymous';
      }
      
      img.onload = () => {
        this.cache.set(url, img);
        this.loading.delete(url);
        resolve(img);
      };
      
      img.onerror = () => {
        this.loading.delete(url);
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
    });

    this.loading.set(url, loadPromise);
    return loadPromise;
  }

  async preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(urls.map(url => this.preloadImage(url)));
  }

  isLoaded(url: string): boolean {
    return this.cache.has(url);
  }

  clearCache(): void {
    this.cache.clear();
    this.loading.clear();
  }
}

/**
 * Get the correct image path for a topic name
 * For static files, use the actual filename with spaces (not encoded)
 * Vercel handles spaces in static file paths correctly
 */
export function getTopicImagePath(topic: string): string {
  // Use the actual topic name with spaces - Vercel handles this correctly for static files
  return `/images/topics/${topic}.png`;
}

/**
 * Get encoded image path (for URL usage where encoding is needed)
 */
export function getTopicImagePathEncoded(topic: string): string {
  return `/images/topics/${encodeURIComponent(topic)}.png`;
}

