import React, { useState } from 'react';
import { motion } from 'framer-motion';

function MainMenu({ onStart, onLoadGame }) {
  const [showDifficulties, setShowDifficulties] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Delay between each child animation
          },
        },
      }}
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <motion.h1
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="text-4xl font-bold mb-6"
      >
        Sudoku
      </motion.h1>

      {/* New Game Button */}
      <motion.button
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        onClick={() => setShowDifficulties(!showDifficulties)} // Toggle difficulty bubble
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        New Game
      </motion.button>

      {/* Difficulty Bubble */}
      {showDifficulties && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-white rounded shadow-lg flex flex-col items-center"
        >
          <button
            onClick={() => onStart('easy')}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Easy
          </button>
          <button
            onClick={() => onStart('medium')}
            className="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Medium
          </button>
          <button
            onClick={() => onStart('hard')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hard
          </button>
        </motion.div>
      )}

      {/* Load Game Button */}
      <motion.button
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        onClick={onLoadGame}
        className="mt-6 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Load Game
      </motion.button>
    </motion.div>
  );
}

export default MainMenu;
