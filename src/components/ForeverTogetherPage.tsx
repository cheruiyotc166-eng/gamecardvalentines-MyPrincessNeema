"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function ForeverTogetherPage({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4 overflow-hidden">
      {/* Floating decorative emojis */}
      <motion.div 
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 text-5xl"
      >
        💕
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-40 right-8 text-6xl"
      >
        💑
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
        💕
      </motion.div>

      {/* Top decorative Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-4 mb-6 text-3xl"
      >
        <span>💕</span>
        <span>💑</span>
        <span>💖</span>
        <span>💑</span>
        <span>💕</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`text-5xl lg:text-6xl text-red-600 mb-8 text-center drop-shadow-lg ${playfairDisplay.className}`}
      >
        Forever Together 💕
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row gap-10 max-w-6xl items-center justify-center"
      >
        {/* Couple Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex-1 flex justify-center relative"
        >
          <div className="relative">
            {/* Decorative elements around photo */}
            <div className="absolute -top-10 -left-10 text-5xl animate-bounce">💕</div>
            <div className="absolute -top-8 -right-8 text-5xl animate-bounce" style={{ animationDelay: "0.2s" }}>💖</div>
            <div className="absolute -bottom-8 -left-8 text-5xl animate-bounce" style={{ animationDelay: "0.4s" }}>💑</div>
            <div className="absolute -bottom-10 -right-10 text-5xl animate-bounce" style={{ animationDelay: "0.6s" }}>💕</div>
            
            <Image
              src="/downloads/20260211.jpg"
              alt="Us Forever"
              width={420}
              height={520}
              className="rounded-2xl shadow-2xl object-cover border-4 border-pink-200"
              priority
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex-1 flex flex-col items-center lg:items-start gap-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl text-gray-800 text-center lg:text-left leading-10 font-medium"
          >
            We've shared so many special memories together, and I can't wait to create more! 💕
          </motion.p>

          {/* Decorative emojis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex gap-4 justify-center text-5xl"
          >
            <span>💕</span>
            <span>💑</span>
            <span>💖</span>
            <span>💑</span>
            <span>💕</span>
          </motion.div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-10 py-5 bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all text-xl shadow-lg"
          >
            Continue 💕
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom decorative Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center gap-4 mt-12 text-3xl"
      >
        <span>💖</span>
        <span>💑</span>
        <span>💕</span>
        <span>💑</span>
        <span>💖</span>
      </motion.div>
    </div>
  );
}
