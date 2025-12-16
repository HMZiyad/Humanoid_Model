'use client';
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Viseme } from '@/hooks/useLipSync';

interface AvatarProps {
    currentViseme: Viseme;
}

const MODEL_URL = '/avatar.glb';

export function Avatar({ currentViseme }: AvatarProps) {
    const { scene } = useGLTF(MODEL_URL);
    const headMeshRef = useRef<THREE.Mesh | null>(null);

    useEffect(() => {
        // Traverse to find the head mesh with morph targets
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                // "Wolf3D_Head" or "Wolf3D_Avatar" usually holds the face morphs
                if (mesh.morphTargetDictionary && (child.name.includes('Head') || child.name.includes('Avatar'))) {
                    console.log("Head Mesh found:", child.name);
                    headMeshRef.current = mesh;
                }
            }
        });

        // Reset influences
        if (headMeshRef.current && headMeshRef.current.morphTargetInfluences) {
            headMeshRef.current.morphTargetInfluences.fill(0);
        }
    }, [scene]);

    useFrame((state, delta) => {
        if (headMeshRef.current && headMeshRef.current.morphTargetDictionary && headMeshRef.current.morphTargetInfluences) {
            // 1. Reset all visemes to 0 (smoothly if possible, but for now strict set)
            const dict = headMeshRef.current.morphTargetDictionary;

            // List of all visemes we control
            const visemeKeys = Object.keys(dict).filter(k => k.startsWith('viseme_'));

            visemeKeys.forEach(key => {
                const index = dict[key];
                const targetValue = (key === currentViseme) ? 1.0 : 0.0;

                // Smooth lerp for better animation
                headMeshRef.current!.morphTargetInfluences![index] = THREE.MathUtils.lerp(
                    headMeshRef.current!.morphTargetInfluences![index],
                    targetValue,
                    delta * 15 // Speed
                );
            });

            // Idle Head Bob
            scene.rotation.y = Math.PI + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return <primitive object={scene} position={[0, -1.6, 0]} scale={1.2} />; // Adjust pos/scale for Brunette
}

useGLTF.preload(MODEL_URL);
