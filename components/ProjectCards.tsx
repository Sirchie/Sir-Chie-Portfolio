'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Business Workflow Automation',
    description:
      'End-to-end email triage, scheduling, and follow-up automation — zero human touch from inbox to outcome.',
    image: 'https://picsum.photos/seed/archie-workflow-01/800/450',
    stack: ['n8n', 'Claude API', 'Gmail', 'Notion'],
    metrics: ['25–30 hrs saved/week', '100% automated', '3-day deploy'],
  },
  {
    title: 'Healthcare Admin AI',
    description:
      'AI-powered patient intake and admin automation for clinics. Booking, data capture, and compliance docs — handled.',
    image: 'https://picsum.photos/seed/archie-health-02/800/450',
    stack: ['GPT-4o', 'Make', 'EHR API', 'Slack'],
    metrics: ['80% faster intake', '100% compliant', 'Zero manual entry'],
  },
  {
    title: 'Customer Success AI Assistant',
    description:
      'LLM assistant embedded in CRM, triaging tickets and resolving routine queries around the clock.',
    image: 'https://picsum.photos/seed/archie-cs-03/800/450',
    stack: ['Claude', 'HubSpot', 'n8n', 'Zapier'],
    metrics: ['3x faster response', '90% query automation', '24/7 uptime'],
  },
];

export default function ProjectCards() {
  return (
    <div className="flex flex-col gap-3 w-full mt-3">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.12,
            type: 'spring',
            stiffness: 200,
            damping: 24,
          }}
          className="rounded-2xl overflow-hidden border"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border-strong)',
          }}
        >
          {/* Thumbnail */}
          <div className="relative overflow-hidden" style={{ height: 140 }}>
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) saturate(0.7)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, var(--bg-elevated) 0%, transparent 60%)',
              }}
            />
            {/* Stack badges overlay */}
            <div className="absolute bottom-2 left-3 flex gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: 'var(--text-secondary)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-4 pb-4 pt-3">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3
                className="font-semibold text-sm leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h3>
              <ExternalLink
                size={13}
                strokeWidth={1.8}
                style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 2 }}
              />
            </div>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
            {/* Metric badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.metrics.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'var(--accent-dim)',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
