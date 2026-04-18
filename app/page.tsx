'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Avatar, { AvatarState } from '@/components/Avatar';
import ChatMessage from '@/components/ChatMessage';
import SuggestionChips from '@/components/SuggestionChips';
import MouseEffect from '@/components/MouseEffect';
import ThemeToggle from '@/components/ThemeToggle';

export default function Page() {
  const [isDark, setIsDark] = useState(true);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    onResponse: () => setAvatarState('thinking'),
    onFinish: () => {
      setAvatarState('happy');
      setTimeout(() => setAvatarState('idle'), 2500);
    },
    onError: () => setAvatarState('idle'),
  });

  const hasMessages = messages.length > 0;

  useEffect(() => {
    document.documentElement.className = isDark ? '' : 'light';
  }, [isDark]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSuggestion = (chip: string) => {
    setAvatarState('thinking');
    append({ role: 'user', content: chip });
  };

  const onSubmit = (e: React.FormEvent) => {
    if (!input.trim()) return;
    setAvatarState('thinking');
    handleSubmit(e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  const avatarSize = hasMessages ? 72 : 160;

  return (
    <div
      className="relative flex flex-col min-h-[100dvh] overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Mouse rainbow + splash effect */}
      <MouseEffect />

      {/* Theme toggle */}
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />

      {/* Main layout */}
      <LayoutGroup>
        <div className="relative z-10 flex flex-col flex-1 items-center w-full max-w-2xl mx-auto px-4">
          {/* ── Avatar + Greeting ───────────────── */}
          <motion.div
            layout
            className="flex flex-col items-center"
            style={{ paddingTop: hasMessages ? '1.25rem' : '4rem', paddingBottom: '0.5rem' }}
            transition={{ type: 'spring', stiffness: 130, damping: 22 }}
          >
            <motion.div
              layout
              animate={{ width: avatarSize, height: avatarSize }}
              transition={{ type: 'spring', stiffness: 130, damping: 22 }}
              style={{ width: avatarSize, height: avatarSize }}
            >
              <Avatar state={avatarState} size={avatarSize} />
            </motion.div>

            <AnimatePresence>
              {!hasMessages && (
                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <h1
                    className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 leading-none"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Hey, I'm Archie 👋
                  </h1>
                  <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                    AI Automation Specialist — PH
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Messages ────────────────────────── */}
          <AnimatePresence>
            {hasMessages && (
              <motion.div
                className="w-full flex-1 overflow-y-auto py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ maxHeight: 'calc(100dvh - 240px)' }}
              >
                {messages.map((msg: { id: string; role: string; content: string }) => (
                  <ChatMessage key={msg.id} role={msg.role as 'user' | 'assistant'} content={msg.content} />
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    className="flex justify-start mb-3"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className="px-4 py-3 rounded-2xl rounded-bl-sm border"
                      style={{
                        borderColor: 'var(--accent-border)',
                        boxShadow: 'var(--shadow-accent)',
                      }}
                    >
                      <span className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="block w-1.5 h-1.5 rounded-full"
                            style={{ background: 'var(--accent)' }}
                            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                            transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.22 }}
                          />
                        ))}
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Suggestion chips ────────────────── */}
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                className="w-full flex-1 flex flex-col justify-center pb-4"
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              >
                <div className="mb-6" style={{ height: 24 }} />
                <SuggestionChips onSelect={handleSuggestion} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer when no messages */}
          {!hasMessages && <div className="flex-1" />}

          {/* ── Chat input ──────────────────────── */}
          <motion.div layout className="w-full pb-6 pt-3">
            <motion.form
              onSubmit={onSubmit}
              layout
              className="relative"
            >
              <div
                className="flex items-center gap-2 rounded-2xl border px-4 py-3"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: hasMessages ? 'var(--accent-border)' : 'var(--border-strong)',
                  boxShadow: hasMessages ? 'var(--shadow-accent)' : 'none',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={onKeyDown}
                  placeholder={
                    hasMessages
                      ? 'Ask a follow-up...'
                      : 'Ask me anything about my projects, skills, or how I can automate your business…'
                  }
                  className="chat-input flex-1 bg-transparent text-sm"
                  style={{ color: 'var(--text-primary)' }}
                  disabled={isLoading}
                  autoFocus
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-lg disabled:opacity-25 transition-all duration-200"
                  style={{
                    background: input.trim() ? 'var(--accent)' : 'var(--border)',
                    color: input.trim() ? '#000' : 'var(--text-tertiary)',
                  }}
                  aria-label="Send"
                >
                  <ArrowUp size={15} strokeWidth={2.2} />
                </motion.button>
              </div>
            </motion.form>

            <p
              className="text-center text-xs mt-2"
              style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}
            >
              AI responses may not be 100% accurate. Reach out directly to confirm details.
            </p>
          </motion.div>
        </div>
      </LayoutGroup>
    </div>
  );
}
