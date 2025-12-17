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
        <main className="relative w-full h-[100dvh] overflow-hidden bg-neutral-900">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Scene currentViseme={currentViseme} />
            </div>

            {/* UI Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-xl px-4 md:bottom-10">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl transition-all md:rounded-2xl md:bg-black/40">
                    <div className="flex gap-3 items-end md:gap-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-transparent text-white w-full outline-none resize-none h-16 max-h-32 py-3 text-base placeholder-white/50 font-light md:h-24"
                            placeholder="Type a message..."
                        />
                        <div className="flex flex-col gap-2 justify-end pb-1">
                            <button
                                onClick={handleSpeak}
                                disabled={isSpeaking}
                                className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ${isSpeaking
                                    ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-neutral-200 active:scale-95'
                                    }`}
                            >
                                {isSpeaking ? <Mic className="w-5 h-5 animate-pulse md:w-6 md:h-6" /> : <Send className="w-5 h-5 md:w-6 md:h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
