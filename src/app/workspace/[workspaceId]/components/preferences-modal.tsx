import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRemoveWorkspace } from '@/features/workspaces/api/use-remove-workspace'
import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace'
import { useConfirm } from '@/hooks/use-confirm'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

interface PreferencesModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	initialValue: string
}
export const PreferencesModal = ({
	open,
	setOpen,
	initialValue,
}: PreferencesModalProps) => {
	const router = useRouter()
	const workspaceId = useWorkspaceId()
	const [ConfirmDialog, confirm] = useConfirm(
		'Are you sure you want to remove this workspace?',
		'This action cannot be undone.',
	)

	const [value, setValue] = useState(initialValue)
	const [editOpen, setEditOpen] = useState(false)

	const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
		useUpdateWorkspace()
	const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
		useRemoveWorkspace()

	const handleRemove = async () => {
		const ok = await confirm()

		if (!ok) return

		removeWorkspace(
			{ id: workspaceId },
			{
				onSuccess: () => {
					toast.success('Workspace removed')
					router.replace('/')
				},
				onError: () => {
					toast.error('Failed to remove workspace')
				},
			},
		)
	}

	const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		updateWorkspace(
			{ id: workspaceId, name: value },
			{
				onSuccess: () => {
					toast.success('Workspace updated')
					setEditOpen(false)
				},
				onError: () => {
					toast.error('Failed to update workspace')
				},
			},
		)
	}

	return (
		<>
			<ConfirmDialog />
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='overflow-hidden bg-gray-50 p-0'>
					<DialogHeader className='border-b bg-white p-4'>
						<DialogTitle>{value}</DialogTitle>
					</DialogHeader>
					<div className='flex flex-col gap-y-2 px-4 pb-4'>
						<Dialog open={editOpen} onOpenChange={setEditOpen}>
							<DialogTrigger asChild>
								<div className='cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-semibold'>Workspace Name</p>
										<p className='text-sm font-semibold text-[#1264A3] hover:underline'>
											Edit
										</p>
									</div>
									<p className='text-sm text-muted-foreground'>{value}</p>
								</div>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Rename this workspace</DialogTitle>
								</DialogHeader>
								<form onSubmit={handleEdit} className='space-y-4'>
									<Input
										value={value}
										onChange={(e) => setValue(e.target.value)}
										disabled={isUpdatingWorkspace}
										required
										autoFocus
										minLength={3}
										maxLength={80}
										placeholder='Workspace name e.g. "Work", "Personal", etc'
									/>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant='outline' disabled={isUpdatingWorkspace}>
												Cancel
											</Button>
										</DialogClose>
										<Button disabled={isUpdatingWorkspace}>Save</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
						<button
							onClick={handleRemove}
							disabled={isRemovingWorkspace}
							className='flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50'>
							<TrashIcon className='size-4' />
							<p className='text-sm font-semibold'>Delete Workspace</p>
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
