import { Float } from '@react-three/drei';

export default function Flower3D({ position = [0,0,0], color = "#ff69b4", scale = 1, rotation = [0,0,0] }) {
  const numPetals = 8;
  const petals = Array.from({ length: numPetals }).map((_, i) => {
    const angle = (i / numPetals) * Math.PI * 2;
    return (
      <group key={i} rotation={[0, 0, angle]}>
        {/* Push petal out and tilt it slightly forward to form a cup shape */}
        <mesh position={[0.2, 0, 0.05]} rotation={[0, 0.3, 0]}>
          {/* Squashed sphere acts as a realistic petal */}
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      </group>
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8} position={position}>
      <group scale={scale} rotation={rotation}>
        {/* Center/Pistil */}
        <mesh position={[0, 0, 0.12]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffd700" roughness={0.6} />
        </mesh>
        
        {/* All Petals */}
        {petals}
        
        {/* Stem */}
        <mesh position={[0, -0.8, -0.05]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
          <meshStandardMaterial color="#228b22" roughness={0.7} />
        </mesh>
        
        {/* Simple Leaf attached to stem */}
        <mesh position={[0.15, -0.6, -0.05]} rotation={[0, 0, -0.5]}>
          {/* Leaf as a squashed flat sphere */}
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#228b22" roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
}
