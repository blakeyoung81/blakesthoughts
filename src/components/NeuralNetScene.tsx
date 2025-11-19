import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Image, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ImageLoader, isMobileDevice, getOptimizedImageSize } from '../utils/imageOptimization';

interface WordProps {
  topic: string;
  onHover: (topic: string) => void;
  onLeave: () => void;
}

function Word({ topic, onHover, onLeave, ...props }: WordProps) {
  const ref = useRef();

  const [{ basePosition, phase, amplitude, speed }] = useMemo(() => {
    // Truly random initial position in 3D space around the sphere
    const radius = 25 + Math.random() * 10; // Random radius between 25-35
    const phi = Math.random() * Math.PI; // Random angle 0 to π
    const theta = Math.random() * 2 * Math.PI; // Random angle 0 to 2π

    const basePosition = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);

    return [{
      basePosition,
      phase: {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      },
      amplitude: 2 + Math.random() * 1.5, // Slight variance so words don't move in sync
      speed: 0.2 + Math.random() * 0.15,
    }];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const time = clock.getElapsedTime() * speed;

    const offsetX = Math.sin(time + phase.x) * amplitude;
    const offsetY = Math.cos(time * 0.8 + phase.y) * (amplitude * 0.6);
    const offsetZ = Math.sin(time * 1.1 + phase.z) * (amplitude * 0.8);

    ref.current.position.set(
      basePosition.x + offsetX,
      basePosition.y + offsetY,
      basePosition.z + offsetZ
    );
  });

  const handleClick = () => {
    const url = `/topics/${topic.toLowerCase().replace(/ /g, '-')}`;
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
  const starsRef = useRef();
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

function BlakeImage({ imageUrl }: BlakeImageProps) {
  const { viewport, camera } = useThree();
  const meshRef = useRef();
  const isMobile = isMobileDevice();
  const targetDepth = 5;
  const currentViewport = useMemo(
    () => viewport.getCurrentViewport(camera, [0, 0, targetDepth]),
    [viewport, camera]
  );
  const scale = useMemo(() => getOptimizedImageSize(currentViewport, isMobile), [currentViewport, isMobile]);
  const imagePosition: [number, number, number] = [
    0,
    -currentViewport.height / 2 + scale[1] / 2,
    targetDepth,
  ];

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
  
  return (
    <Image
      ref={meshRef}
      key={imageUrl}
      url={imageUrl}
      scale={scale}
      position={imagePosition}
      transparent={true}
      alphaTest={0.001}
      depthWrite={false}
      // Performance optimizations
      crossOrigin="anonymous"
      premultiplyAlpha={false}
      generateMipmaps={false}
      minFilter={THREE.LinearFilter}
      magFilter={THREE.LinearFilter}
    />
  );
}

interface NeuralNetSceneProps {
  topics?: string[];
}

export function NeuralNetScene({ topics = [] }: NeuralNetSceneProps) {
    const [imageUrl, setImageUrl] = useState('/images/topics/Default.png');
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const [isReady, setIsReady] = useState(false);
    const imageLoader = useRef(new ImageLoader());

    // Preload critical images first, then the rest
    useEffect(() => {
        const preloadImages = async () => {
            if (topics.length === 0) {
                setIsReady(true);
                return;
            }

            try {
                // Preload default image first
                await imageLoader.current.preloadImage('/images/topics/Default.png');
                setIsReady(true);

                // Preload the first few topic images
                const priorityTopics = topics.slice(0, 3);
                const priorityUrls = priorityTopics.map(topic => `/images/topics/${topic}.png`);
                await imageLoader.current.preloadImages(priorityUrls);
                
                // Preload remaining images in the background
                const remainingTopics = topics.slice(3);
                const remainingUrls = remainingTopics.map(topic => `/images/topics/${topic}.png`);
                if (remainingUrls.length > 0) {
                    imageLoader.current.preloadImages(remainingUrls).catch(() => {
                        // Silently fail for background preloading
                    });
                }

                setPreloadedImages(new Set(topics));
            } catch (error) {
                console.warn('Some images failed to preload:', error);
                setIsReady(true); // Continue even if preload fails
            }
        };

        preloadImages();
    }, [topics]);

    const handleWordHover = (topic: string) => {
      setImageUrl(`/images/topics/${topic}.png`);
    };

    const handleWordLeave = () => {
      setImageUrl('/images/topics/Default.png');
    };

    if (!isReady) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <Canvas 
          gl={{ 
            alpha: true, 
            antialias: false, // Disable for better performance
            premultipliedAlpha: false,
            preserveDrawingBuffer: false, // Disable for better performance
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }} 
          camera={{ position: [0, 0, 30], fov: 75 }}
          dpr={[1, 1.5]} // Lower max DPR for better performance
          performance={{ min: 0.5 }} // Reduce quality if FPS drops below 30
        >
            <FlickeringStars />
            <BlakeImage imageUrl={imageUrl} />
            {topics.length > 0 && (
              <Cloud 
                topics={topics}
                radius={28} 
                onWordHover={handleWordHover}
                onWordLeave={handleWordLeave}
              />
            )}
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <EffectComposer>
                <Bloom luminanceThreshold={0.1} intensity={0.7} levels={7} mipmapBlur />
            </EffectComposer>
        </Canvas>
    );
} 