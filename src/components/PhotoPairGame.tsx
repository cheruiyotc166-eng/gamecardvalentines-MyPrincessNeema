'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Fireworks from '@fireworks-js/react';

// 18 unique images
const baseImages = [
  '/game-photos/1.jpg',
  '/game-photos/2.jpg',
  '/game-photos/3.jpg',
  '/game-photos/4.jpg',
  '/game-photos/5.jpg',
  '/game-photos/6.jpg',
  '/game-photos/7.jpg',
  '/game-photos/8.jpg',
  '/game-photos/9.jpg',
  '/game-photos/10.jpg',
  '/game-photos/11.jpg',
  '/game-photos/12.jpg',
  '/game-photos/13.jpg',
  '/game-photos/14.jpg',
  '/game-photos/15.jpg',
  '/game-photos/16.jpg',
  '/game-photos/17.jpg',
  '/game-photos/18.jpg',
];

// Captions for each photo (edit these to be more personal)
const captions = [
  'You make my heart race',
  'In your eyes, I found home',
  'Every day with you is a gift',
  "You're my favorite person",
  'My heart chose you',
  'Love looks like you',
  "You're my dream come true",
  'Forever with you feels right',
  'Your smile brightens my day',
  'You complete my world',
  'I fall for you every day',
  'My soul recognizes yours',
  "You're worth every moment",
  'Together is my favorite place',
  "You're my greatest adventure",
  'My heart beats for you',
  "You're simply unforgettable",
  'Our love is eternal',
];

// Create 18 pairs of images (36 images in total)
const imagePairs = baseImages.flatMap((image) => [image, image]);

// Messages shown when specific images are matched (keyed by filename number)
const specialMessages: Record<string, string> = {
  '1': 'From the moment I saw you, I knew.',
  '9': 'Your presence makes my world complete.',
  '18': 'With you, forever feels too short.',
};

const shuffleArray = <T,>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Shuffle pairs - keep some together (horizontally or vertically), randomly place others
const shufflePairsPartiallyTogether = (pairs: string[]) => {
  // pairs is length 36 where pairs[0..35] are images (each image appears twice)
  const totalPairs = pairs.length / 2; // 18

  // Build mapping from visual grid position to card index value (heartLayout)
  const flatLayout = heartLayout.flat(); // length 63 (9 cols * 7 rows)
  const cols = 9;

  // Build coord map for each card index value -> {row, col}
  const coordByIndex: Record<number, { row: number; col: number }> = {};
  flatLayout.forEach((val, flatPos) => {
    if (val !== null) {
      coordByIndex[val] = {
        row: Math.floor(flatPos / cols),
        col: flatPos % cols,
      };
    }
  });

  // Build adjacency list of index pairs (horizontal and vertical neighbors)
  const adjacencyPairs: Array<[number, number]> = [];
  Object.keys(coordByIndex).forEach((k) => {
    const i = Number(k);
    const { row, col } = coordByIndex[i];
    // check right neighbor
    const rightFlat = row * cols + (col + 1);
    const downFlat = (row + 1) * cols + col;
    const rightIndex = flatLayout[rightFlat];
    const downIndex = flatLayout[downFlat];
    if (typeof rightIndex === 'number') {
      const a = Math.min(i, rightIndex);
      const b = Math.max(i, rightIndex);
      adjacencyPairs.push([a, b]);
    }
    if (typeof downIndex === 'number') {
      const a = Math.min(i, downIndex);
      const b = Math.max(i, downIndex);
      adjacencyPairs.push([a, b]);
    }
  });

  // Unique adjacency pairs
  const uniqueAdj: Array<[number, number]> = [];
  const seen = new Set<string>();
  adjacencyPairs.forEach(([a, b]) => {
    const key = `${a},${b}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueAdj.push([a, b]);
    }
  });

  // Decide how many pairs to keep together (~75%)
  const pairsToKeep = Math.round(totalPairs * 0.75);

  // Prepare result array of length 36 filled with nulls
  const result: Array<string | null> = Array(pairs.length).fill(null);

  // Track used indices
  const usedIndices = new Set<number>();

  // Shuffle adjacency candidates
  const adjCandidates = shuffleArray(uniqueAdj.slice());

  // Assign pairs to adjacent slots
  let assignedPairs = 0;
  for (
    let i = 0;
    i < adjCandidates.length && assignedPairs < pairsToKeep;
    i++
  ) {
    const [a, b] = adjCandidates[i];
    if (usedIndices.has(a) || usedIndices.has(b)) continue;
    // mark indices reserved
    usedIndices.add(a);
    usedIndices.add(b);
    assignedPairs++;
  }

  // Build image pool (each unique image appears twice)
  const imagePool: string[] = pairs.slice();

  // Helper: place a specific image into two indices
  const placeImageAt = (img: string, idx1: number, idx2: number) => {
    result[idx1] = img;
    result[idx2] = img;
  };

  // 1) Fill the reserved adjacency slots with random image pairs
  const reservedAdj = Array.from(usedIndices);
  // group reservedAdj into pairs according to adjCandidates order
  let placed = 0;
  for (let i = 0; i < adjCandidates.length && placed < assignedPairs; i++) {
    const [a, b] = adjCandidates[i];
    if (result[a] !== null || result[b] !== null) continue;
    // pick a random image from imagePool
    const img = imagePool.pop();
    if (!img) break;
    const dupIndex = imagePool.findIndex((x) => x === img);
    if (dupIndex !== -1) imagePool.splice(dupIndex, 1);
    placeImageAt(img, a, b);
    placed++;
  }

  // 2) Collect remaining empty indices
  const remainingIndices: number[] = [];
  for (let idx = 0; idx < result.length; idx++)
    if (result[idx] === null) remainingIndices.push(idx);

  // 3) Shuffle remaining images and place them into remaining indices
  const shuffledRemainingImages = shuffleArray(imagePool.slice());
  for (let i = 0; i < remainingIndices.length; i++) {
    const img = shuffledRemainingImages[i];
    result[remainingIndices[i]] = img;
  }

  // All slots should be filled now
  return result.map((r) => (r === null ? pairs[0] : r));
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [shuffled] = useState(() =>
    shufflePairsPartiallyTogether([...imagePairs])
  );

  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [specialMessage, setSpecialMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Stats tracking
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Load stats from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('valentineGameStats');
    if (saved) {
      try {
        const stats = JSON.parse(saved);
        setBestTime(stats.bestTime);
        setBestMoves(stats.bestMoves);
        setGamesPlayed(stats.gamesPlayed);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Sound effect utility
  const playSound = (type: 'flip' | 'match' | 'win') => {
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'flip') {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'match') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'win') {
      // Play a chord for victory
      const notes = [523, 659, 784]; // C, E, G
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        osc.frequency.value = freq;
        osc.connect(gainNode);
        osc.start(audioContext.currentTime + i * 0.1);
        osc.stop(audioContext.currentTime + 0.5 + i * 0.1);
      });
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6
      );
    }
  };

  // Timer effect
  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleClick = async (index: number) => {
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index)
    )
      return;

    // Start timer on first interaction
    if (!timerRunning) setTimerRunning(true);

    playSound('flip');

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setMoves((m) => m + 1);
      setSelected((prev) => [...prev, index]);

      if (shuffled[firstIndex] === shuffled[index]) {
        playSound('match');
        setMatched((prev) => [...prev, firstIndex, index]);
        // Check for special message for this image
        const matchedSrc = shuffled[firstIndex];
        const match = matchedSrc.match(/\/(\d+)\./);
        if (match && specialMessages[match[1]]) {
          setSpecialMessage(specialMessages[match[1]]);
          setTimeout(() => setSpecialMessage(null), 3500);
        }
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000); // Clear incorrect after 1 second
        setTimeout(() => setSelected([]), 1000);
      }
    } else {
      setSelected([index]);
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length && matched.length > 0) {
      setTimerRunning(false);
      setShowConfetti(true);
      playSound('win');

      // Update stats
      const isNewBestTime = bestTime === null || seconds < bestTime;
      const isNewBestMoves = bestMoves === null || moves < bestMoves;
      const newBestTime = isNewBestTime ? seconds : bestTime;
      const newBestMoves = isNewBestMoves ? moves : bestMoves;

      const stats = {
        bestTime: newBestTime,
        bestMoves: newBestMoves,
        gamesPlayed: gamesPlayed + 1,
      };
      localStorage.setItem('valentineGameStats', JSON.stringify(stats));

      setTimeout(() => {
        setShowConfetti(false);
        handleShowProposal();
      }, 2000);
    }
  }, [
    matched,
    handleShowProposal,
    bestTime,
    bestMoves,
    seconds,
    moves,
    gamesPlayed,
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-2 sm:p-4 min-h-screen">
      {/* Game Title */}
      <motion.div
        className="text-center mt-2 sm:mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-red-600 mb-1 sm:mb-2">
          💕 Match the Photo Pairs 💕
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
          Reveal the surprise by finding all the matching pairs!
        </p>
      </motion.div>

      {/* Confetti on victory */}
      {showConfetti && (
        <div className="fixed inset-0 z-50">
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'fixed',
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}

      {/* Victory Message */}
      {showConfetti && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 drop-shadow-2xl text-center"
            animate={{ scale: [0.5, 1.1, 1] }}
            transition={{ duration: 1 }}
          >
            All Matched! 🎉
          </motion.h1>
        </motion.div>
      )}

      {/* Stats Display - Horizontal on desktop, Vertical on mobile */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap justify-center w-full max-w-4xl">
        <motion.div
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-sm">⏱️ Time</div>
          <div className="text-2xl">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-sm">💕 Moves</div>
          <div className="text-2xl">{moves}</div>
        </motion.div>

        {bestTime !== null && (
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-sm">🏆 Best</div>
            <div className="text-lg">
              {Math.floor(bestTime / 60)}:
              {String(bestTime % 60).padStart(2, '0')} • {bestMoves} moves
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={handleRestart}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-sm">🔄</div>
          <div className="text-lg">Restart</div>
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Cards Matched: {matched.length / 2} / 18
          </span>
          <span className="text-xs text-gray-500">
            {Math.round((matched.length / imagePairs.length) * 100)}%
          </span>
        </div>
        <motion.div
          className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{
              width: `${(matched.length / imagePairs.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      </div>

      {/* Special match message */}
      {specialMessage && (
        <motion.div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-pink-300 to-red-300 text-rose-900 px-6 py-3 rounded-xl shadow-2xl font-semibold border-2 border-red-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          ♥️ {specialMessage}
        </motion.div>
      )}

      {/* Game Grid Container */}
      <motion.div
        className="flex-1 flex items-center justify-center w-full max-w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-9 grid-rows-7 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 p-2 sm:p-4 max-w-full overflow-hidden">
          {/* Image preload */}
          <div className="hidden">
            {shuffled.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt={`Image ${i + 1}`}
                fill
                className="object-cover"
                priority
              />
            ))}
          </div>

          {heartLayout.flat().map((index, i) =>
            index !== null ? (
              <motion.div
                key={i}
                className="relative cursor-pointer"
                style={{
                  width: 'clamp(2rem, 8vw, 5rem)',
                  height: 'clamp(2rem, 8vw, 5rem)',
                  perspective: '1000px',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(index)}
              >
                {/* Back of the card */}
                {!selected.includes(index) && !matched.includes(index) && (
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 rounded-xl absolute z-10 shadow-xl border-3 border-red-600 hover:border-red-400 cursor-pointer"
                    initial={{ rotateY: 0 }}
                    animate={{
                      rotateY:
                        selected.includes(index) || matched.includes(index)
                          ? 180
                          : 0,
                      boxShadow:
                        selected.includes(index) || matched.includes(index)
                          ? '0 0 20px rgba(239, 68, 68, 0.8)'
                          : '0 10px 15px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                )}

                {/* Front of the card (image) */}
                {(selected.includes(index) || matched.includes(index)) && (
                  <motion.div
                    className="w-full h-full absolute rounded-xl shadow-xl border-3 border-red-600 overflow-hidden bg-white"
                    initial={{ rotateY: 180 }}
                    animate={{
                      rotateY:
                        selected.includes(index) || matched.includes(index)
                          ? 0
                          : 180,
                      boxShadow: matched.includes(index)
                        ? '0 0 30px rgba(236, 72, 153, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                        : '0 10px 15px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Image
                      src={shuffled[index]}
                      alt={`Card ${index}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}

                {/* Incorrect animation */}
                {incorrect.includes(index) && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full bg-red-500 rounded-xl opacity-50"></div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div
                key={i}
                style={{
                  width: 'clamp(2rem, 8vw, 5rem)',
                  height: 'clamp(2rem, 8vw, 5rem)',
                }}
              />
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
