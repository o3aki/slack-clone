import type { Metadata } from 'next'

import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server'

import { ConvexClientProvider } from '@/components/convex-client-provider'
import { JotaiProvider } from '@/components/jotai-provider'
import { Modals } from '@/components/modals'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ConvexAuthNextjsServerProvider>
			<html lang='en'>
				<body>
					<ConvexClientProvider>
						<JotaiProvider>
							<Toaster />
							<Modals />
							{children}
						</JotaiProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ConvexAuthNextjsServerProvider>
	)
}