import { useState, useRef, useEffect, useCallback } from 'react';

// Viseme mapping for Ready Player Me (ARKit compatible)
// These keys match the morph targets in the GLB
export type Viseme = 'viseme_aa' | 'viseme_E' | 'viseme_I' | 'viseme_O' | 'viseme_U' | 'viseme_FF' | 'viseme_TH' | 'viseme_PP' | 'viseme_DD' | 'viseme_kk' | 'viseme_CH' | 'viseme_SS' | 'viseme_nn' | 'viseme_RR' | 'viseme_sil';

const VISEME_MAP: { [key: string]: Viseme } = {
    'a': 'viseme_aa',
    'e': 'viseme_E',
    'i': 'viseme_I',
    'o': 'viseme_O',
    'u': 'viseme_U',
    'f': 'viseme_FF',
    'v': 'viseme_FF',
    't': 'viseme_TH',
    'h': 'viseme_TH',
    'd': 'viseme_DD',
    'k': 'viseme_kk',
    'g': 'viseme_kk',
    's': 'viseme_SS',
    'z': 'viseme_SS',
    'n': 'viseme_nn',
    'm': 'viseme_PP',
    'b': 'viseme_PP',
    'p': 'viseme_PP',
    'r': 'viseme_RR',
    // Default fallback
    'default': 'viseme_sil'
};

export const useLipSync = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentViseme, setCurrentViseme] = useState<Viseme>('viseme_sil');
    const [audioSource, setAudioSource] = useState<SpeechSynthesisUtterance | null>(null);

    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        // Cancel current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        // Select a female voice if available
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google US English'));
        if (femaleVoice) utterance.voice = femaleVoice;

        utterance.rate = 1.0;
        utterance.pitch = 1.2;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            setCurrentViseme('viseme_sil');
        };

        // Simple Lip Sync Logic:
        let charIndex = 0;
        const intervalTime = 60; // ms per char (approx speed)
        let syncInterval: NodeJS.Timeout;

        utterance.onstart = () => {
            setIsSpeaking(true);
            const words = text.split(' ');

            syncInterval = setInterval(() => {
                if (charIndex >= text.length) {
                    clearInterval(syncInterval);
                    setCurrentViseme('viseme_sil');
                    return;
                }

                const char = text[charIndex].toLowerCase();
                const viseme = VISEME_MAP[char] || VISEME_MAP['default'];

                if (char === ' ') {
                    setCurrentViseme('viseme_sil');
                } else {
                    setCurrentViseme(viseme);
                }

                charIndex++;
            }, intervalTime);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            clearInterval(syncInterval);
            setCurrentViseme('viseme_sil');
        }

        window.speechSynthesis.speak(utterance);
        setAudioSource(utterance);
    }, []);

    return { speak, isSpeaking, currentViseme };
};
