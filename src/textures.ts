import { NearestFilter, TextureLoader } from 'three';

const textureLoader = new TextureLoader();

export const dirtColorMap = textureLoader.load('/dirt.webp');
dirtColorMap.magFilter = NearestFilter;

export const grassSideColorMap = textureLoader.load('/grass-side.webp');
grassSideColorMap.magFilter = NearestFilter;

export const grassTopColorMap = textureLoader.load('/grass-top.png');
grassTopColorMap.magFilter = NearestFilter;

const destroyZeroStageColorMap = textureLoader.load('/destroy_0.png');
destroyZeroStageColorMap.magFilter = NearestFilter;
const destroyFirstStageColorMap = textureLoader.load('/destroy_1.png');
destroyFirstStageColorMap.magFilter = NearestFilter;
const destroySecondStageColorMap = textureLoader.load('/destroy_2.png');
destroySecondStageColorMap.magFilter = NearestFilter;
const destroyThirdStageColorMap = textureLoader.load('/destroy_3.png');
destroyThirdStageColorMap.magFilter = NearestFilter;
const destroyFourthStageColorMap = textureLoader.load('/destroy_4.png');
destroyFourthStageColorMap.magFilter = NearestFilter;
const destroyFifthtageColorMap = textureLoader.load('/destroy_5.png');
destroyFifthtageColorMap.magFilter = NearestFilter;
const destroySixthStageColorMap = textureLoader.load('/destroy_6.png');
destroySixthStageColorMap.magFilter = NearestFilter;
const destroySeventhStageColorMap = textureLoader.load('/destroy_7.png');
destroySeventhStageColorMap.magFilter = NearestFilter;
const destroyEighthStageColorMap = textureLoader.load('/destroy_8.png');
destroyEighthStageColorMap.magFilter = NearestFilter;
const destroyNinethStageColorMap = textureLoader.load('/destroy_9.png');
destroyNinethStageColorMap.magFilter = NearestFilter;

export const destroyStages = [
  destroyZeroStageColorMap,
  destroyFirstStageColorMap,
  destroySecondStageColorMap,
  destroyThirdStageColorMap,
  destroyFourthStageColorMap,
  destroyFifthtageColorMap,
  destroySixthStageColorMap,
  destroySeventhStageColorMap,
  destroyEighthStageColorMap,
  destroyNinethStageColorMap,
];
