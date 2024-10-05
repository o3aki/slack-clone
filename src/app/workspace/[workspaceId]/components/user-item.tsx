import Link from 'next/link'

import { type VariantProps, cva } from 'class-variance-authority'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { cn } from '@/lib/utils'

import { Id } from '../../../../../convex/_generated/dataModel'

const userItemVariants = cva(
	'flex items-center justify-start gap-1.5 h-7 font-normal px-4 text-sm overflow-hidden',
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

interface UserItemProps {
	id: Id<'members'>
	label?: string
	image?: string
	variant?: VariantProps<typeof userItemVariants>['variant']
}
export const UserItem = ({
	id,
	label = 'member',
	image,
	variant,
}: UserItemProps) => {
	const workspaceId = useWorkspaceId()
	const avatarFallback = label.charAt(0).toUpperCase()

	return (
		<Button
			asChild
			variant='transparent'
			size='sm'
			className={cn(userItemVariants({ variant: variant }))}>
			<Link href={`/workspace/${workspaceId}/member/${id}`}>
				<Avatar className='mr-1 size-5 rounded-md'>
					<AvatarImage src={image} className='rounded-md' />
					<AvatarFallback className='rounded-md bg-slate-500 text-xs text-white'>
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
				<span className='truncate text-sm'>{label}</span>
			</Link>
		</Button>
	)
}
