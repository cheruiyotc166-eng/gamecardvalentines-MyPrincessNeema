"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { useState } from "react";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function EnvelopePage({ onNext }: { onNext: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenEnvelope = () => {
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
      {/* Floating decoration */}
      <motion.div 
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-8 text-5xl"
      >
        🧸
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-40 right-10 text-5xl"
      >
        💌
      </motion.div>

      <motion.div 
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-(48) left-12 text-5xl"
      >
        💕
      </motion.div>

      <motion.div 
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 0.3 }}
        className="absolute bottom-32 right-10 text-5xl"
      >
        🧸
      </motion.div>

      {/* Top decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 justify-center text-3xl mb-8"
      >
        <span>🧸</span>
        <span>💌</span>
        <span>💕</span>
        <span>💌</span>
        <span>🧸</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`text-5xl lg:text-6xl text-red-600 mb-12 text-center drop-shadow-lg ${playfairDisplay.className}`}
      >
        OMG, you said yes! 💕
      </motion.h1>

      {/* Envelope Container */}
      <motion.div
        initial={{ scale: 1 }}
        animate={isOpening ? { scale: 0.95 } : { scale: 1 }}
        className="relative w-80 h-96 flex items-center justify-center"
      >
        {/* Envelope Back */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-red-100 to-red-300 rounded-2xl shadow-2xl border-4 border-pink-200" />

        {/* Envelope Front (initial state) */}
        {!isOpened && (
          <motion.div
            animate={isOpening ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 border-4 border-pink-200"
            style={{ perspective: "1000px" }}
          >
            {/* Envelope flap */}
            <div className="w-full h-20 bg-gradient-to-b from-red-300 to-red-500 rounded-t-xl mb-4 flex items-center justify-center shadow-lg">
              <div className="text-5xl animate-bounce">💌</div>
            </div>

            {/* Love emojis on envelope */}
            <div className="text-6xl mb-6">💕💌💕</div>
            <p className={`text-center text-red-700 text-xl font-bold ${playfairDisplay.className}`}>
              A Love Letter For You
            </p>
            <div className="flex gap-4 mt-6 text-3xl">
              <span className="animate-bounce">🧸</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>💕</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>🧸</span>
            </div>
          </motion.div>
        )}

        {/* Opened envelope content */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <div className="text-6xl text-center">
              <div className="mb-4 animate-bounce">💌</div>
              <div className="flex gap-3 justify-center text-5xl mb-4">
                <span>💕</span>
                <span>🧸</span>
                <span>💕</span>
                <span>🧸</span>
                <span>💕</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Button */}
      {!isOpened && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="mt-12 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 text-lg"
        >
          Open Letter 💌
        </motion.button>
      )}

      {/* Floating hearts and teddy bears */}
      {isOpened && (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0, x: 0 }}
              animate={{ opacity: 0, y: 200, x: (Math.random() - 0.5) * 200 }}
              transition={{ duration: 2, delay: i * 0.1 }}
              className="absolute text-3xl"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              {["💕", "🧸", "💌", "💖", "🧸"][i % 5]}
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
