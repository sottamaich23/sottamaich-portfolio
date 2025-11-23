'use client';

import { Canvas } from '@react-three/fiber';
import { Constellations } from './neural-sphere';

export function BackgroundConstellations() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Constellations />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/40" />
    </div>
  );
}