declare module 'noisejs' {
  export class Noise {
    constructor(seed: number);
    simplex2(x: number, y: number): number;
    simplex3(x: number, y: number, z: number): number;
    // Add other methods here
  }
}
