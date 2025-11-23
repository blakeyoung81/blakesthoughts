// Utility for image optimization and device detection

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function getOptimizedImageSize(viewport: any, isMobile: boolean): [number, number] {
  const maxWidth = viewport.width * (isMobile ? 0.75 : 0.55);
  const maxHeight = viewport.height * (isMobile ? 0.55 : 0.5);

  // Keep the square planes safely within the viewport to avoid cropping
  const targetSize = Math.min(maxWidth, maxHeight);
  return [targetSize, targetSize];
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
      img.crossOrigin = 'anonymous';
      
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

