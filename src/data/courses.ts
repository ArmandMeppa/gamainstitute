import type { Course, Category } from '@/types/course'

export const CATEGORIES: Category[] = [
  { key: 'ai',       color: '#B56418', count: 9 },
  { key: 'software', color: '#D8942A', count: 7 },
  { key: 'cloud',    color: '#8EA57A', count: 5 },
  { key: 'devops',   color: '#2A8C8A', count: 4 },
  { key: 'security', color: '#165C71', count: 6 },
]

export const FEATURED_COURSES: Course[] = [
  { id: 'applied-ai',         categoryKey: 'ai',             tagVariant: 'copper', durationWeeks: 8, levelKey: 'intermediate' },
  { id: 'cd-cloud',           categoryKey: 'devops',         tagVariant: 'teal',   durationWeeks: 6, levelKey: 'advanced'     },
  { id: 'supply-chain-sec',   categoryKey: 'security',       tagVariant: 'default',durationWeeks: 4, levelKey: 'all'          },
  { id: 'distributed-sys',    categoryKey: 'software',       tagVariant: 'copper', durationWeeks: 7, levelKey: 'advanced'     },
  { id: 'ai-governance',      categoryKey: 'responsible-ai', tagVariant: 'teal',   durationWeeks: 5, levelKey: 'intermediate' },
  { id: 'ai-compute-infra',   categoryKey: 'cloud',          tagVariant: 'default',durationWeeks: 6, levelKey: 'intermediate' },
]
