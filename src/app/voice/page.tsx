'use client';

import { VoiceProvider } from '@/hooks/useVoice';
import { VoiceRoom } from '@/components/VoiceRoom';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function VoicePage() {
  return (
    <VoiceProvider>
      <div className="min-h-screen bg-gradient-to-br from-nexa-900 via-nexa-800 to-nexa-950">
        {/* Header */}
        <header className="border-b border-nexa-700/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/">
              <div className="text-2xl font-bold text-white cursor-pointer hover:text-nexa-400 transition">
                NEXA <span className="text-nexa-400">🚀</span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-nexa-300 hover:text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Voice Chat 🎤</h1>
            <p className="text-nexa-300">Connect with others in real-time using high-quality voice communication</p>
          </div>

          <VoiceRoom roomId="general-1" roomName="General Voice" />
        </div>
      </div>
    </VoiceProvider>
  );
}
