import { Noise } from 'noisejs';

import { generateTerrain, getBlockTransformation } from '../utils';
import { Euler, Object3D, PlaneGeometry } from 'three';
import { useRef } from 'react';
import {
  dirtMaterial,
  grassSideMaterial,
  grassTopMaterial,
} from '../materials';
import { useFrame } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import {
  CuboidCollider,
  InstancedRigidBodies,
  RapierRigidBody,
} from '@react-three/rapier';

const planeGeometry = new PlaneGeometry(1, 1, 2, 2);

const tempObject = new Object3D();
export function Terrain() {
  const noise = new Noise(Math.random());

  const terrainData = generateTerrain(12, 12, noise);
  const instances = terrainData.length;

  const rigidBodies = useRef<RapierRigidBody[]>(null);
  const topRef = useRef(null),
    bottomRef = useRef(null),
    side1Ref = useRef(null),
    side2Ref = useRef(null),
    side3Ref = useRef(null),
    side4Ref = useRef(null);

  const refs = [side1Ref, bottomRef, side2Ref, topRef, side3Ref, side4Ref];

  const physicsInstances = terrainData
    .slice(0, terrainData.length / 6)
    .map((position, i) => ({
      key: `grass_instance_${i}`,
      position: [...position],
      rotation: new Euler(0, 0, 0),
    }));

  useFrame(() => {
    terrainData.forEach((position, i) => {
      for (let j = 0; j < 6; j++) {
        const { position: transformationPos, ...rest } =
          getBlockTransformation(j);

        const newPos = position.clone().add(transformationPos);

        tempObject.position.set(newPos.x, newPos.y, newPos.z);
        tempObject.rotation.x = rest['rotation-x'] ?? 0;
        tempObject.rotation.y = rest['rotation-y'] ?? 0;
        tempObject.updateMatrix();

        refs[j].current.setMatrixAt(i, tempObject.matrix);
      }
    });

    refs.forEach((ref) => (ref.current.instanceMatrix.needsUpdate = true));
  });
  return (
    <group>
      <InstancedRigidBodies
        ref={rigidBodies}
        instances={physicsInstances}
        colliders={false}
        colliderNodes={[
          <CuboidCollider args={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />,
        ]}
      >
        <instancedMesh
          ref={topRef}
          args={[planeGeometry, grassTopMaterial, instances]}
        />
      </InstancedRigidBodies>
      <instancedMesh
        ref={side1Ref}
        args={[planeGeometry, grassSideMaterial, instances]}
      />
      <instancedMesh
        ref={side2Ref}
        args={[planeGeometry, grassSideMaterial, instances]}
      />
      <instancedMesh
        ref={side3Ref}
        args={[planeGeometry, grassSideMaterial, instances]}
      />
      <instancedMesh
        ref={side4Ref}
        args={[planeGeometry, grassSideMaterial, instances]}
      />
      <instancedMesh
        ref={bottomRef}
        args={[planeGeometry, dirtMaterial, instances]}
      />
    </group>
  );
}
