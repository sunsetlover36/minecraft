import { type MeshProps } from '@react-three/fiber';

export interface BlockProps {
  hover?: boolean;
  meshProps?: MeshProps;
}
export interface BlockSounds {
  place?: HTMLAudioElement;
  break?: HTMLAudioElement;
}
