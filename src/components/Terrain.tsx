import { useState } from 'react';
import { Vector3 } from 'three';
import { Noise } from 'noisejs';
import { v4 as uuidv4 } from 'uuid';

import { ToolNames } from '../types';
import { generateTerrain, BlockNames } from '../utils';
import { BreakableBlock } from '../blocks';
import { grassBreakSound, grassPlaceSound } from '../blocks/Grass';

interface Terrain {
  id: string;
  position: Vector3;
}
export const Terrain = () => {
  const noise = new Noise(Math.random());
  const [terrain, setTerrain] = useState<Terrain[]>(
    generateTerrain(16, 16, noise)
  );

  const addGrass = (position: Vector3) => {
    setTerrain((terrain) => [
      ...terrain,
      {
        id: uuidv4(),
        position,
      },
    ]);
  };
  const removeGrass = (removedId: string) => {
    setTerrain((terrain) => terrain.filter(({ id }) => id !== removedId));
  };

  return (
    <group>
      {terrain.map((data) => {
        const { id, position } = data;
        const breakingTime = 2000;

        return (
          <BreakableBlock
            key={`terrain-block-${id}`}
            blockId={id}
            blockName={BlockNames.GRASS}
            breakingTimes={{
              [ToolNames.HAND]: breakingTime,
              [ToolNames.AXE]: breakingTime,
              [ToolNames.SHOVEL]: breakingTime,
            }}
            sounds={{
              place: grassPlaceSound,
              break: grassBreakSound,
            }}
            groupProps={{
              position,
            }}
            addBlock={addGrass}
            removeBlock={removeGrass}
          />
        );
      })}
    </group>
  );
};
