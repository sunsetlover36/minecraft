import { ForwardedRef, forwardRef } from 'react';
import { RigidBody } from '@react-three/rapier';

import type { BlockProps } from '../types';
import { dirtColorMap, grassSideColorMap, grassTopColorMap } from '../textures';
import { boxGeometry, getBlockTexture } from '../utils';

export const Grass = forwardRef((props: BlockProps, ref: ForwardedRef<any>) => {
  const { hover, meshProps } = props;

  return (
    <RigidBody ref={ref} type="fixed" colliders="hull">
      <mesh geometry={boxGeometry} {...meshProps}>
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial
            attach={`material-${index}`}
            key={index}
            map={getBlockTexture(index, {
              side: grassSideColorMap,
              top: grassTopColorMap,
              bottom: dirtColorMap,
            })}
            color={hover ? 'darkturquoise' : 'white'}
          />
        ))}
      </mesh>
    </RigidBody>
  );
});

export const grassPlaceSound = new Audio('/grass_place1.mp3');
export const grassBreakSound = new Audio('/grass_break3.mp3');
