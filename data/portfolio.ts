export const services = [
  { number: '01', title: 'AI integration', description: 'Add models, retrieval and automation to your product, from first prototype to production.' },
  { number: '02', title: 'Frontend engineering', description: 'Fast, accessible interfaces in React and Next.js, built on a solid design system.' },
  { number: '03', title: 'Technical consulting', description: 'Architecture reviews, roadmaps and hands-on guidance for teams shipping AI features.' },
];

// Replace these placeholders with real case studies before publishing.
export const projects = [1, 2, 3].map((number) => ({
  number: String(number).padStart(2, '0'),
  title: '[Project name]',
  description: '[Describe the problem, your role and measurable result.]',
  tags: ['[Stack]', '[Role]'],
}));

export const processSteps = [
  { number: '1', title: 'Discover', description: 'Understand goals, users and constraints.' },
  { number: '2', title: 'Design', description: 'Shape the experience and the system behind it.' },
  { number: '3', title: 'Build', description: 'Ship in small, tested increments.' },
  { number: '4', title: 'Launch', description: 'Measure, learn and keep improving.' },
];
