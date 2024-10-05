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

interface SignInCardProps {
	setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: SignInCardProps) => {
	const { signIn } = useAuthActions()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setPending(true)
		signIn('password', { email, password, flow: 'signIn' })
			.catch(() => {
				setError('Invalid email or password')
			})
			.finally(() => {
				setPending(false)
			})
	}

	const onProviderSignIn = (value: 'google' | 'github') => {
		setPending(true)
		signIn(value).finally(() => {
			setPending(false)
		})
	}

	return (
		<Card className='h-full w-full p-8'>
			<CardHeader className='px-0 pt-0'>
				<CardTitle>Sign in to your account</CardTitle>
				<CardDescription>By using email or services</CardDescription>
			</CardHeader>
			{!!error && (
				<div className='mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
					<TriangleAlert className='size-4' />
					<p>{error}</p>
				</div>
			)}
			<CardContent className='space-y-5 px-0 pb-0'>
				<form onSubmit={onPasswordSignIn} className='space-y-2.5'>
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
					<Button type='submit' disabled={pending} className='w-full' size='lg'>
						Continue
					</Button>
				</form>
				<Separator />
				<div className='flex flex-col gap-y-2.5'>
					<Button
						disabled={pending}
						onClick={() => onProviderSignIn('google')}
						className='relative w-full'
						size='lg'
						variant='outline'>
						<FcGoogle className='absolute left-2.5 top-2.5 size-5' />
						Continue with Google
					</Button>
					<Button
						disabled={pending}
						onClick={() => onProviderSignIn('github')}
						className='relative w-full'
						size='lg'
						variant='outline'>
						<FaGithub className='absolute left-2.5 top-2.5 size-5' />
						Continue with GitHub
					</Button>
				</div>
				<p className='text-xs text-muted-foreground'>
					Don&apos;t have an account?{' '}
					<span
						onClick={() => setState('signUp')}
						className='cursor-pointer text-sky-700 hover:underline'>
						Sign Up
					</span>
				</p>
			</CardContent>
		</Card>
	)
}
