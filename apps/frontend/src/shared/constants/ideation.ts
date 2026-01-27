/**
 * Ideation-related constants
 * Types, categories, and configuration for AI-generated project improvements
 */

// ============================================
// Ideation Types
// ============================================

// Ideation type labels and descriptions
// Note: high_value_features removed - strategic features belong to Roadmap
// low_hanging_fruit renamed to code_improvements to cover all code-revealed opportunities
export const IDEATION_TYPE_LABELS: Record<string, string> = {
  code_improvements: 'Code Improvements',
  ui_ux_improvements: 'UI/UX Improvements',
  documentation_gaps: 'Documentation',
  security_hardening: 'Security',
  performance_optimizations: 'Performance',
  code_quality: 'Code Quality'
};

export const IDEATION_TYPE_DESCRIPTIONS: Record<string, string> = {
  code_improvements: 'Code-revealed opportunities from patterns, architecture, and infrastructure analysis',
  ui_ux_improvements: 'Visual and interaction improvements identified through app analysis',
  documentation_gaps: 'Missing or outdated documentation that needs attention',
  security_hardening: 'Security vulnerabilities and hardening opportunities',
  performance_optimizations: 'Performance bottlenecks and optimization opportunities',
  code_quality: 'Refactoring opportunities, large files, code smells, and best practice violations'
};

// Ideation type colors
export const IDEATION_TYPE_COLORS: Record<string, string> = {
  code_improvements: 'bg-success/10 text-success border-success/30',
  ui_ux_improvements: 'bg-info/10 text-info border-info/30',
  documentation_gaps: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  security_hardening: 'bg-destructive/10 text-destructive border-destructive/30',
  performance_optimizations: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  code_quality: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
};

// Ideation type icons (Lucide icon names)
export const IDEATION_TYPE_ICONS: Record<string, string> = {
  code_improvements: 'Zap',
  ui_ux_improvements: 'Palette',
  documentation_gaps: 'BookOpen',
  security_hardening: 'Shield',
  performance_optimizations: 'Gauge',
  code_quality: 'Code2'
};

// ============================================
// Ideation Status
// ============================================

export const IDEATION_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  selected: 'bg-primary/10 text-primary',
  converted: 'bg-success/10 text-success',
  dismissed: 'bg-destructive/10 text-destructive line-through',
  archived: 'bg-violet-500/10 text-violet-400'
};

// ============================================
// Ideation Effort/Complexity
// ============================================

// Ideation effort colors (full spectrum for code_improvements)
export const IDEATION_EFFORT_COLORS: Record<string, string> = {
  trivial: 'bg-success/10 text-success',
  small: 'bg-info/10 text-info',
  medium: 'bg-warning/10 text-warning',
  large: 'bg-orange-500/10 text-orange-400',
  complex: 'bg-destructive/10 text-destructive'
};

// ============================================
// Ideation Impact
// ============================================

export const IDEATION_IMPACT_COLORS: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-info/10 text-info',
  high: 'bg-warning/10 text-warning',
  critical: 'bg-destructive/10 text-destructive'
};

// ============================================
// Category-Specific Labels
// ============================================

// SECURITY_SEVERITY_COLORS
export const SECURITY_SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-info/10 text-info',
  medium: 'bg-warning/10 text-warning',
  high: 'bg-orange-500/10 text-orange-500',
  critical: 'bg-destructive/10 text-destructive'
};

// UI/UX category labels
export const UIUX_CATEGORY_LABELS: Record<string, string> = {
  usability: 'ideation.categories.uiux.usability',
  accessibility: 'ideation.categories.uiux.accessibility',
  performance: 'ideation.categories.uiux.performance',
  visual: 'ideation.categories.uiux.visual',
  interaction: 'ideation.categories.uiux.interaction'
};

// Documentation category labels
export const DOCUMENTATION_CATEGORY_LABELS: Record<string, string> = {
  readme: 'ideation.categories.documentation.readme',
  api_docs: 'ideation.categories.documentation.api_docs',
  inline_comments: 'ideation.categories.documentation.inline_comments',
  examples: 'ideation.categories.documentation.examples',
  architecture: 'ideation.categories.documentation.architecture',
  troubleshooting: 'ideation.categories.documentation.troubleshooting'
};

// Security category labels
export const SECURITY_CATEGORY_LABELS: Record<string, string> = {
  authentication: 'ideation.categories.security.authentication',
  authorization: 'ideation.categories.security.authorization',
  input_validation: 'ideation.categories.security.input_validation',
  data_protection: 'ideation.categories.security.data_protection',
  dependencies: 'ideation.categories.security.dependencies',
  configuration: 'ideation.categories.security.configuration',
  secrets_management: 'ideation.categories.security.secrets_management'
};

// Performance category labels
export const PERFORMANCE_CATEGORY_LABELS: Record<string, string> = {
  bundle_size: 'ideation.categories.performance.bundle_size',
  runtime: 'ideation.categories.performance.runtime',
  memory: 'ideation.categories.performance.memory',
  database: 'ideation.categories.performance.database',
  network: 'ideation.categories.performance.network',
  rendering: 'ideation.categories.performance.rendering',
  caching: 'ideation.categories.performance.caching'
};

// Code quality category labels
export const CODE_QUALITY_CATEGORY_LABELS: Record<string, string> = {
  large_files: 'ideation.categories.code_quality.large_files',
  code_smells: 'ideation.categories.code_quality.code_smells',
  complexity: 'ideation.categories.code_quality.complexity',
  duplication: 'ideation.categories.code_quality.duplication',
  naming: 'ideation.categories.code_quality.naming',
  structure: 'ideation.categories.code_quality.structure',
  linting: 'ideation.categories.code_quality.linting',
  testing: 'ideation.categories.code_quality.testing',
  types: 'ideation.categories.code_quality.types',
  dependencies: 'ideation.categories.code_quality.dependencies',
  dead_code: 'ideation.categories.code_quality.dead_code',
  git_hygiene: 'ideation.categories.code_quality.git_hygiene'
};

// Code quality severity colors
export const CODE_QUALITY_SEVERITY_COLORS: Record<string, string> = {
  suggestion: 'bg-info/10 text-info',
  minor: 'bg-warning/10 text-warning',
  major: 'bg-orange-500/10 text-orange-500',
  critical: 'bg-destructive/10 text-destructive'
};

// ============================================
// Default Configuration
// ============================================

// Default ideation config
// Note: high_value_features removed, low_hanging_fruit renamed to code_improvements
export const DEFAULT_IDEATION_CONFIG = {
  enabledTypes: ['code_improvements', 'ui_ux_improvements', 'security_hardening'] as const,
  includeRoadmapContext: true,
  includeKanbanContext: true,
  maxIdeasPerType: 5
};
