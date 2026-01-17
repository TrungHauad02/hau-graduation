import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center, OrbitControls } from '@react-three/drei';
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
  playAnimation = true
}: Omit<ModelProps, 'floatIntensity'>) {
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
    <group ref={groupRef} position={position} rotation={rotation}>
      <Center>
        <primitive object={clonedScene} scale={scale} />
      </Center>
    </group>
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
  interactive?: boolean; // Allow user to drag and rotate the model
}

export default function Model3DViewer({
  modelPath,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = true,
  className = '',
  cameraPosition = [0, 0, 5],
  playAnimation = true,
  interactive = false,
}: Model3DViewerProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ touchAction: interactive ? 'pan-y' : 'auto' }}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ background: 'transparent', touchAction: interactive ? 'pan-y' : 'auto' }}
        gl={{ 
          alpha: true, 
          antialias: false, // Disable antialiasing for better performance
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Allow frame rate to drop for performance
      >
        <Suspense fallback={null}>
          {/* Simplified lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <Model
            modelPath={modelPath}
            scale={scale}
            rotation={rotation}
            position={position}
            autoRotate={autoRotate && !interactive}
            playAnimation={playAnimation}
          />
          
          {/* Interactive controls - allows user to rotate the model by dragging */}
          {interactive && (
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              rotateSpeed={0.5}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              minAzimuthAngle={-Infinity}
              maxAzimuthAngle={Infinity}
              touches={{ ONE: 1, TWO: 0 }} // ONE finger = ROTATE, disable TWO finger gestures
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the models
useGLTF.preload('/aqua-anime-chibi-model/source/testupload.glb');
useGLTF.preload('/pantagruel__anime_chibi_model.glb');
