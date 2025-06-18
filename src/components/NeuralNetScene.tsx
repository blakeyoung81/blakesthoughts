import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Image, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Word({ topic, onHover, onLeave, ...props }) {
  const ref = useRef();
  
  const [velocity, sin, cos] = useMemo(() => {
    const velocity = new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
    const sin = Math.random() * 2 * Math.PI;
    const cos = Math.random() * 2 * Math.PI;
    return [velocity, sin, cos];
  }, []);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime() * 0.1;
    ref.current.position.x += Math.sin(time + sin) * 0.01;
    ref.current.position.y += Math.cos(time + cos) * 0.01;
    ref.current.position.z += Math.sin(time + cos) * 0.01;
    const target = ref.current.position.clone().add(new THREE.Vector3(-mouse.x * 0.5, -mouse.y * 0.5, 0));
    ref.current.position.lerp(target, 0.01);
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
  const count = topics.length;
  return (
    <>
      {topics.map((topic, i) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const position = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
        return (
          <Word 
            key={i} 
            topic={topic} 
            onHover={onWordHover} 
            onLeave={onWordLeave} 
            position={position} 
          />
        );
      })}
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
    console.log('NeuralNetScene received topics:', topics);
    console.log('Topics type:', typeof topics);
    console.log('Topics is array:', Array.isArray(topics));
    console.log('Topics length:', topics?.length);
    
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