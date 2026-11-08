"use client";

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { processSteps } from '@/data/portfolio';
import { Reveal } from './shared';

const sectionClass = "border-t border-border py-[88px] max-[760px]:py-16";
const containerClass = "mx-auto w-full max-w-[1120px] px-6";
const kickerClass = "mb-3 text-[13px] font-medium tracking-[.24em] text-foreground dark:text-primary";
const headingClass = "mb-10 max-w-[640px] font-heading text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-semibold";

export function Process() {
	const processRef = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: processRef,
		offset: ['start 70%', 'end 70%'],
	});
	const lineProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
		stiffness: 100,
		damping: 30,
	});

	return (
		<section ref={processRef} id="process" data-scroll-stack="pin" className={sectionClass}>
			<div className={containerClass}>
				<Reveal>
					<p className={kickerClass}>PROCESS</p>
					<h2 className={headingClass}>From idea to launch in four steps</h2>
				</Reveal>
				<div className="relative">
					<motion.div
						className="absolute top-[21px] right-7 left-7 h-0.5 origin-left bg-primary max-[760px]:hidden"
						style={{ scaleX: reduce ? 1 : lineProgress }}
						aria-hidden="true"
					/>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
						{processSteps.map((step, index) => (
							<motion.article
								className="relative pt-14"
								key={step.number}
								initial={reduce ? false : { opacity: 0, y: 36 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
							>
								<b className="absolute top-0 left-0 grid size-11 place-items-center rounded-full border-2 border-primary bg-background font-heading text-[15px] font-semibold">
									{step.number}
								</b>
								<h3 className="mb-1.5 font-heading text-xl font-semibold">
									{step.title}
								</h3>
								<p className="m-0 text-base text-muted-foreground">
									{step.description}
								</p>
							</motion.article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
