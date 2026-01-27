/**
 * Model and agent profile constants
 * Claude models, thinking levels, memory backends, and agent profiles
 */

import type { AgentProfile, PhaseModelConfig, FeatureModelConfig, FeatureThinkingConfig } from '../types/settings';

// ============================================
// Available Models
// ============================================

export const AVAILABLE_MODELS = [
  { value: 'opus', label: 'models.opus' },
  { value: 'sonnet', label: 'models.sonnet' },
  { value: 'haiku', label: 'models.haiku' }
] as const;

// Maps model shorthand to actual Claude model IDs
export const MODEL_ID_MAP: Record<string, string> = {
  opus: 'claude-opus-4-5-20251101',
  sonnet: 'claude-sonnet-4-5-20250929',
  haiku: 'claude-haiku-4-5-20251001'
} as const;

// Maps thinking levels to budget tokens (null = no extended thinking)
export const THINKING_BUDGET_MAP: Record<string, number | null> = {
  none: null,
  low: 1024,
  medium: 4096,
  high: 16384,
  ultrathink: 63999 // Maximum reasoning depth (API requires max_tokens >= budget + 1, so 63999 + 1 = 64000 limit)
} as const;

// ============================================
// Thinking Levels
// ============================================

// Thinking levels for Claude model (budget token allocation)
export const THINKING_LEVELS = [
  { value: 'none', label: 'thinking.none.label', description: 'thinking.none.description' },
  { value: 'low', label: 'thinking.low.label', description: 'thinking.low.description' },
  { value: 'medium', label: 'thinking.medium.label', description: 'thinking.medium.description' },
  { value: 'high', label: 'thinking.high.label', description: 'thinking.high.description' },
  { value: 'ultrathink', label: 'thinking.ultrathink.label', description: 'thinking.ultrathink.description' }
] as const;

// ============================================
// Agent Profiles - Phase Configurations
// ============================================

// Phase configurations for each preset profile
// Each profile has its own default phase models and thinking levels

// Auto (Optimized) - Opus with optimized thinking per phase
export const AUTO_PHASE_MODELS: PhaseModelConfig = {
  spec: 'opus',
  planning: 'opus',
  coding: 'opus',
  qa: 'opus'
};

export const AUTO_PHASE_THINKING: import('../types/settings').PhaseThinkingConfig = {
  spec: 'ultrathink',   // Deep thinking for comprehensive spec creation
  planning: 'high',     // High thinking for planning complex features
  coding: 'low',        // Faster coding iterations
  qa: 'low'             // Efficient QA review
};

// Complex Tasks - Opus with ultrathink across all phases
export const COMPLEX_PHASE_MODELS: PhaseModelConfig = {
  spec: 'opus',
  planning: 'opus',
  coding: 'opus',
  qa: 'opus'
};

export const COMPLEX_PHASE_THINKING: import('../types/settings').PhaseThinkingConfig = {
  spec: 'ultrathink',
  planning: 'ultrathink',
  coding: 'ultrathink',
  qa: 'ultrathink'
};

// Balanced - Sonnet with medium thinking across all phases
export const BALANCED_PHASE_MODELS: PhaseModelConfig = {
  spec: 'sonnet',
  planning: 'sonnet',
  coding: 'sonnet',
  qa: 'sonnet'
};

export const BALANCED_PHASE_THINKING: import('../types/settings').PhaseThinkingConfig = {
  spec: 'medium',
  planning: 'medium',
  coding: 'medium',
  qa: 'medium'
};

// Quick Edits - Haiku with low thinking across all phases
export const QUICK_PHASE_MODELS: PhaseModelConfig = {
  spec: 'haiku',
  planning: 'haiku',
  coding: 'haiku',
  qa: 'haiku'
};

export const QUICK_PHASE_THINKING: import('../types/settings').PhaseThinkingConfig = {
  spec: 'low',
  planning: 'low',
  coding: 'low',
  qa: 'low'
};

// Default phase configuration (used for fallback, matches 'Balanced' profile for cost-effectiveness)
export const DEFAULT_PHASE_MODELS: PhaseModelConfig = BALANCED_PHASE_MODELS;
export const DEFAULT_PHASE_THINKING: import('../types/settings').PhaseThinkingConfig = BALANCED_PHASE_THINKING;

// ============================================
// Feature Settings (Non-Pipeline Features)
// ============================================

// Default feature model configuration (for insights, ideation, roadmap, github, utility)
export const DEFAULT_FEATURE_MODELS: FeatureModelConfig = {
  insights: 'sonnet',     // Fast, responsive chat
  ideation: 'opus',       // Creative ideation benefits from Opus
  roadmap: 'opus',        // Strategic planning benefits from Opus
  githubIssues: 'opus',   // Issue triage and analysis benefits from Opus
  githubPrs: 'opus',      // PR review benefits from thorough Opus analysis
  utility: 'haiku'        // Fast utility operations (commit messages, merge resolution)
};

// Default feature thinking configuration
export const DEFAULT_FEATURE_THINKING: FeatureThinkingConfig = {
  insights: 'medium',     // Balanced thinking for chat
  ideation: 'high',       // Deep thinking for creative ideas
  roadmap: 'high',        // Strategic thinking for roadmap
  githubIssues: 'medium', // Moderate thinking for issue analysis
  githubPrs: 'medium',    // Moderate thinking for PR review
  utility: 'low'          // Fast thinking for utility operations
};

// Feature labels for UI display
export const FEATURE_LABELS: Record<keyof FeatureModelConfig, { label: string; description: string }> = {
  insights: { label: 'featured.insights.label', description: 'featured.insights.description' },
  ideation: { label: 'featured.ideation.label', description: 'featured.ideation.description' },
  roadmap: { label: 'featured.roadmap.label', description: 'featured.roadmap.description' },
  githubIssues: { label: 'featured.githubIssues.label', description: 'featured.githubIssues.description' },
  githubPrs: { label: 'featured.githubPrs.label', description: 'featured.githubPrs.description' },
  utility: { label: 'featured.utility.label', description: 'featured.utility.description' }
};

// Default agent profiles for preset model/thinking configurations
// All profiles have per-phase configuration for full customization
export const DEFAULT_AGENT_PROFILES: AgentProfile[] = [
  {
    id: 'auto',
    name: 'profiles.auto.name',
    description: 'profiles.auto.description',
    model: 'opus',
    thinkingLevel: 'high',
    icon: 'Sparkles',
    phaseModels: AUTO_PHASE_MODELS,
    phaseThinking: AUTO_PHASE_THINKING
  },
  {
    id: 'complex',
    name: 'profiles.complex.name',
    description: 'profiles.complex.description',
    model: 'opus',
    thinkingLevel: 'ultrathink',
    icon: 'Brain',
    phaseModels: COMPLEX_PHASE_MODELS,
    phaseThinking: COMPLEX_PHASE_THINKING
  },
  {
    id: 'balanced',
    name: 'profiles.balanced.name',
    description: 'profiles.balanced.description',
    model: 'sonnet',
    thinkingLevel: 'medium',
    icon: 'Scale',
    phaseModels: BALANCED_PHASE_MODELS,
    phaseThinking: BALANCED_PHASE_THINKING
  },
  {
    id: 'quick',
    name: 'profiles.quick.name',
    description: 'profiles.quick.description',
    model: 'haiku',
    thinkingLevel: 'low',
    icon: 'Zap',
    phaseModels: QUICK_PHASE_MODELS,
    phaseThinking: QUICK_PHASE_THINKING
  }
];

// ============================================
// Memory Backends
// ============================================

export const MEMORY_BACKENDS = [
  { value: 'file', label: 'File-based (default)' },
  { value: 'graphiti', label: 'Graphiti (LadybugDB)' }
] as const;
