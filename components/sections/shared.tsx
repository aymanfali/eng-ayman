'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function Reveal({ children }: { children: ReactNode }) {
	const reduce = useReducedMotion();

	return (
		<motion.div
			initial={reduce ? false : { opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.65, ease: 'easeOut' }}
		>
			{children}
		</motion.div>
	);
}

export function MotionCard({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode;
	className: string;
	delay?: number;
}) {
	const reduce = useReducedMotion();

	return (
		<motion.article
			className={className}
			initial={reduce ? false : { opacity: 0, y: 36 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
			whileHover={
				reduce
					? undefined
					: { y: -8, transition: { type: 'spring', stiffness: 300, damping: 18 } }
			}
		>
			{children}
		</motion.article>
	);
}
