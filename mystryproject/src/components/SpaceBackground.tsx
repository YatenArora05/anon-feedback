'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Stars effect */}
        <Stars
          radius={100} // Radius of the star field
          depth={50}   // Depth of field
          count={5000} // Number of stars
          factor={4}   // Size factor
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
