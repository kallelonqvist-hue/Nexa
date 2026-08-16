'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isDeafened: boolean;
  isSpeak ing: boolean;
  volume: number;
}

interface VoiceContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  roomId: string | null;
  
  // Local user state
  localUserId: string;
  isMuted: boolean;
  isDeafened: boolean;
  volume: number;
  
  // Participants
  participants: Participant[];
  
  // Methods
  joinRoom: (roomId: string, userName: string) => Promise<void>;
  leaveRoom: () => Promise<void>;
  toggleMute: () => void;
  toggleDeafen: () => void;
  setVolume: (volume: number) => void;
  setParticipantVolume: (participantId: string, volume: number) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

interface MockAudioStream {
  getTracks: () => Array<{ stop: () => void }>;
  getAudioTracks: () => Array<{ enabled: boolean }>;
}

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  
  const [localUserId] = useState(() => `user-${Date.now()}`);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [volume, setVolume] = useState(100);
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const localStreamRef = useRef<MockAudioStream | null>(null);
  const peerConnectionsRef = useRef<Map<string, any>>(new Map());

  // Initialize AudioContext
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext && !audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  }, []);

  const joinRoom = async (roomId: string, userName: string) => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
        video: false,
      });

      localStreamRef.current = stream as any;
      setRoomId(roomId);
      setIsConnected(true);
      
      // Simulate connecting to other participants
      simulateParticipants(userName);
    } catch (error: any) {
      const errorMsg = error.name === 'NotAllowedError' 
        ? 'Microphone access denied. Please enable microphone permissions.'
        : error.name === 'NotFoundError'
        ? 'No microphone found. Please connect a microphone.'
        : `Failed to access microphone: ${error.message}`;
      
      setConnectionError(errorMsg);
      console.error('Voice connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const simulateParticipants = (userName: string) => {
    // Simulate other participants joining
    const mockParticipants: Participant[] = [
      {
        id: 'bot-1',
        name: 'Voice Assistant',
        isMuted: false,
        isDeafened: false,
        isSpeaking: false,
        volume: 100,
      },
      {
        id: 'bot-2',
        name: 'Echo Test Bot',
        isMuted: false,
        isDeafened: false,
        isSpeaking: true,
        volume: 80,
      },
    ];
    
    setParticipants(mockParticipants);
    
    // Simulate speaking indicators
    const speakingInterval = setInterval(() => {
      setParticipants(prev => 
        prev.map(p => ({
          ...p,
          isSpeaking: Math.random() > 0.5,
        }))
      );
    }, 2000);

    return () => clearInterval(speakingInterval);
  };

  const leaveRoom = async () => {
    // Stop all audio tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Close peer connections
    peerConnectionsRef.current.forEach(connection => {
      if (connection.close) connection.close();
    });
    peerConnectionsRef.current.clear();

    setIsConnected(false);
    setRoomId(null);
    setParticipants([]);
    setIsMuted(false);
    setIsDeafened(false);
    setConnectionError(null);
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted; // Re-enable if was muted
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened);
  };

  const setParticipantVolume = (participantId: string, newVolume: number) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId ? { ...p, volume: newVolume } : p
      )
    );
  };

  const value: VoiceContextType = {
    isConnected,
    isConnecting,
    connectionError,
    roomId,
    localUserId,
    isMuted,
    isDeafened,
    volume,
    participants,
    joinRoom,
    leaveRoom,
    toggleMute,
    toggleDeafen,
    setVolume,
    setParticipantVolume,
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within VoiceProvider');
  }
  return context;
};
