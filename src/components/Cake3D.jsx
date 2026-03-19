import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Text, Sparkles, Torus } from '@react-three/drei';

export default function Cake3D({ onBlowCandles }) {
  const [blown, setBlown] = useState(false);
  const flameRef = useRef();

  // Basic wobble animation for flame
  useFrame((state) => {
    if (flameRef.current && !blown) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      flameRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  const handleBlow = () => {
    if(!blown) {
        setBlown(true);
        if(onBlowCandles) onBlowCandles();
    }
  };

  return (
    <group position={[0, -0.6, 0]} scale={0.55}>
      {/* Opulent Pedestal */}
      <Cylinder args={[3.2, 3.5, 0.4, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </Cylinder>
      <Cylinder args={[3, 3, 0.2, 64]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.8} />
      </Cylinder>

      {/* Bottom Tier */}
      <Cylinder args={[2.6, 2.6, 1.2, 64]} position={[0, 1.0, 0]}>
        <meshStandardMaterial color="#341d08" roughness={0.9} /> {/* Dark Chocolate */}
      </Cylinder>
      
      {/* Bottom Tier Gold Ribbon */}
      <Cylinder args={[2.62, 2.62, 0.15, 64]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Middle Tier */}
      <Cylinder args={[2.1, 2.1, 1.0, 64]} position={[0, 2.1, 0]}>
        <meshStandardMaterial color="#5c3412" roughness={0.8} /> {/* Milk Chocolate */}
      </Cylinder>

      {/* Middle Tier Gold Ribbon */}
      <Cylinder args={[2.12, 2.12, 0.15, 64]} position={[0, 1.7, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Top Tier / Frosting */}
      <Cylinder args={[1.8, 1.8, 0.8, 64]} position={[0, 3.0, 0]}>
        <meshStandardMaterial color="#ffb3b3" roughness={0.5} /> {/* Strawberry Royal Frosting */}
      </Cylinder>

      {/* Torus Frosting Pipings */}
      <Torus args={[1.8, 0.1, 16, 64]} position={[0, 3.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </Torus>
      <Torus args={[2.1, 0.1, 16, 64]} position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </Torus>

      {/* Main Extruded Text - Happy Birthday Pranga */}
      <Text
        position={[0, 3.8, 1.2]}
        rotation={[-Math.PI / 6, 0, 0]}
        fontSize={0.4}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        Happy Birthday
      </Text>
      <Text
        position={[0, 3.4, 1.4]}
        rotation={[-Math.PI / 6, 0, 0]}
        fontSize={0.5}
        color="#ff4b4b"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        Pranga
      </Text>

      {/* Interactive Royal Candle */}
      <group position={[0, 3.8, 0]} onClick={handleBlow} onPointerOver={(e) => document.body.style.cursor = 'pointer'} onPointerOut={(e) => document.body.style.cursor = 'auto'}>
        <Cylinder args={[0.08, 0.08, 1, 32]}>
          <meshStandardMaterial color="#ffffff" metalness={0.1} />
        </Cylinder>
        {/* Candle Gold Base */}
        <Cylinder args={[0.12, 0.12, 0.1, 16]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </Cylinder>

        {/* Flame */}
        {!blown && (
          <group position={[0, 0.6, 0]} ref={flameRef}>
            <spotLight position={[0, 1, 0]} intensity={80} color="#ffaa00" distance={8} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa00" distance={3} />
            <mesh>
              <coneGeometry args={[0.1, 0.3, 16]} />
              <meshBasicMaterial color="#ffcc00" transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, -0.05, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color="#ff5500" />
            </mesh>
          </group>
        )}
      </group>

      {/* Decorative Hearts or details around the cake */}
      {Array.from({ length: 8 }).map((_, i) => (
         <Text
           key={i}
           position={[
              2.65 * Math.sin((i / 8) * Math.PI * 2), 
              1.0, 
              2.65 * Math.cos((i / 8) * Math.PI * 2)
           ]}
           rotation={[0, (i / 8) * Math.PI * 2, 0]}
           fontSize={0.3}
           color="#d4af37"
         >
           ❤
         </Text>
      ))}

      {/* Sparkles around the cake */}
      <Sparkles count={100} scale={8} size={4} speed={0.4} opacity={0.8} color="#d4af37" position={[0, 2, 0]} />
    </group>
  );
}
