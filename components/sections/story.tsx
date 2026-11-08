'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

const stages = [
	{
		label: '01 · PLAN',
		title: 'Plan the foundation',
		body: 'Requirements, architecture and a clear scope come first, so the build starts on solid ground.',
	},
	{
		label: '02 · BUILD',
		title: 'Build with quality',
		body: 'Clean code, tests and code review in small increments, with a CI pipeline that checks every change.',
	},
	{
		label: '03 · SHIP',
		title: 'Ship and run it',
		body: 'Automated deployments, monitoring and performance budgets keep every release stable in production.',
	},
];

const sectionClass = "py-[88px] max-[760px]:py-16";
const containerClass = "mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-6 px-6 md:grid-cols-2 md:gap-12";
const kickerClass = "mb-3 text-[13px] font-medium tracking-[.24em] text-foreground dark:text-primary";

export function Story() {
	const reduce = useReducedMotion();
	const storyRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: storyRef,
		offset: ['start start', 'end end'],
	});
	const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

	return (
		<section ref={storyRef} id="story" data-scroll-stack="layer" className={sectionClass}>
			<div className={containerClass} data-story-stage>
				<div>
					<p className={kickerClass}>HOW I WORK</p>
					<h2 className="mb-7 max-w-160 font-heading text-[clamp(28px,3.6vw,40px)] leading-[1.08] font-semibold">
						From first commit to stable production
					</h2>
					<div className="grid gap-7" data-story-panels>
						{stages.map((stage, index) => (
							<StoryPanel key={stage.label} index={index} progress={progress} reduce={!!reduce}>
								<span className="text-[13px] font-medium tracking-[.24em] text-foreground dark:text-primary">
									{stage.label}
								</span>
								<h3 className="mt-2 mb-2.5 font-heading text-[clamp(24px,3vw,32px)] leading-[1.15] font-semibold">
									{stage.title}
								</h3>
								<p className="m-0 max-w-115 text-muted-foreground">
									{stage.body}
								</p>
							</StoryPanel>
						))}
					</div>
					<div className="mt-7 flex items-center gap-2.5 font-heading text-sm font-medium text-muted-foreground md:hidden" aria-hidden="true">
						{stages.map((stage, index) => (
							<StoryDot
								key={stage.label}
								index={index}
								progress={progress}
							/>
						))}
						<motion.span
							className="ml-2"
							aria-hidden="true"
					>
							{useTransform(progress, (value) => `0${Math.min(3, Math.floor(value * 3) + 1)} / 03`)}
						</motion.span>
					</div>
				</div>
				<PipelineGraphic progress={progress} reduce={!!reduce} />
			</div>
		</section>
	);
}

function StoryPanel({
	children,
	index,
	progress,
	reduce,
}: {
	children: React.ReactNode;
	index: number;
	progress: MotionValue<number>;
	reduce: boolean;
}) {
	const centers = [0.17, 0.5, 0.83];
	const center = centers[index];
	const input = index === 0
		? [0, center - 0.08, center + 0.08, center + 0.18]
		: index === 2
			? [center - 0.18, center - 0.08, center + 0.08, 1]
			: [center - 0.17, center - 0.08, center + 0.08, center + 0.17];
	const output = index === 0 ? [1, 1, 1, 0] : index === 2 ? [0, 1, 1, 1] : [0, 1, 1, 0];
	const opacity = useTransform(progress, input, output);
	const y = useTransform(progress, [0, 1], [center * 80, (center - 1) * 80]);

	return (
		<motion.article
			data-story-panel
			initial={false}
			style={reduce ? undefined : { opacity, y }}
		>
			{children}
		</motion.article>
	);
}

function StoryDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
	const input = index === 0
		? [0, 0.3, 0.34, 1]
		: index === 1
			? [0, 0.3, 0.34, 0.62, 0.7, 1]
			: [0, 0.62, 0.7, 1];
	const output = index === 0
		? ['#2dd4bf', '#2dd4bf', 'transparent', 'transparent']
		: index === 1
			? ['transparent', 'transparent', '#2dd4bf', '#2dd4bf', 'transparent', 'transparent']
			: ['transparent', 'transparent', '#2dd4bf', '#2dd4bf'];
	const fill = useTransform(progress, input, output);

	return (
		<motion.span
			className="size-2.5 rounded-full border-2 border-primary"
			style={{ backgroundColor: fill }}
		/>
	);
}

function PipelineGraphic({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
	const stagePlan = useTransform(progress, [0, 0.33, 0.34, 1], ['#2dd4bf', '#2dd4bf', '#9ca3af', '#9ca3af']);
	const stageBuild = useTransform(progress, [0, 0.3, 0.36, 0.63, 0.7, 1], ['#9ca3af', '#9ca3af', '#2dd4bf', '#2dd4bf', '#9ca3af', '#9ca3af']);
	const stageShip = useTransform(progress, [0, 0.63, 0.7, 1], ['#9ca3af', '#9ca3af', '#2dd4bf', '#2dd4bf']);
	const modelOpacity = useTransform(progress, [0.28, 0.4], [0.35, 1]);
	const productOpacity = useTransform(progress, [0.64, 0.76], [0.35, 1]);
	const sourceGroups = [70, 132, 194, 256];
	const connectorPaths = [
		'M140 94C185 94 185 187 230 187',
		'M140 156C185 156 185 187 230 187',
		'M140 218C185 218 185 187 230 187',
		'M140 280C185 280 185 187 230 187',
	];
	const codeLines = [
		{ x: 244, y: 120, width: 46, color: '#2dd4bf', start: 0.4 },
		{ x: 256, y: 138, width: 56, color: '#fff', start: 0.44 },
		{ x: 256, y: 156, width: 38, color: '#fff', start: 0.48 },
		{ x: 268, y: 174, width: 44, color: '#fff', start: 0.52 },
		{ x: 256, y: 192, width: 30, color: '#2dd4bf', start: 0.56 },
		{ x: 244, y: 210, width: 20, color: '#fff', start: 0.6 },
		{ x: 244, y: 228, width: 52, color: '#2dd4bf', start: 0.64 },
	];

	return (
		<svg
			className="block h-auto w-full rounded-2xl bg-[#0e1116] p-4"
			viewBox="0 0 560 360"
			preserveAspectRatio="xMidYMid meet"
			data-story-graphic
			role="img"
			aria-label="Requirements feed a build pipeline of code and tests, which ships to a production interface"
		>
			<defs>
				<pattern id="story-dots" width="24" height="24" patternUnits="userSpaceOnUse">
					<circle cx="1" cy="1" r="1" fill="#fff" fillOpacity=".1" />
				</pattern>
			</defs>
			<rect width="560" height="360" fill="url(#story-dots)" />
			<g fontSize="11" fontWeight="500" letterSpacing="2">
				<motion.text x="40" y="40" style={{ fill: stagePlan }}>PLAN</motion.text>
				<motion.text x="230" y="40" style={{ fill: stageBuild }}>BUILD</motion.text>
				<motion.text x="420" y="40" style={{ fill: stageShip }}>SHIP</motion.text>
				<text x="40" y="334" fontSize="9" letterSpacing="1.5" fill="#9ca3af">REQUIREMENTS</text>
				<text x="230" y="334" fontSize="9" letterSpacing="1.5" fill="#9ca3af">CODE + TESTS</text>
				<text x="420" y="334" fontSize="9" letterSpacing="1.5" fill="#9ca3af">PRODUCTION</text>
			</g>
			<g stroke="#2dd4bf" strokeOpacity=".55" strokeWidth="1.5" fill="none" strokeLinecap="round">
				{connectorPaths.map((path, index) => (
					<ScrollPath
						key={path}
						d={path}
						progress={progress}
						start={0.12 + index * 0.035}
						end={0.3 + index * 0.035}
						reduce={reduce}
					/>
				))}
				<ScrollPath d="M330 187H420" progress={progress} start={0.63} end={0.76} reduce={reduce} />
			</g>
			{sourceGroups.map((y, index) => (
				<SourceCard key={y} y={y} index={index} progress={progress} reduce={reduce} />
			))}
			<motion.g style={reduce ? undefined : { opacity: modelOpacity }}>
				<rect x="230" y="70" width="100" height="234" rx="14" fill="#151a21" stroke="#2dd4bf" strokeOpacity=".45" />
				<g fill="#fff" fillOpacity=".25">
					<circle cx="246" cy="88" r="3" />
					<circle cx="258" cy="88" r="3" />
					<circle cx="270" cy="88" r="3" />
				</g>
				<path d="M230 104H330" stroke="#242b35" />
				{codeLines.map((line, index) => (
					<CodeLine key={line.y} {...line} index={index} progress={progress} reduce={reduce} />
				))}
				<rect x="244" y="250" width="72" height="26" rx="13" fill="none" stroke="#2dd4bf" strokeOpacity=".6" />
				<ScrollPath d="M256 263l5 5 9-10" progress={progress} start={0.64} end={0.72} reduce={reduce} strokeWidth={2.2} />
				<rect x="278" y="259" width="26" height="4" rx="2" fill="#fff" fillOpacity=".4" />
				<rect x="278" y="266" width="16" height="4" rx="2" fill="#fff" fillOpacity=".2" />
			</motion.g>
			<motion.g style={reduce ? undefined : { opacity: productOpacity }}>
				<rect x="420" y="70" width="100" height="234" rx="14" fill="#151a21" stroke="#2dd4bf" strokeOpacity=".45" />
				<rect x="432" y="84" width="22" height="22" rx="5" fill="#0e1116" stroke="#2dd4bf" strokeOpacity=".45" />
				<path d="M441 89l-4 6 4 6m5-12 4 6-4 6" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<rect x="462" y="91" width="42" height="5" rx="2.5" fill="#fff" fillOpacity=".35" />
				<path d="M432 120H508" stroke="#242b35" />
				{[0, 1, 2].map((index) => (
					<ProductBar key={index} index={index} progress={progress} reduce={reduce} />
				))}
				<rect x="432" y="236" width="56" height="5" rx="2.5" fill="#fff" fillOpacity=".3" />
				<rect x="432" y="248" width="38" height="5" rx="2.5" fill="#fff" fillOpacity=".15" />
				<rect x="432" y="268" width="76" height="22" rx="11" fill="#2dd4bf" />
			</motion.g>
		</svg>
	);
}

function SourceCard({ y, index, progress, reduce }: { y: number; index: number; progress: MotionValue<number>; reduce: boolean }) {
	const opacity = useTransform(progress, [0, 0.08 + index * 0.025, 0.18 + index * 0.025], [0.35, 0.65, 1]);
	const x = useTransform(progress, [0, 0.18 + index * 0.025], [-16, 0]);

	return (
		<motion.g style={reduce ? undefined : { opacity, x }}>
			<rect x="40" y={y} width="100" height="48" rx="10" fill="#151a21" stroke="#242b35" />
			<rect x="52" y={y + 14} width="16" height="16" rx="4" fill="#2dd4bf" fillOpacity=".85" />
			<rect x="76" y={y + 16} width={index % 2 === 0 ? 50 : 40} height="5" rx="2.5" fill="#fff" fillOpacity=".35" />
			<rect x="76" y={y + 27} width={index % 2 === 0 ? 32 : 26} height="5" rx="2.5" fill="#fff" fillOpacity=".18" />
		</motion.g>
	);
}

function ScrollPath({
	d,
	progress,
	start,
	end,
	reduce,
	strokeWidth = 1.5,
}: {
	d: string;
	progress: MotionValue<number>;
	start: number;
	end: number;
	reduce: boolean;
	strokeWidth?: number;
}) {
	const pathLength = useTransform(progress, [start, end], [0, 1]);

	return (
		<motion.path
			d={d}
			pathLength="1"
			strokeDasharray="1"
			strokeWidth={strokeWidth}
			style={reduce ? undefined : { pathLength }}
		/>
	);
}

function CodeLine({
	x,
	y,
	width,
	color,
	start,
	index,
	progress,
	reduce,
}: {
	x: number;
	y: number;
	width: number;
	color: string;
	start: number;
	index: number;
	progress: MotionValue<number>;
	reduce: boolean;
}) {
	const scaleX = useTransform(progress, [start, start + 0.08], [0, 1]);

	return (
		<motion.rect
			x={x}
			y={y}
			width={width}
			height="6"
			rx="3"
			fill={color}
			fillOpacity={color === '#fff' ? 0.3 : 0.85}
			style={reduce ? undefined : { scaleX, transformBox: 'fill-box', transformOrigin: '0% 50%' }}
			data-code-line={index}
		/>
	);
}

function ProductBar({ index, progress, reduce }: { index: number; progress: MotionValue<number>; reduce: boolean }) {
	const scaleY = useTransform(progress, [0.76 + index * 0.035, 0.86 + index * 0.035], [0, 1]);
	const y = [110, 50, 140][index];
	const height = [50, 80, 36][index];

	return (
		<motion.rect
			x={438 + index * 24}
			y={y + height}
			width="14"
			height={height}
			rx="3"
			fill="#2dd4bf"
			fillOpacity={index === 0 ? 0.5 : index === 2 ? 0.7 : 1}
			style={reduce ? undefined : { scaleY, transformBox: 'fill-box', transformOrigin: '50% 100%' }}
		/>
	);
}
