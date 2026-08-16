'use client';

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Users, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nexa-900 via-nexa-800 to-nexa-950">
      <nav className="border-b border-nexa-700/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            NEXA <span className="text-nexa-400">🚀</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:text-nexa-400">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-nexa-600 hover:bg-nexa-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Your Community.
            <span className="text-nexa-400"> Your Space. </span>
            Your Way.
          </h1>
          
          <p className="text-xl text-nexa-100 max-w-2xl mx-auto">
            Nexa is a modern community platform where people chat, create communities, and meet new people.
            Faster, simpler, and better than traditional platforms.
          </p>

          <div className="flex gap-4 justify-center pt-8 flex-wrap">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-nexa-600 hover:bg-nexa-700 text-white text-lg h-12 px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-nexa-500 text-nexa-200 hover:bg-nexa-800/50 text-lg h-12 px-8">
                Learn More
              </Button>
            </Link>
            <Link href="/todos">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg h-12 px-8">
                Try Todo App
              </Button>
            </Link>
          </div>
        </div>

        <div id="features" className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-8 hover:border-nexa-600/50 transition">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-white mb-2">Fast Chat</h3>
            <p className="text-nexa-300">Lightning-fast messaging with reactions, replies, and real-time updates.</p>
          </div>
          
          <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-8 hover:border-nexa-600/50 transition">
            <div className="text-4xl mb-4">🏘️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Communities</h3>
            <p className="text-nexa-300">Create and join communities around your interests. Simple and intuitive.</p>
          </div>
          
          <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-8 hover:border-nexa-600/50 transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Profiles</h3>
            <p className="text-nexa-300">Customize your profile with levels, badges, and show your personality.</p>
          </div>

          <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-8 hover:border-nexa-600/50 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-nexa-300">Optimized for speed with instant message delivery and smooth interactions.</p>
          </div>

          <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-8 hover:border-nexa-600/50 transition">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Safe & Secure</h3>
            <p className="text-nexa-300">Built-in moderation, reporting tools, and anti-spam protection.</p>
          </div>

          <div className="bg-nexa-800/40 border border-nexa-700/30 rounded-lg p-8 hover:border-nexa-600/50 transition">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Global Community</h3>
            <p className="text-nexa-300">Connect with people worldwide and discover communities for every interest.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
