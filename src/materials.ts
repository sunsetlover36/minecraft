import { DoubleSide, MeshStandardMaterial } from 'three';
import { dirtColorMap, grassSideColorMap, grassTopColorMap } from './textures';

export const grassSideMaterial = new MeshStandardMaterial({
  map: grassSideColorMap,
});
grassSideMaterial.side = DoubleSide;
export const grassTopMaterial = new MeshStandardMaterial({
  map: grassTopColorMap,
});

export const dirtMaterial = new MeshStandardMaterial({
  map: dirtColorMap,
});
