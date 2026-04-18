'use client';

import { motion } from 'framer-motion';

const CHIPS = [
  'Show me your best projects',
  'What tools do you use?',
  'How can we collaborate?',
  'Tell me a fun fact about you',
];

interface SuggestionChipsProps {
  onSelect: (chip: string) => void;
}

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 px-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
      }}
    >
      {CHIPS.map((chip) => (
        <motion.button
          key={chip}
          onClick={() => onSelect(chip)}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="chip px-4 py-2 rounded-full text-sm border"
          style={{
            background: 'var(--accent-dim)',
            borderColor: 'var(--accent-border)',
            color: 'var(--accent)',
          }}
        >
          {chip}
        </motion.button>
      ))}
    </motion.div>
  );
}
