'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProjectCards from './ProjectCards';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  const showProjects = !isUser && content.includes('[PROJECTS_PANEL]');
  const cleanContent = content.replace('[PROJECTS_PANEL]', '').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm ${
          isUser ? 'rounded-br-sm' : 'rounded-bl-sm'
        }`}
        style={
          isUser
            ? {
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
              }
            : {
                background: 'transparent',
                border: '1px solid var(--accent-border)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-accent)',
              }
        }
      >
        {isUser ? (
          <p className="leading-relaxed">{cleanContent}</p>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p>{children}</p>,
                strong: ({ children }) => <strong>{children}</strong>,
                ul: ({ children }) => <ul>{children}</ul>,
                ol: ({ children }) => <ol>{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                code({ className, children }) {
                  const isBlock = Boolean(className);
                  if (isBlock) {
                    return (
                      <pre>
                        <code className={className}>{children}</code>
                      </pre>
                    );
                  }
                  return <code>{children}</code>;
                },
              }}
            >
              {cleanContent}
            </ReactMarkdown>
            {showProjects && <ProjectCards />}
          </div>
        )}
      </div>
    </motion.div>
  );
}
