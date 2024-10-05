import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface InviteModalProps {
	open: boolean
	setOpen: (open: boolean) => void
}
export const InviteModal = ({ open, setOpen }: InviteModalProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite members to this workspace</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
