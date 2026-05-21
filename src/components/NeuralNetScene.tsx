import { useRef, useMemo, useState, useEffect, Suspense, Component } from 'react';
import type { ReactNode } from 'react';
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

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      
      const errorMessage = this.state.error?.message || "Unknown WebGL or rendering error";
      const isWebGLIssue = errorMessage.toLowerCase().includes("webgl") || 
                           errorMessage.toLowerCase().includes("context lost") || 
                           errorMessage.toLowerCase().includes("gpu");

      return (
        <div className="w-full h-full flex items-center justify-center bg-[#030014]/85 p-4 relative z-50 rounded-2xl">
          <div className="bg-slate-950/90 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl shadow-red-500/5 transition-all duration-300">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              3D Experience Unavailable
            </h3>
            
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {isWebGLIssue 
                ? "WebGL might be disabled, unsupported, or blocked by your browser or graphics hardware. Try enabling hardware acceleration in your browser settings." 
                : "A rendering error occurred while loading the interactive background."}
            </p>

            <div className="text-left bg-red-950/30 border border-red-500/10 rounded-xl p-4 mb-6 max-h-36 overflow-y-auto">
              <span className="text-xs font-semibold text-red-400 block mb-1">Diagnostic Log:</span>
              <pre className="text-[10px] sm:text-xs text-red-300 font-mono whitespace-pre-wrap break-all leading-normal">
                {errorMessage}
                {this.state.error?.stack && `\n\nStack Trace:\n${this.state.error.stack}`}
              </pre>
            </div>

            <button
              onClick={this.handleRetry}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2 min-h-[48px]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 3v3h-3" />
              </svg>
              <span>Reload Experience</span>
            </button>
          </div>
        </div>
      );
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
    
    // Prevent words from getting too close to the camera (at z = 30)
    // Capping z at 10 guarantees a safe distance of at least 20 units
    if (initialPos.z > 10) {
      initialPos.z = -Math.abs(initialPos.z);
    }

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
    if (lowerTopic === 'medical') {
      window.location.href = '/resume';
      return;
    }

    // Default behavior for other topics
    const slug = lowerTopic.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const url = `/topics/${slug}`;
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
    const cleanedUrl = encodeURI(imageUrl);
    return imageDimensionCache.get(cleanedUrl) || 1;
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(() => encodeURI(imageUrl));
  const [imageError, setImageError] = useState(false);

  // Update image URL when prop changes
  useEffect(() => {
    const cleanedUrl = encodeURI(imageUrl);
    setCurrentImageUrl(cleanedUrl);
    setImageError(false);

    // Check cache first
    const cachedAspect = imageDimensionCache.get(cleanedUrl);
    if (cachedAspect) {
      setImageAspect(cachedAspect);
      return;
    }

    // Load image to get its natural dimensions
    const img = new Image();
    if (typeof window !== 'undefined' && cleanedUrl.startsWith('http') && !cleanedUrl.startsWith(window.location.origin)) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      const aspect = img.width / img.height;
      imageDimensionCache.set(cleanedUrl, aspect); // Cache it
      setImageAspect(aspect);
    };
    img.onerror = () => {
      console.warn('Failed to load image:', cleanedUrl);
      setImageError(true);
    };
    // Use absolute URL for loading test
    if (typeof window !== 'undefined' && cleanedUrl.startsWith('/')) {
      img.src = `${window.location.origin}${cleanedUrl}`;
    } else {
      img.src = cleanedUrl;
    }
  }, [imageUrl]);

  // Calculate scale so image extends flush to bottom
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

  // Apply scaling modifier for specific images
  let scaleModifier = 1.0;
  if (currentImageUrl.includes('Medical.png')) {
    scaleModifier = 0.65;
  }

  const scale: [number, number] = [width * scaleModifier, height * scaleModifier];

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
  let absoluteImageUrl: string;
  if (typeof window !== 'undefined') {
    if (currentImageUrl.startsWith('/')) {
      absoluteImageUrl = `${window.location.origin}${currentImageUrl}`;
    } else {
      absoluteImageUrl = currentImageUrl;
    }
  } else {
    absoluteImageUrl = currentImageUrl;
  }

  // Don't render if image failed to load (except default)
  if (imageError && currentImageUrl !== '/images/topics/Default.png?v=2') {
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
  const [imageUrl, setImageUrl] = useState('/images/topics/Default.png?v=2');
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const imageLoader = useRef(new ImageLoader());

  // Set mounted state to true on client-side to prevent SSR hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    if (topics.length === 0 || !isMounted) {
      return;
    }

    // Try to preload images, but don't block rendering if they fail
    // Images are optional - the floating words should always render
    const preloadImages = async () => {
      try {
        // Try to preload default image (non-blocking)
        imageLoader.current.preloadImage('/images/topics/Default.png?v=2').catch(() => {
          // Silently fail - images are optional
        });

        // Preload topic images in background (non-blocking)
        const topicUrls = topics.map(topic => encodeURI(getTopicImagePath(topic)));
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
  }, [topics, isMounted]);

  const handleWordHover = (topic: string) => {
    // Set topic image immediately
    const topicImageUrl = getTopicImagePath(topic);
    setImageUrl(topicImageUrl);

    // Try to preload it in the background for next time
    const cleanedUrl = encodeURI(topicImageUrl);
    imageLoader.current.preloadImage(cleanedUrl).catch(() => {
      // Silently fail - image will still try to load via the Image component
    });
  };

  const handleWordLeave = () => {
    setImageUrl('/images/topics/Default.png?v=2');
  };

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-950/20" style={{ width: '100%', height: '100%' }}>
        <div className="text-white text-xl animate-pulse">Loading 3D Experience...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <ErrorBoundary>
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