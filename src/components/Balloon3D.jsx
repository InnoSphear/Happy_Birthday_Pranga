import { Float } from '@react-three/drei';

export default function Balloon3D({ color = "#ff4b4b", position = [0, 0, 0], floatSpeed = 1.5, floatIntensity = 2, scale = 1 }) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={floatIntensity} position={position}>
      <group scale={scale}>
        {/* Balloon Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          {/* Safe material for mobile and constrained GPUs avoiding WebGL float crash */}
          <meshStandardMaterial 
            color={color} 
            roughness={0.2}
            metalness={0.1}
            envMapIntensity={1.5}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
        
        {/* Balloon Knot */}
        <mesh position={[0, -0.52, 0]}>
          <coneGeometry args={[0.08, 0.1, 16]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
        
        {/* Balloon String */}
        <mesh position={[0, -1.02, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 1, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={0.4} transparent />
        </mesh>
      </group>
    </Float>
  );
}
