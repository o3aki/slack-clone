'use client'

import { ReactNode } from 'react'

import { Provider } from 'jotai'

interface JotaiProviderProps {
	children: ReactNode
}
export const JotaiProvider = ({ children }: { children: ReactNode }) => {
	return <Provider>{children}</Provider>
}
