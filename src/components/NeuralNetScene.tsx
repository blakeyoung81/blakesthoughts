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

function BlakeImage({ imageUrl }) {
  const { viewport } = useThree();
  const scale = viewport.height * 0.9;
  return (
    <Image
      key={imageUrl}
      url={imageUrl}
      scale={[scale * 0.85, scale, 1]}
      position={[0, -viewport.height * 0.19, 0]}
      transparent
      alphaTest={0.1}
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
        <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 30], fov: 75 }}>
            <BlakeImage imageUrl={imageUrl} />
            {topics.length > 0 && (
              <Cloud 
                topics={topics}
                radius={28} 
                onWordHover={handleWordHover}
                onWordLeave={handleWordLeave}
              />
            )}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.4} />
            <EffectComposer>
                <Bloom luminanceThreshold={0.1} intensity={0.7} levels={9} mipmapBlur />
            </EffectComposer>
        </Canvas>
    );
} 