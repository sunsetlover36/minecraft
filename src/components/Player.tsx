import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import { useRef } from 'react';
import { Vector3 } from 'three';

const SPEED = 3.5;
const direction = new Vector3(),
  frontVector = new Vector3(),
  sideVector = new Vector3();
export const Player = () => {
  const [, get] = useKeyboardControls();
  const { world, rapier } = useRapier();
  const playerRef = useRef<any>(null);

  useFrame(({ camera }) => {
    if (playerRef.current) {
      const { forward, backward, left, right, jump, crouch } = get();

      const velocity = playerRef.current.linvel();
      const origin = playerRef.current.translation();
      camera.position.copy({
        ...origin,
        y: crouch ? origin.y - 0.1 : origin.y,
      });

      origin.y -= 1.498;
      frontVector.set(0, 0, Number(backward) - Number(forward));
      sideVector.set(Number(left) - Number(right), 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(crouch ? SPEED / 2 : SPEED)
        .applyEuler(camera.rotation);
      playerRef.current.setLinvel({
        x: direction.x,
        y: velocity.y,
        z: direction.z,
      });

      const ray = (world as any).castRay(
        new rapier.Ray(origin, { x: 0, y: -1, z: 0 })
      );
      const grounded = ray && ray.collider && ray.toi <= 0.03;
      if (jump && grounded) {
        playerRef.current.setLinvel({ x: 0, y: 5, z: 0 });
      }
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      colliders={false}
      type="dynamic"
      mass={0.9}
      position={[0, 4, 0]}
      enabledRotations={[false, false, false]}
      canSleep={false}
    >
      <CapsuleCollider args={[0.75, 0.75]} />
    </RigidBody>
  );
};
