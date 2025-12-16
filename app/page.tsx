'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLipSync } from '@/hooks/useLipSync';
import { Mic, Send } from 'lucide-react';

// Dynamic import for Scene to avoid SSR issues with Canvas
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
    const { speak, isSpeaking, currentViseme } = useLipSync();
    const [text, setText] = useState("Hello! I am a humanoid agent. I can speak and sync my lips with the audio. Try typing something!");

    const handleSpeak = () => {
        if (text.trim()) {
            speak(text);
        }
    };

    return (
        <main className="relative w-full h-screen overflow-hidden bg-neutral-900">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Scene currentViseme={currentViseme} />
            </div>

            {/* UI Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-xl px-4">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
                    <div className="flex gap-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-transparent text-white w-full outline-none resize-none h-24 placeholder-white/40 font-light"
                            placeholder="Type something for the avatar to say..."
                        />
                        <div className="flex flex-col gap-2 justify-end">
                            <button
                                onClick={handleSpeak}
                                disabled={isSpeaking}
                                className={`p-4 rounded-full transition-all duration-300 flex items-center justify-center ${isSpeaking
                                        ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95'
                                    }`}
                            >
                                {isSpeaking ? <Mic className="w-6 h-6 animate-pulse" /> : <Send className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
