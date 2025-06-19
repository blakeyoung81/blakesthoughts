import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Image, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Word({ topic, onHover, onLeave, ...props }) {
  const ref = useRef();
  
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
    const url = `/topics/${topic.toLowerCase().replace(/ /g, '-')}`;
    window.location.href = url;
  };

  const handlePointerOver = (e) => {
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

function Cloud({ topics, radius, onWordHover, onWordLeave }) {
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
  const [flickerOffsets] = useState(() => Array.from({ length: 5 }, () => Math.random() * 100));
  
  useFrame(({ clock }) => {
    if (!starsRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Create much more dramatic flickering effect with multiple frequencies
    const flicker1 = Math.sin(time * 4 + flickerOffsets[0]) * 0.3;
    const flicker2 = Math.sin(time * 7.5 + flickerOffsets[1]) * 0.2;
    const flicker3 = Math.sin(time * 12 + flickerOffsets[2]) * 0.15;
    const flicker4 = Math.sin(time * 2.3 + flickerOffsets[3]) * 0.25;
    const flicker5 = Math.sin(time * 15.7 + flickerOffsets[4]) * 0.1;
    
    const combinedFlicker = 0.4 + flicker1 + flicker2 + flicker3 + flicker4 + flicker5;
    const rotationSpeed = time * 0.015;
    
    // Apply rotation for gentle movement
    starsRef.current.rotation.x = rotationSpeed * 0.1;
    starsRef.current.rotation.y = rotationSpeed * 0.05;
    starsRef.current.rotation.z = rotationSpeed * 0.02;
    
    // Apply dramatic flickering by modifying the material opacity
    if (starsRef.current.material) {
      starsRef.current.material.opacity = Math.max(0.1, Math.min(1.0, combinedFlicker));
      starsRef.current.material.needsUpdate = true;
    }
  });

  return (
    <Stars 
      ref={starsRef}
      radius={120} 
      depth={80} 
      count={12000} 
      factor={8} 
      saturation={0} 
      fade 
      speed={0.3}
    />
  );
}

function BlakeImage({ imageUrl }) {
  const { viewport } = useThree();
  const scale = viewport.height * 0.9;
  const meshRef = useRef();
  
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
      scale={[scale * 0.85, scale, 1]}
      position={[0, -viewport.height * 0.19, 5]} // Move slightly forward
      transparent={true}
      alphaTest={0.001}
      depthWrite={false}
    />
  );
}

export function NeuralNetScene({ topics = [] }) {
    const [imageUrl, setImageUrl] = useState('/Default.png');

    const handleWordHover = (topic) => {
      setImageUrl(`/${topic}.png`);
    };

    const handleWordLeave = () => {
      setImageUrl('/Default.png');
    };

    return (
        <Canvas 
          gl={{ 
            alpha: true, 
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: true
          }} 
          camera={{ position: [0, 0, 30], fov: 75 }}
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
                <Bloom luminanceThreshold={0.05} intensity={0.9} levels={9} mipmapBlur />
            </EffectComposer>
        </Canvas>
    );
} 