'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

interface HintProps {
	children: React.ReactNode
	label: string
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
}

export const Hint = ({ children, label, side, align }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
					className='border-white/5 bg-black text-white'>
					<p className='text-xs font-medium'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
