import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import { Terrain } from './groups/Terrain';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense } from 'react';
import { BoxGeometry, MeshStandardMaterial } from 'three';

export function App() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6],
        }}
      >
        <Sky />
        <Perf />
        <OrbitControls makeDefault />

        <ambientLight intensity={0.75} />

        <Suspense>
          <Physics debug>
            <Terrain />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
