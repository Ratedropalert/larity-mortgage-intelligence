"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    className?: string;
}

export function FadeIn({
    children,
    delay = 0,
    direction,
    duration = 0.5,
    className,
}: FadeInProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
                x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
            }}
            viewport={{ once: true }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
