"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

interface RateVizProps {
    rate: number;
    payment: number;
    color: string;
}

function RateCard({ rate, payment, color }: RateVizProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Custom slow smooth rotation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group ref={meshRef}>
                    <RoundedBox args={[3, 4, 0.2]} radius={0.1} smoothness={4}>
                        <meshStandardMaterial
                            color="#ffffff"
                            metalness={0.1}
                            roughness={0.1}
                            emissive={color}
                            emissiveIntensity={0.2}
                        />
                    </RoundedBox>

                    {/* Rate Text */}
                    <Text
                        position={[0, 0.8, 0.15]}
                        fontSize={0.6}
                        color="#0f172a"
                        font="/fonts/Inter-Bold.ttf" // Fallback to default if not found
                        anchorX="center"
                        anchorY="middle"
                    >
                        {rate.toFixed(1)}%
                    </Text>
                    <Text
                        position={[0, 0.2, 0.15]}
                        fontSize={0.15}
                        color="#64748b"
                        anchorX="center"
                        anchorY="middle"
                    >
                        INTEREST RATE
                    </Text>

                    {/* Payment Text */}
                    <Text
                        position={[0, -0.8, 0.15]}
                        fontSize={0.4}
                        color="#16a34a"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ${payment}
                    </Text>
                    <Text
                        position={[0, -1.3, 0.15]}
                        fontSize={0.15}
                        color="#64748b"
                        anchorX="center"
                        anchorY="middle"
                    >
                        EST. MONTHLY
                    </Text>
                </group>
            </Float>

            <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={10}
                blur={2}
                far={4.5}
            />
        </group>
    );
}

// Minimal implementation of roundedBoxGeometry if not available in three core
// Actually, I'll use a simple Box if I don't want to import more things.
// Wait, Drei has RoundedBox but I need to import it.
import { RoundedBox } from "@react-three/drei";

export default function RateViz({ rate, payment, color }: RateVizProps) {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 35 }}
                dpr={[1, 1.5]} // Performance limit
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <RateCard rate={rate} payment={payment} color={color} />

                {/* Subtle environment for reflections */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
