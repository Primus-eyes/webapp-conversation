'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { UserRole } from '../login/components/LoginForm'

// 用户信息类型
export interface UserInfo {
    username: string
    displayName: string
    role: UserRole
}

// 上下文类型
interface UserContextType {
    userInfo: UserInfo | null
    isLoading: boolean
    login: (userInfo: UserInfo, rememberMe: boolean) => void
    logout: () => void
}

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined)

// 上下文提供者属性
interface UserProviderProps {
    children: ReactNode
}

// 上下文提供者组件
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    // 初始化时从localStorage或sessionStorage加载用户信息
    useEffect(() => {
        const loadUserInfo = () => {
            try {
                const storedUserInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
                if (storedUserInfo) {
                    setUserInfo(JSON.parse(storedUserInfo))
                }
            } catch (error) {
                console.error('Failed to load user info:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadUserInfo()
    }, [])

    // 登录函数
    const login = (info: UserInfo, rememberMe: boolean) => {
        setUserInfo(info)
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('userInfo', JSON.stringify(info))
    }

    // 登出函数
    const logout = () => {
        setUserInfo(null)
        localStorage.removeItem('userInfo')
        sessionStorage.removeItem('userInfo')
        router.push('/login')
    }

    return (
        <UserContext.Provider value={{ userInfo, isLoading, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

// 自定义Hook，用于在组件中使用上下文
export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
} 
