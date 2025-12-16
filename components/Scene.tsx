'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Loader } from '@react-three/drei';
import { Avatar } from './Avatar';
import { Viseme } from '@/hooks/useLipSync';

interface SceneProps {
    currentViseme: Viseme;
}

export default function Scene({ currentViseme }: SceneProps) {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 50 }}
                style={{ height: '100vh', background: 'radial-gradient(circle at 50% 50%, #2b2b2b 0%, #000 100%)' }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} />

                <Suspense fallback={null}>
                    <Avatar currentViseme={currentViseme} />
                    <Environment preset="city" />
                </Suspense>

                {/* Unlocked orbit controls for free viewing */}
                <OrbitControls makeDefault />
            </Canvas>
            <Loader />
        </>
    );
}
