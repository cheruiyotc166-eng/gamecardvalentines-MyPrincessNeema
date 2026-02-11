"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { useState } from "react";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function GiftBoxPage({ onNext }: { onNext: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
      setIsOpened(true);
    }, 800);
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`text-4xl lg:text-5xl text-red-600 mb-12 text-center ${playfairDisplay.className}`}
      >
        I have a surprise for you! 🎁
      </motion.h1>

      {/* Decorative emojis */}
      <div className="absolute top-10 left-10 text-3xl animate-bounce">💕</div>
      <div className="absolute top-10 right-10 text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>💖</div>
      <div className="absolute bottom-10 left-10 text-3xl animate-bounce" style={{ animationDelay: "0.4s" }}>💗</div>
      <div className="absolute bottom-10 right-10 text-3xl animate-bounce" style={{ animationDelay: "0.6s" }}>💝</div>

      {/* Gift Box Container */}
      <motion.div
        initial={{ scale: 1 }}
        animate={isOpening ? { scale: 0.95 } : { scale: 1 }}
        className="relative flex flex-col items-center"
      >
        {/* Gift Box Lid */}
        <motion.div
          animate={isOpened ? { rotateX: 150, y: -100, opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-56 h-20 bg-gradient-to-b from-pink-500 to-pink-600 rounded-t-3xl shadow-2xl mb-0 origin-bottom"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-4 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full shadow-lg" />
          </div>
        </motion.div>

        {/* Gift Box Base */}
        <motion.div
          animate={isOpened ? { y: 20 } : { y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-56 h-56 bg-gradient-to-b from-pink-500 to-pink-700 rounded-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Gift sparkles */}
          {isOpened && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-8xl">✨</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-6xl">💝</div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Button */}
      {!isOpened && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          onClick={handleOpenGift}
          disabled={isOpening}
          className="mt-12 px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 text-lg"
        >
          Open Gift 🎁
        </motion.button>
      )}

      {/* Confetti effect */}
      {isOpened && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0, x: 0 }}
              animate={{ opacity: 0, y: 200, x: (Math.random() - 0.5) * 200 }}
              transition={{ duration: 2, delay: i * 0.05 }}
              className="absolute text-2xl"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              {["💝", "💖", "💕", "✨", "🎁"][i % 5]}
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
