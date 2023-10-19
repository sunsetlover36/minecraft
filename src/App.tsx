import {
  KeyboardControls,
  OrbitControls,
  PointerLockControls,
  Sky,
  Text3D,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import { Terrain, Player } from './components';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense } from 'react';

const calmSoundtrack = new Audio('/calm1.mp3');
export const App = () => {
  const playMusic = () => {
    calmSoundtrack.play();
  };
  return (
    <main>
      <div id="dot" />
      <div id="canvas-container">
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
            { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
            { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
            { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
            { name: 'jump', keys: ['Space'] },
            { name: 'crouch', keys: ['Shift'] },
          ]}
        >
          <Canvas
            camera={{
              fov: 70,
              near: 0.1,
              far: 200,
              position: [10, 10, 10],
            }}
          >
            <Sky />
            <Perf position="top-left" />
            {/* <OrbitControls makeDefault /> */}

            <ambientLight intensity={1} />

            <Suspense>
              <Physics gravity={[0, -13, 0]}>
                <Terrain />
                <Player />
                <RigidBody position={[2, 6, 2]} rotation-x={-1}>
                  <Text3D font="/pixelify-sans.json">
                    салам от рубури
                    <meshNormalMaterial />
                  </Text3D>
                </RigidBody>
              </Physics>
            </Suspense>

            <PointerLockControls onLock={playMusic} />
          </Canvas>
        </KeyboardControls>
      </div>
    </main>
  );
};
