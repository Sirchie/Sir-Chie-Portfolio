'use client';

import { motion, AnimatePresence } from 'framer-motion';

export type AvatarState = 'idle' | 'thinking' | 'happy';

interface AvatarProps {
  state: AvatarState;
  size?: number;
}

export default function Avatar({ state, size = 160 }: AvatarProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Outer glow ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          opacity: state === 'thinking' ? 0.9 : 0.35,
          pointerEvents: 'none',
        }}
        animate={
          state === 'thinking'
            ? { opacity: [0.35, 0.9, 0.35], scale: [1, 1.04, 1] }
            : state === 'happy'
            ? { opacity: [0.6, 1, 0.6] }
            : { opacity: [0.25, 0.45, 0.25] }
        }
        transition={{ duration: state === 'thinking' ? 1 : 2.5, repeat: Infinity }}
      />

      {/* Dashed orbit ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          border: '0.75px dashed var(--accent)',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Avatar image with breathing / bounce animations */}
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          background: '#ffffff',
          boxShadow: '0 0 28px rgba(0, 229, 255, 0.3)',
        }}
        animate={
          state === 'idle'
            ? { scale: [1, 1.016, 1] }
            : state === 'happy'
            ? { y: [0, -8, 0], scale: [1, 1.04, 1] }
            : { scale: [1, 1.01, 1] }
        }
        transition={{
          duration: state === 'idle' ? 3.5 : state === 'happy' ? 0.65 : 1.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.png"
          alt="Archie's avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />

        {/* Thinking overlay — dim + dots */}
        <AnimatePresence>
          {state === 'thinking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(6, 10, 20, 0.45)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '18%',
              }}
            >
              <span style={{ display: 'flex', gap: 5 }}>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    style={{
                      display: 'block',
                      width: size * 0.055,
                      height: size * 0.055,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                    }}
                    animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.22 }}
                  />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Happy sparkle burst */}
      <AnimatePresence>
        {state === 'happy' && (
          <>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <motion.div
                key={deg}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: Math.cos((deg * Math.PI) / 180) * (size * 0.55), y: Math.sin((deg * Math.PI) / 180) * (size * 0.55) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: deg / 1200 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  marginTop: -2.5,
                  marginLeft: -2.5,
                  pointerEvents: 'none',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
