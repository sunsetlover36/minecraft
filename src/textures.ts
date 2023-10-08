import {
  LinearSRGBColorSpace,
  NearestFilter,
  SRGBColorSpace,
  TextureLoader,
} from 'three';

const textureLoader = new TextureLoader();

export const dirtColorMap = textureLoader.load('/dirt.webp');
dirtColorMap.magFilter = NearestFilter;

export const grassSideColorMap = textureLoader.load('/grass-side.webp');
grassSideColorMap.magFilter = NearestFilter;

export const grassTopColorMap = textureLoader.load('/grass-top.png');
grassTopColorMap.magFilter = NearestFilter;
