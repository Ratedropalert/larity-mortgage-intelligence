"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Text, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CardContent() {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Main Glassy Card */}
                <RoundedBox args={[4, 2.5, 0.1]} radius={0.1} smoothness={4}>
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.9}
                        thickness={0.5}
                        roughness={0.1}
                        metalness={0.1}
                        ior={1.5}
                    />
                </RoundedBox>

                {/* Data Bars */}
                <mesh position={[-1.2, 0.4, 0.1]}>
                    <planeGeometry args={[1.5, 0.1]} />
                    <meshStandardMaterial color="#0D9488" emissive="#0D9488" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[-1.4, 0.1, 0.1]}>
                    <planeGeometry args={[1, 0.1]} />
                    <meshStandardMaterial color="#3B82F6" />
                </mesh>

                {/* Percentage Text */}
                <Text
                    position={[1, 0, 0.1]}
                    fontSize={0.6}
                    color="#111827"
                >
                    6.25%
                </Text>
                <Text
                    position={[1, -0.6, 0.1]}
                    fontSize={0.2}
                    color="#4B5563"
                >
                    OPTIMIZED RATE
                </Text>
            </Float>
        </group>
    );
}

export function FloatingCard3D() {
    return (
        <div className="w-full h-[400px] lg:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <CardContent />
                <Environment preset="city" />
                <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            </Canvas>
        </div>
    );
}
