import { useRef, useState, useCallback } from 'react';
import { Texture, Vector3 } from 'three';
import {
  useFrame,
  type GroupProps,
  type MeshProps,
  ThreeEvent,
} from '@react-three/fiber';

import { type BlockSounds, ToolNames } from '../types';
import { destroyStages } from '../textures';
import { boxGeometry, BlockNames, BLOCKS } from '../utils';

interface BreakableBlockProps {
  blockId: string;
  blockName: BlockNames;
  breakingTimes: Record<ToolNames, number>;
  sounds?: BlockSounds;
  groupProps?: GroupProps;
  meshProps?: MeshProps;
  addBlock: (position: Vector3) => void;
  removeBlock: (removedId: string) => void;
}
export const BreakableBlock = (props: BreakableBlockProps) => {
  const {
    blockId,
    blockName,
    breakingTimes,
    sounds = {},
    groupProps,
    meshProps,
    addBlock,
    removeBlock,
  } = props;

  const blockRef = useRef(null);
  const breakingTime = useRef<number>(0);
  const [hover, setHover] = useState<boolean>(false);
  const [breakingTextureMap, setBreakingTextureMap] = useState<Texture>();

  const Block = BLOCKS[blockName];

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(true);
  }, []);
  const onPointerOut = useCallback(() => {
    setHover(false);
    breakingTime.current = 0;
  }, []);
  const onContextMenu = useCallback((e: ThreeEvent<MouseEvent>) => {
    if (e.faceIndex) {
      e.nativeEvent.preventDefault();
      e.stopPropagation();

      const { place: placeSound } = sounds;
      if (placeSound) {
        placeSound.currentTime = 0;
        placeSound.play();
      }

      const { x, y, z } = (blockRef.current as any).translation();

      const dir = [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
      ];
      addBlock(new Vector3(...dir[Math.floor(e.faceIndex / 2)]));
    }
  }, []);
  const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    breakingTime.current = 0;
  }, []);
  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    breakingTime.current = Date.now();
  }, []);

  useFrame(() => {
    if (breakingTime.current > 0) {
      const timeToBreak = breakingTimes[ToolNames.HAND];
      const msBreaking = Date.now() - breakingTime.current;
      const indexThreshold = timeToBreak / destroyStages.length;

      if (msBreaking > timeToBreak) {
        const { break: breakSound } = sounds;
        if (breakSound) {
          breakSound.currentTime = 0;
          breakSound.play();
        }

        breakingTime.current = 0;
        removeBlock(blockId);
      } else {
        setBreakingTextureMap(
          destroyStages[Math.floor(msBreaking / indexThreshold)]
        );
      }
    }
  });

  return (
    <group {...groupProps}>
      <Block
        ref={blockRef}
        hover={hover}
        meshProps={{
          onPointerMove,
          onPointerOut,
          onPointerUp,
          onPointerDown,
          onContextMenu,
          ...meshProps,
        }}
      />
      {breakingTime.current > 0 && breakingTextureMap && (
        <mesh geometry={boxGeometry}>
          <meshBasicMaterial map={breakingTextureMap} transparent opacity={1} />
        </mesh>
      )}
    </group>
  );
};
