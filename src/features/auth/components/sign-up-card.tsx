import { useState } from 'react'

import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { SignInFlow } from '../types'

interface SignUpCardProps {
	setState: (state: SignInFlow) => void
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
	const { signIn } = useAuthActions()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		setPending(true)
		signIn('password', { name, email, password, flow: 'signUp' })
			.catch(() => {
				setError('Something went wrong. Please try again.')
			})
			.finally(() => {
				setPending(false)
			})
	}

	const onProviderSignUp = (value: 'google' | 'github') => {
		setPending(true)
		signIn(value).finally(() => {
			setPending(false)
		})
	}

	return (
		<Card className='h-full w-full p-8'>
			<CardHeader className='px-0 pt-0'>
				<CardTitle>Sign up to continue</CardTitle>
				<CardDescription>By using email or services</CardDescription>
			</CardHeader>
			{!!error && (
				<div className='mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
					<TriangleAlert className='size-4' />
					<p>{error}</p>
				</div>
			)}
			<CardContent className='space-y-5 px-0 pb-0'>
				<form onSubmit={onPasswordSignUp} className='space-y-2.5'>
					<Input
						placeholder='Full Name'
						disabled={pending}
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<Input
						type='email'
						placeholder='Email'
						disabled={pending}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Input
						type='password'
						placeholder='Password'
						disabled={pending}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Input
						type='password'
						placeholder='Confirm Password'
						disabled={pending}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<Button type='submit' disabled={pending} className='w-full' size='lg'>
						Continue
					</Button>
				</form>
				<Separator />
				<div className='flex flex-col gap-y-2.5'>
					<Button
						disabled={pending}
						onClick={() => onProviderSignUp('google')}
						className='relative w-full'
						size='lg'
						variant='outline'>
						<FcGoogle className='absolute left-2.5 top-2.5 size-5' />
						Continue with Google
					</Button>
					<Button
						disabled={pending}
						onClick={() => onProviderSignUp('github')}
						className='relative w-full'
						size='lg'
						variant='outline'>
						<FaGithub className='absolute left-2.5 top-2.5 size-5' />
						Continue with GitHub
					</Button>
				</div>
				<p className='text-xs text-muted-foreground'>
					Already have an account?{' '}
					<span
						onClick={() => setState('signIn')}
						className='cursor-pointer text-sky-700 hover:underline'>
						Sign In
					</span>
				</p>
			</CardContent>
		</Card>
	)
}
