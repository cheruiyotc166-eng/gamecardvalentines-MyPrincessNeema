"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function FlowersPage({ onNext }: { onNext: () => void }) {
  const flowerCaptions = [
    "You make my heart race",
    "In your eyes, I found home",
    "You're my favorite person",
    "Every day with you is a gift",
  ];

  const flowers = ["🌹", "🌺", "🌸", "🌷"];
  const decorEmojis = ["💕", "🧸", "💖", "🧸"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-8 text-5xl"
      >
        💕
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-40 right-10 text-6xl"
      >
        🧸
      </motion.div>

      <motion.div 
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-48 left-12 text-5xl"
      >
        💖
      </motion.div>

      <motion.div 
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 0.3 }}
        className="absolute bottom-32 right-10 text-6xl"
      >
        🧸
      </motion.div>

      {/* Top decorative row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 justify-center text-3xl mb-8"
      >
        <span>💕</span>
        <span>🧸</span>
        <span>💖</span>
        <span>🧸</span>
        <span>💕</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`text-5xl lg:text-6xl text-red-600 mb-12 text-center drop-shadow-lg ${playfairDisplay.className}`}
      >
        Flowers of Love 💐
      </motion.h1>

      {/* Flowers Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mb-12"
      >
        {flowers.map((flower, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + idx * 0.15, duration: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-white/40 rounded-2xl p-6 backdrop-blur-sm shadow-lg"
          >
            {/* Decorative emoji */}
            <div className="text-5xl mb-3">{decorEmojis[idx]}</div>

            {/* Flower emoji */}
            <div className="text-9xl mb-4 animate-pulse">{flower}</div>

            {/* Caption */}
            <p className="text-center text-gray-800 font-bold text-sm px-4 leading-5">
              {flowerCaptions[idx]}
            </p>

            {/* Decorative emoji below */}
            <div className="text-5xl mt-3">{decorEmojis[idx]}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-10 py-5 bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all text-xl shadow-lg"
      >
        Start Over 💕
      </motion.button>

      {/* Bottom decorative row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex gap-4 justify-center text-3xl mt-12"
      >
        <span>🧸</span>
        <span>💕</span>
        <span>🧸</span>
        <span>💖</span>
        <span>🧸</span>
      </motion.div>
    </div>
  );
}
