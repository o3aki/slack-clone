import Link from 'next/link'

import { VariantProps, cva } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons/lib'

import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { cn } from '@/lib/utils'

const sidebarItemVariants = cva(
	'flex items-center justify-start gap-1.5 h-7 font-normal px-[18px] text-sm overflow-hidden',
	{
		variants: {
			variant: {
				default: 'text-[#f9edffcc]',
				active: 'text-[#481349] bg-white/90 hover:bg-white/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

interface SidebarItemProps {
	label: string
	id: string
	icon: LucideIcon | IconType
	variant?: VariantProps<typeof sidebarItemVariants>['variant']
}

export const SidebarItem = ({
	label,
	id,
	icon: Icon,
	variant,
}: SidebarItemProps) => {
	const workspaceId = useWorkspaceId()

	return (
		<Button
			asChild
			variant='transparent'
			size='sm'
			className={cn(sidebarItemVariants({ variant: variant }))}>
			<Link href={`/workspace/${workspaceId}/channel/${id}`}>
				<Icon className='mr-1 size-3.5 shrink-0' />
				<span className='truncate text-sm'>{label}</span>
			</Link>
		</Button>
	)
}
