'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Loader } from '@react-three/drei';
import { Avatar } from './Avatar';
import { Viseme } from '@/hooks/useLipSync';

interface SceneProps {
    currentViseme: Viseme;
}

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

// Component to handle responsive camera positioning
function ResponsiveCamera() {
    const { camera, size } = useThree();
    const isPortraitRef = React.useRef<boolean | null>(null);

    useEffect(() => {
        // Check aspect ratio
        const aspect = size.width / size.height;
        const isPortrait = aspect < 1;

        // Only update if major orientation change (Portrait <-> Landscape) happens
        // This prevents resets when keyboard opens/closes (minor height changes)
        if (isPortraitRef.current !== isPortrait) {
            isPortraitRef.current = isPortrait;

            // If portrait (mobile), move camera back to fit the model
            if (isPortrait) {
                // Standard Z is 4. For portrait, we need more distance.
                // E.g. 0.5 aspect ratio -> double distance roughly
                camera.position.z = 6.5;
            } else {
                // Landscape or Desktop
                camera.position.z = 4;
            }
            camera.updateProjectionMatrix();
        }
    }, [camera, size]);

    return null;
}

export default function Scene({ currentViseme }: SceneProps) {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 50 }}
                style={{ height: '100%', background: 'radial-gradient(circle at 50% 50%, #2b2b2b 0%, #000 100%)' }}
            >
                <ResponsiveCamera />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} />

                <Suspense fallback={null}>
                    <Avatar currentViseme={currentViseme} />
                    <Environment preset="city" />
                </Suspense>

                {/* Unlocked orbit controls for free viewing, closer zoom allowed */}
                <OrbitControls makeDefault minDistance={1} />
            </Canvas>
            <Loader />
        </>
    );
}
