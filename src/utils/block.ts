import { BoxGeometry, Texture, Vector3 } from 'three';

import { BLOCK_BOTTOM_SIDE_INDEX, BLOCK_TOP_SIDE_INDEX } from './constants';
import { Grass } from '../blocks/Grass';

interface BlockTransformation {
  position: Vector3;
  'rotation-x'?: number;
  'rotation-y'?: number;
}
export const getBlockTransformation = (index: number): BlockTransformation => {
  switch (index) {
    case 0:
      return {
        position: new Vector3(),
      };
    case 1:
      return {
        position: new Vector3(0, -0.5, 0.5),
        'rotation-x': Math.PI * 0.5,
      };
    case 2:
      return {
        position: new Vector3(0, 0, 1),
      };
    case 3:
      return {
        position: new Vector3(0, 0.5, 0.5),
        'rotation-x': -Math.PI * 0.5,
      };
    case 4:
      return {
        position: new Vector3(0.5, 0, 0.5),
        'rotation-y': Math.PI * 0.5,
      };
    case 5:
      return {
        position: new Vector3(-0.5, 0, 0.5),
        'rotation-y': Math.PI * 0.5,
      };
    default:
      return {
        position: new Vector3(),
      };
  }
};

interface BlockMaterials {
  side: Texture;
  bottom: Texture;
  top: Texture;
}
export const getBlockTexture = (index: number, materials: BlockMaterials) => {
  const { side, bottom, top } = materials;
  switch (index) {
    case BLOCK_BOTTOM_SIDE_INDEX:
      return bottom;
    case BLOCK_TOP_SIDE_INDEX:
      return top;
    default:
      return side;
  }
};

export const boxGeometry = new BoxGeometry();

export enum BlockNames {
  GRASS = 'Grass',
}
export const BLOCKS = {
  [BlockNames.GRASS]: Grass,
};
