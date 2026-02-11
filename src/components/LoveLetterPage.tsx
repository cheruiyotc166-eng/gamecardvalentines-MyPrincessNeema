'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  display: 'swap',
  subsets: ['latin'],
});

export default function LoveLetterPage({ onNext }: { onNext: () => void }) {
  const letterContent = `My love Neema, 💕

I just wanted to remind you how much you
mean to me. Every day with you feels warmer,
brighter, and a little more magical. 💖

Thank you for the laughs, the late nights,
and the quiet moments in between. No matter
where life takes us, you are my favourite
place to return to. 🧸

I'm so grateful for you. Always. 💝

I love you so much Neema 💕

From Levin`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4 overflow-hidden">
      {/* Decorative Floating Emojis */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 left-5 text-4xl"
      >
        💕
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute top-20 right-8 text-5xl"
      >
        🧸
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-40 left-10 text-4xl"
      >
        💖
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.3 }}
        className="absolute bottom-32 right-12 text-5xl"
      >
        🧸
      </motion.div>

      {/* Main Content */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-4xl lg:text-5xl text-red-600 mb-8 text-center drop-shadow-lg ${playfairDisplay.className}`}
      >
        A Love Letter Just For You 💌
      </motion.h1>

      {/* Hearts and Bears decorative row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-3 mb-8 text-3xl"
      >
        <span>💕</span>
        <span>🧸</span>
        <span>💖</span>
        <span>🧸</span>
        <span>💕</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row gap-8 max-w-5xl items-center justify-center"
      >
        {/* Letter */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex-1 bg-gradient-to-br from-white via-pink-50 to-red-50 rounded-2xl shadow-2xl p-10 max-w-md border-2 border-pink-300"
        >
          <div
            className={`text-6xl mb-6 text-center ${playfairDisplay.className}`}
          >
            💌
          </div>
          <p className="text-gray-800 leading-10 whitespace-pre-wrap text-sm lg:text-base font-medium">
            {letterContent}
          </p>

          {/* Bottom decorative elements */}
          <div className="flex justify-center gap-2 mt-8 text-3xl">
            <span>💕</span>
            <span>💖</span>
            <span>💕</span>
          </div>
        </motion.div>

        {/* Couple Photo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex-1 flex justify-center relative"
        >
          <div className="relative">
            {/* Decorative hearts around photo */}
            <div className="absolute -top-8 -left-8 text-4xl animate-bounce">
              💕
            </div>
            <div
              className="absolute -top-6 -right-6 text-4xl animate-bounce"
              style={{ animationDelay: '0.2s' }}
            >
              🧸
            </div>
            <div
              className="absolute -bottom-6 -left-6 text-4xl animate-bounce"
              style={{ animationDelay: '0.4s' }}
            >
              💖
            </div>
            <div
              className="absolute -bottom-8 -right-8 text-4xl animate-bounce"
              style={{ animationDelay: '0.6s' }}
            >
              🧸
            </div>

            <Image
              src="/downloads/letter-photo.jpg"
              alt="Us"
              width={320}
              height={420}
              className="rounded-2xl shadow-2xl object-cover border-4 border-pink-200"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Hearts and Bears decorative row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-3 mt-8 text-3xl"
      >
        <span>🧸</span>
        <span>💕</span>
        <span>🧸</span>
        <span>💖</span>
        <span>🧸</span>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={onNext}
        className="mt-12 px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105 text-lg shadow-lg"
      >
        Continue 💕
      </motion.button>
    </div>
  );
}
