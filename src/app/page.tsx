'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoPairGame from '../components/PhotoPairGame';
import GiftBoxPage from '@/components/GiftBoxPage';
import ValentinesProposal from '@/components/ValentinesProposal';
import EnvelopePage from '@/components/EnvelopePage';
import LoveLetterPage from '@/components/LoveLetterPage';
import ForeverTogetherPage from '@/components/ForeverTogetherPage';
import FlowersPage from '@/components/FlowersPage';
import TextFooter from '@/components/TextFooter';
import OrientationGuard from '@/components/OrientationGuard';

const ANIM_DURATION = 1.5;

export default function Home() {
  const [page, setPage] = useState<
    | 'game'
    | 'giftbox'
    | 'proposal'
    | 'envelope'
    | 'letter'
    | 'forever'
    | 'flowers'
  >('game');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('giftbox');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleGiftBoxNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('proposal');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleProposalNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('envelope');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleEnvelopeNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('letter');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleLetterNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('forever');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleForeverNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('flowers');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleFlowersNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage('game');
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  return (
    <OrientationGuard>
      <main className="flex items-center justify-center min-h-screen bg-black overflow-hidden relative">
        {page === 'game' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-6 drop-shadow-lg">
              💖 For Princess Neema 💖
            </h1>
            <PhotoPairGame handleShowProposal={handleShowProposal} />
            <div className="mt-4 md:mt-0">
              <TextFooter />
            </div>
          </motion.div>
        )}

        {page === 'giftbox' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full"
          >
            <GiftBoxPage onNext={handleGiftBoxNext} />
          </motion.div>
        )}

        {page === 'proposal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full"
          >
            <ValentinesProposal onNext={handleProposalNext} />
          </motion.div>
        )}

        {page === 'envelope' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full"
          >
            <EnvelopePage onNext={handleEnvelopeNext} />
          </motion.div>
        )}

        {page === 'letter' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full"
          >
            <LoveLetterPage onNext={handleLetterNext} />
          </motion.div>
        )}

        {page === 'forever' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full"
          >
            <ForeverTogetherPage onNext={handleForeverNext} />
          </motion.div>
        )}

        {page === 'flowers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full"
          >
            <FlowersPage onNext={handleFlowersNext} />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  );
}
