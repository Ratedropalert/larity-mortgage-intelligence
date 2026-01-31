"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    Text,
    ContactShadows,
    Environment,
    Box
} from "@react-three/drei";
import * as THREE from "three";

interface RateVizProps {
    rate: number;
    payment: number;
    color: string;
}

function RateCard({ rate, payment, color }: RateVizProps) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.1;
        }
    });

    return (
        <group>
            <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
                <group ref={meshRef}>
                    {/* The Premium Obsidian Card - Sharp Edges */}
                    <Box args={[3.8, 5.2, 0.2]}>
                        <meshStandardMaterial
                            color="#050505"
                            metalness={0.9}
                            roughness={0.1}
                            envMapIntensity={2}
                        />
                    </Box>

                    {/* Minimal Bezel / Wireframe Overlay */}
                    <Box args={[3.82, 5.22, 0.21]} position={[0, 0, 0]}>
                        <meshStandardMaterial
                            color="#ffffff"
                            wireframe
                            opacity={0.05}
                            transparent
                        />
                    </Box>

                    {/* Content Layer */}
                    <group position={[0, 0, 0.12]}>
                        <Text
                            position={[0, 1.8, 0]}
                            fontSize={0.12}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            letterSpacing={0.4}
                            opacity={0.2}
                            transparent
                        >
                            NODE_SYSTEM_SURVEILLANCE
                        </Text>

                        <Text
                            position={[0, 0.6, 0]}
                            fontSize={0.8}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="300"
                            letterSpacing={-0.02}
                        >
                            {rate.toFixed(1)}%
                        </Text>

                        <Text
                            position={[0, -0.3, 0]}
                            fontSize={0.1}
                            color="#3b82f6"
                            anchorX="center"
                            anchorY="middle"
                            letterSpacing={0.3}
                            opacity={0.6}
                            transparent
                        >
                            LIVE_YIELD_DELTA
                        </Text>

                        {/* Divider - Sharp Line */}
                        <mesh position={[0, -1.2, 0]}>
                            <planeGeometry args={[2.5, 0.005]} />
                            <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
                        </mesh>

                        <Text
                            position={[0, -1.9, 0]}
                            fontSize={0.6}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="300"
                        >
                            ${payment.toLocaleString()}
                        </Text>

                        <Text
                            position={[0, -2.5, 0]}
                            fontSize={0.09}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            opacity={0.15}
                            transparent
                            letterSpacing={0.2}
                        >
                            MONTHLY_EFFICIENCY_TARGET
                        </Text>
                    </group>
                </group>
            </Float>

            <ContactShadows
                position={[0, -3.5, 0]}
                opacity={0.6}
                scale={10}
                blur={2}
                far={4}
                color="#000000"
            />
        </group>
    );
}

export default function RateViz({ rate, payment, color }: RateVizProps) {
    return (
        <div className="w-full h-full relative">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }} // Zoomed out slightly for more architecture
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, 10, 5]} intensity={1} color="#3b82f6" />

                    <RateCard rate={rate} payment={payment} color={color} />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
