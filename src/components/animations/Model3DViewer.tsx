import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment, Float, Center } from '@react-three/drei';
import type { Group } from 'three';
import { SkeletonUtils } from 'three-stdlib';

interface ModelProps {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  autoRotate?: boolean;
  floatIntensity?: number;
  playAnimation?: boolean;
}

function Model({ 
  modelPath, 
  scale = 1, 
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = true,
  floatIntensity = 1,
  playAnimation = true
}: ModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  
  // Clone the scene to avoid sharing issues between multiple instances
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  
  const { actions, names } = useAnimations(animations, groupRef);

  // Play all animations when component mounts
  useEffect(() => {
    if (playAnimation && names.length > 0) {
      // Play all available animations
      names.forEach((name) => {
        const action = actions[name];
        if (action) {
          action.reset().fadeIn(0.5).play();
        }
      });
    }

    return () => {
      // Cleanup animations
      names.forEach((name) => {
        const action = actions[name];
        if (action) {
          action.fadeOut(0.5);
        }
      });
    };
  }, [actions, names, playAnimation]);

  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2 * floatIntensity} 
      floatIntensity={0.5 * floatIntensity}
    >
      <group ref={groupRef} position={position} rotation={rotation}>
        <Center>
          <primitive object={clonedScene} scale={scale} />
        </Center>
      </group>
    </Float>
  );
}

interface Model3DViewerProps {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  autoRotate?: boolean;
  floatIntensity?: number;
  className?: string;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  showControls?: boolean;
  cameraPosition?: [number, number, number];
  playAnimation?: boolean;
}

export default function Model3DViewer({
  modelPath,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = true,
  floatIntensity = 1,
  className = '',
  environmentPreset = 'city',
  showControls = false,
  cameraPosition = [0, 0, 5],
  playAnimation = true,
}: Model3DViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Model
            modelPath={modelPath}
            scale={scale}
            rotation={rotation}
            position={position}
            autoRotate={autoRotate}
            floatIntensity={floatIntensity}
            playAnimation={playAnimation}
          />
          
          <Environment preset={environmentPreset} />
          
          {showControls && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/aqua-anime-chibi-model/source/testupload.glb');
