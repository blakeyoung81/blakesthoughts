import { useRef, useMemo, useState, useEffect, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Image as DreiImage, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ImageLoader, isMobileDevice, getOptimizedImageSize, getTopicImagePath } from '../utils/imageOptimization';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("NeuralNetScene Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return null; // Fail silently but don't crash proper
    }
    return this.props.children;
  }
}

interface WordProps {
  topic: string;
  onHover: (topic: string) => void;
  onLeave: () => void;
}

function Word({ topic, onHover, onLeave, ...props }: WordProps) {
  const ref = useRef<any>(null);

  const [initialPosition, velocity, sin, cos] = useMemo(() => {
    // Truly random initial position in 3D space around the sphere
    const radius = 25 + Math.random() * 10; // Random radius between 25-35
    const phi = Math.random() * Math.PI; // Random angle 0 to π
    const theta = Math.random() * 2 * Math.PI; // Random angle 0 to 2π

    const initialPos = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    const velocity = new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
    const sin = Math.random() * 2 * Math.PI;
    const cos = Math.random() * 2 * Math.PI;
    return [initialPos, velocity, sin, cos];
  }, []);

  // Set initial position only once
  useEffect(() => {
    if (ref.current) {
      ref.current.position.copy(initialPosition);
    }
  }, [initialPosition]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const time = clock.getElapsedTime() * 0.1;
    // Just add gentle floating motion to the current position
    ref.current.position.x += Math.sin(time + sin) * 0.01;
    ref.current.position.y += Math.cos(time + cos) * 0.01;
    ref.current.position.z += Math.sin(time + cos) * 0.01;
  });

  const handleClick = () => {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic === 'software') {
      window.location.href = 'https://github.com/blakeyoung81';
      return;
    }
    if (lowerTopic === 'chess') {
      window.location.href = 'https://www.chess.com/member/steamedhams81';
      return;
    }

    // Default behavior for other topics
    const url = `/blog/${lowerTopic.replace(/ /g, '-')}`;
    window.location.href = url;
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    onHover(topic);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    onLeave();
  };

  return (
    <Text
      ref={ref}
      fontSize={2.5}
      letterSpacing={-0.05}
      color="white"
      anchorX="center"
      anchorY="middle"
      font="/fonts/atkinson-regular.woff"
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...props}
    >
      {topic}
    </Text>
  );
}

interface CloudProps {
  topics: string[];
  radius: number;
  onWordHover: (topic: string) => void;
  onWordLeave: () => void;
}

function Cloud({ topics, radius, onWordHover, onWordLeave }: CloudProps) {
  return (
    <>
      {topics.map((topic, i) => (
        <Word
          key={`${topic}-${i}`}
          topic={topic}
          onHover={onWordHover}
          onLeave={onWordLeave}
        />
      ))}
    </>
  );
}

function FlickeringStars() {
  const starsRef = useRef<any>(null);
  const [flickerOffsets] = useState(() => Array.from({ length: 3 }, () => Math.random() * 100));
  const isMobile = isMobileDevice();

  useFrame(({ clock }) => {
    if (!starsRef.current) return;

    const time = clock.getElapsedTime();

    // Reduced flickering for better performance
    const flicker1 = Math.sin(time * 4 + flickerOffsets[0]) * 0.2;
    const flicker2 = Math.sin(time * 7.5 + flickerOffsets[1]) * 0.15;
    const flicker3 = Math.sin(time * 12 + flickerOffsets[2]) * 0.1;

    const combinedFlicker = 0.5 + flicker1 + flicker2 + flicker3;
    const rotationSpeed = time * 0.01;

    // Apply rotation for gentle movement
    starsRef.current.rotation.x = rotationSpeed * 0.1;
    starsRef.current.rotation.y = rotationSpeed * 0.05;
    starsRef.current.rotation.z = rotationSpeed * 0.02;

    // Apply flickering by modifying the material opacity
    if (starsRef.current.material) {
      starsRef.current.material.opacity = Math.max(0.2, Math.min(1.0, combinedFlicker));
      starsRef.current.material.needsUpdate = true;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={120}
      depth={80}
      count={isMobile ? 6000 : 10000} // Fewer stars on mobile
      factor={8}
      saturation={0}
      fade
      speed={0.2}
    />
  );
}

interface BlakeImageProps {
  imageUrl: string;
}

// Global cache for image dimensions to prevent layout thrashing/reloading
const imageDimensionCache = new Map<string, number>(); // url -> aspect ratio

function BlakeImage({ imageUrl }: BlakeImageProps) {
  const { viewport } = useThree();
  const meshRef = useRef<any>(null);
  const isMobile = isMobileDevice();
  const [imageAspect, setImageAspect] = useState(() => {
    // Initial state from cache if available
    return imageDimensionCache.get(imageUrl) || 1;
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [imageError, setImageError] = useState(false);

  // Update image URL when prop changes
  useEffect(() => {
    setCurrentImageUrl(imageUrl);
    setImageError(false);

    // Check cache first
    const cachedAspect = imageDimensionCache.get(imageUrl);
    if (cachedAspect) {
      setImageAspect(cachedAspect);
      return;
    }

    // Load image to get its natural dimensions
    const img = new Image();
    // Only set crossOrigin if needed (different origin)
    if (typeof window !== 'undefined' && imageUrl.startsWith('http') && !imageUrl.startsWith(window.location.origin)) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      const aspect = img.width / img.height;
      imageDimensionCache.set(imageUrl, aspect); // Cache it
      setImageAspect(aspect);
    };
    img.onerror = () => {
      console.warn('Failed to load image:', imageUrl);
      // Fallback logic remains similar but simplified for brevity
      if (imageUrl.includes(' ')) {
        const pathParts = imageUrl.split('/');
        const encodedParts = pathParts.map(part => part.includes(' ') ? encodeURIComponent(part) : part);
        const encodedUrl = encodedParts.join('/');
        const fallbackImg = new Image();
        if (typeof window !== 'undefined' && encodedUrl.startsWith('/')) {
          fallbackImg.src = `${window.location.origin}${encodedUrl}`;
        } else {
          fallbackImg.src = encodedUrl;
        }
        fallbackImg.onload = () => {
          const aspect = fallbackImg.width / fallbackImg.height;
          imageDimensionCache.set(encodedUrl, aspect);
          setCurrentImageUrl(encodedUrl);
          setImageAspect(aspect);
        };
        fallbackImg.onerror = () => {
          console.warn('Failed to load encoded image:', encodedUrl);
          setImageError(true);
        };
      } else {
        setImageError(true);
      }
    };
    // Use absolute URL for loading test
    if (typeof window !== 'undefined' && imageUrl.startsWith('/')) {
      img.src = `${window.location.origin}${imageUrl}`;
    } else {
      img.src = imageUrl;
    }
  }, [imageUrl]);

  // Calculate scale so image extends flush to bottom
  // Updated constraints per user feedback: "Bigger" and "Start at bottom"
  const availableHeight = viewport.height;

  // Allow much wider images
  const maxWidth = viewport.width * 1.5;
  const maxHeight = availableHeight * 0.9; // Use up to 90% of screen height

  // Calculate scale
  let height = maxHeight;
  let width = maxHeight * imageAspect;

  if (width > maxWidth) {
    width = maxWidth;
    height = maxWidth / imageAspect;
  }

  const scale: [number, number] = [width, height];

  useFrame(() => {
    if (meshRef.current && meshRef.current.material) {
      // Force complete transparency for PNG backgrounds
      meshRef.current.material.transparent = true;
      meshRef.current.material.alphaTest = 0.001; // Very low threshold
      meshRef.current.material.depthWrite = false; // Don't write to depth buffer
      meshRef.current.material.blending = THREE.NormalBlending;
      meshRef.current.material.needsUpdate = true;
    }
  });

  // Ensure URL is absolute for proper loading (only in browser)
  // For static files with spaces, we need to encode them in the URL
  let absoluteImageUrl: string;
  if (typeof window !== 'undefined') {
    if (currentImageUrl.startsWith('/')) {
      const encodedPath = currentImageUrl.split('/').map(segment =>
        segment.includes(' ') ? encodeURIComponent(segment) : segment
      ).join('/');
      absoluteImageUrl = `${window.location.origin}${encodedPath}`;
    } else {
      absoluteImageUrl = currentImageUrl;
    }
  } else {
    absoluteImageUrl = currentImageUrl;
  }

  // Don't render if image failed to load (except default)
  if (imageError && currentImageUrl !== '/images/topics/Default.png') {
    return null;
  }

  return (
    <DreiImage
      ref={meshRef}
      url={absoluteImageUrl}
      scale={scale}
      // Position: center x=0. y = bottom of view (-height/2) + half image height (since pivot is center)
      // This anchors the bottom of the image to the bottom of the viewport
      position={[0, -viewport.height / 2 + height / 2, 5]}
      transparent
      alphaTest={0.001}
      depthWrite={false}
    />
  );
}

interface NeuralNetSceneProps {
  topics?: string[];
}

export function NeuralNetScene({ topics = [] }: NeuralNetSceneProps) {
  const [imageUrl, setImageUrl] = useState('/images/topics/Default.png');
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const [isReady, setIsReady] = useState(true); // Start ready - don't wait for images
  const imageLoader = useRef(new ImageLoader());

  // Debug: Log topics to ensure they're being passed
  useEffect(() => {
    if (topics.length > 0) {
      console.log('NeuralNetScene: Topics loaded:', topics);
    } else {
      console.warn('NeuralNetScene: No topics provided');
    }
  }, [topics]);

  // Preload images in background (non-blocking)
  useEffect(() => {
    if (topics.length === 0) {
      return;
    }

    // Try to preload images, but don't block rendering if they fail
    // Images are optional - the floating words should always render
    const preloadImages = async () => {
      try {
        // Try to preload default image (non-blocking)
        imageLoader.current.preloadImage('/images/topics/Default.png').catch(() => {
          // Silently fail - images are optional
        });

        // Preload topic images in background (non-blocking)
        const topicUrls = topics.map(topic => getTopicImagePath(topic));
        imageLoader.current.preloadImages(topicUrls).catch(() => {
          // Silently fail - images are optional
        });

        setPreloadedImages(new Set(topics));
      } catch (error) {
        // Silently fail - continue without images
        // The floating words will still render
      }
    };

    preloadImages();
  }, [topics]);

  const handleWordHover = (topic: string) => {
    // Set topic image immediately
    const topicImageUrl = getTopicImagePath(topic);
    setImageUrl(topicImageUrl);

    // Try to preload it in the background for next time
    imageLoader.current.preloadImage(topicImageUrl).catch(() => {
      // Silently fail - image will still try to load via the Image component
    });
  };

  const handleWordLeave = () => {
    setImageUrl('/images/topics/Default.png');
  };

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <ErrorBoundary fallback={null}>
        <Canvas
          style={{ width: '100%', height: '100%', display: 'block' }}
          gl={{
            alpha: true,
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          camera={{ position: [0, 0, 30], fov: 75 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />

          <Suspense fallback={null}>
            <FlickeringStars />
            <Suspense fallback={null}>
              <BlakeImage imageUrl={imageUrl} />
            </Suspense>
            {topics.length > 0 && (
              <Cloud
                topics={topics}
                radius={28}
                onWordHover={handleWordHover}
                onWordLeave={handleWordLeave}
              />
            )}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}