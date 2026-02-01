"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function Scene() {
    const mainRef = useRef<THREE.Group>(null);
    const sphereRef = useRef<THREE.Mesh>(null);

    useGSAP(() => {
        // Move the scene on scroll
        gsap.to(mainRef.current!.position, {
            y: -10,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        // Rotate on scroll
        gsap.to(mainRef.current!.rotation, {
            y: Math.PI * 2,
            z: Math.PI,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
            },
        });
    }, []);

    return (
        <group ref={mainRef}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />

            {/* Main floating orb representing "Intelligence" */}
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={sphereRef} args={[1, 64, 64]} position={[2, 1, 0]}>
                    <MeshDistortMaterial
                        color="#0D9488"
                        speed={3}
                        distort={0.4}
                        radius={1}
                        roughness={0}
                        metalness={1}
                    />
                </Sphere>
            </Float>

            {/* Smaller floating data nodes */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Float key={i} speed={Math.random() * 2} position={[
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 10
                ]}>
                    <mesh>
                        <octahedronGeometry args={[0.2, 0]} />
                        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={2} />
                    </mesh>
                </Float>
            ))}

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

            <Environment preset="city" />
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#0D9488" />
        </group>
    );
}

export function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
