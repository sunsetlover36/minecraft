import { Noise } from 'noisejs';
import { Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';

export const generateTerrain = (width: number, depth: number, noise: Noise) => {
  const terrain = [];

  for (let x = 0; x < width; x++) {
    for (let z = 0; z < depth; z++) {
      const y = Math.floor(noise.simplex2(x / 20, z / 20) * 2);
      terrain.push({
        id: uuidv4(),
        position: new Vector3(x, y, z),
      });
    }
  }

  return terrain;
};
