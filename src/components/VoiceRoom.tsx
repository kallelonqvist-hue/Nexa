'use client';

import { useState } from 'react';
import { useVoice } from '@/hooks/useVoice';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mic, MicOff, Volume2, VolumeX, Phone, Settings } from 'lucide-react';

interface VoiceRoomProps {
  roomId: string;
  roomName: string;
}

export const VoiceRoom = ({ roomId, roomName }: VoiceRoomProps) => {
  const {
    isConnected,
    isConnecting,
    connectionError,
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
  } = useVoice();

  const [userName, setUserName] = useState('User');
  const [showSettings, setShowSettings] = useState(false);

  const handleJoinRoom = async () => {
    await joinRoom(roomId, userName);
  };

  if (!isConnected) {
    return (
      <Card className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">🎤 {roomName}</h3>
          <p className="text-nexa-300">Join the voice channel to start talking</p>
        </div>

        {connectionError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {connectionError}
            </p>
            <p className="text-red-300 text-xs mt-2">
              Make sure your browser has microphone permissions enabled.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-nexa-200 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-nexa-900/50 border border-nexa-600/50 rounded-md text-white placeholder-nexa-500/50 focus:outline-none focus:ring-2 focus:ring-nexa-500"
            />
          </div>

          <Button
            onClick={handleJoinRoom}
            disabled={isConnecting || !userName.trim()}
            isLoading={isConnecting}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
          >
            <Phone size={20} />
            {isConnecting ? 'Joining...' : 'Join Voice Channel'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Voice Room */}
      <Card className="p-6 border-green-500/50 bg-green-500/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">🎤 {roomName}</h3>
              <Badge variant="success">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Live
              </Badge>
            </div>
            <p className="text-nexa-400 text-sm">{participants.length + 1} participants</p>
          </div>
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
          >
            <Settings size={16} />
          </Button>
        </div>

        {/* Control Panel */}
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={toggleMute}
            variant={isMuted ? 'outline' : 'default'}
            className={isMuted ? 'border-red-500/50 text-red-400' : 'bg-nexa-600'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>

          <Button
            onClick={toggleDeafen}
            variant={isDeafened ? 'outline' : 'default'}
            className={isDeafened ? 'border-orange-500/50 text-orange-400' : 'bg-nexa-600'}
          >
            {isDeafened ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isDeafened ? 'Undeafen' : 'Deafen'}
          </Button>

          <Button
            onClick={leaveRoom}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 ml-auto"
          >
            <Phone size={20} />
            Leave
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-6 pt-6 border-t border-nexa-700/30 space-y-4">
            <div>
              <label className="block text-sm font-medium text-nexa-200 mb-2">
                Master Volume: {volume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-nexa-700/50 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <p className="text-xs text-nexa-400">
              💡 Tip: Adjust individual participant volumes below
            </p>
          </div>
        )}
      </Card>

      {/* Participants */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Participants</h4>
        <div className="space-y-3">
          {/* You */}
          <Card className="p-4 border-blue-500/30 bg-blue-500/5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-white">{userName}</p>
                  <Badge variant="default" className="text-xs">You</Badge>
                </div>
                <div className="flex gap-2 text-xs">
                  {isMuted && (
                    <Badge variant="error" className="text-xs">
                      <MicOff size={12} className="mr-1" />
                      Muted
                    </Badge>
                  )}
                  {isDeafened && (
                    <Badge variant="warning" className="text-xs">
                      <VolumeX size={12} className="mr-1" />
                      Deafened
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right text-nexa-400 text-xs">Connected ✓</div>
            </div>
          </Card>

          {/* Other Participants */}
          {participants.map(participant => (
            <Card key={participant.id} className="p-4 hover:border-nexa-600/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${participant.isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                    <p className="font-medium text-white">{participant.name}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    {participant.isMuted && (
                      <Badge variant="error" className="text-xs">
                        <MicOff size={12} className="mr-1" />
                        Muted
                      </Badge>
                    )}
                    {participant.isDeafened && (
                      <Badge variant="warning" className="text-xs">
                        <VolumeX size={12} className="mr-1" />
                        Deafened
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 size={14} className="text-nexa-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={participant.volume}
                  onChange={(e) => setParticipantVolume(participant.id, Number(e.target.value))}
                  className="flex-1 h-1.5 bg-nexa-700/50 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-nexa-400 w-8 text-right">{participant.volume}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
