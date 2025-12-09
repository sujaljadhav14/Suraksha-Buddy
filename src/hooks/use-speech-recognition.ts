'use client';

import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
}

declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}

export function useSpeechRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognitionAPI) {
                setIsSupported(true);
                const recognitionInstance = new SpeechRecognitionAPI();
                recognitionInstance.continuous = false;
                recognitionInstance.interimResults = false;
                recognitionInstance.lang = 'en-US';

                recognitionInstance.onstart = () => {
                    setIsListening(true);
                    setError(null);
                };

                recognitionInstance.onend = () => {
                    setIsListening(false);
                };

                recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                    setIsListening(false);

                    switch (event.error) {
                        case 'not-allowed':
                            setError('Microphone access denied. Please enable microphone permissions.');
                            break;
                        case 'no-speech':
                            setError('No speech detected. Please try again.');
                            break;
                        case 'network':
                            setError('Network error. Please check your connection.');
                            break;
                        default:
                            setError('An error occurred. Please try again.');
                    }
                };

                recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                    const lastResult = event.results[event.results.length - 1];
                    const transcriptText = lastResult[0].transcript;
                    setTranscript(transcriptText);
                };

                setRecognition(recognitionInstance);
            } else {
                setIsSupported(false);
            }
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognition && isSupported && !isListening) {
            setTranscript('');
            setError(null);
            try {
                recognition.start();
            } catch (err) {
                console.error('Error starting recognition:', err);
                setError('Failed to start voice recognition.');
            }
        }
    }, [recognition, isSupported, isListening]);

    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop();
        }
    }, [recognition, isListening]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
        setError(null);
    }, []);

    return {
        isListening,
        transcript,
        isSupported,
        error,
        startListening,
        stopListening,
        resetTranscript,
    };
}
