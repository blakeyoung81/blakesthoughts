// Image optimization utilities for faster loading

export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    // Add crossOrigin for CORS
    img.crossOrigin = 'anonymous';
  });
}

export function preloadImages(imageUrls) {
  return Promise.allSettled(
    imageUrls.map(url => preloadImage(url))
  );
}

// Check if device is mobile for performance optimization
export function isMobileDevice() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get optimized image size based on device
export function getOptimizedImageSize(viewport, isMobile = false) {
  const baseScale = viewport.height * 0.9;
  const scale = isMobile ? baseScale * 0.8 : baseScale * 0.85;
  return [scale * 0.85, scale, 1];
}

// Image loading state management
export class ImageLoader {
  constructor() {
    this.cache = new Map();
    this.loading = new Set();
  }

  async loadImage(src) {
    if (this.cache.has(src)) {
      return this.cache.get(src);
    }

    if (this.loading.has(src)) {
      // Wait for existing load to complete
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src));
          } else {
            setTimeout(checkLoaded, 50);
          }
        };
        checkLoaded();
      });
    }

    this.loading.add(src);
    
    try {
      const img = await preloadImage(src);
      this.cache.set(src, img);
      this.loading.delete(src);
      return img;
    } catch (error) {
      this.loading.delete(src);
      throw error;
    }
  }

  preloadImages(urls) {
    return Promise.allSettled(
      urls.map(url => this.loadImage(url))
    );
  }
}
