'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../context/user-context'
import Loading from './base/loading'

interface AuthGuardProps {
    children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { userInfo, isLoading } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !userInfo) {
            router.push('/login')
        }
    }, [userInfo, isLoading, router])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loading />
            </div>
        )
    }

    if (!userInfo) {
        return null // 不渲染任何内容，等待重定向
    }

    return <>{children}</>
}

export default AuthGuard 
