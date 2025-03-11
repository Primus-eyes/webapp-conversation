'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from './components/LoginForm'

const LoginPage = () => {
    const router = useRouter()

    // 检查用户是否已登录，如果已登录则重定向到首页
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
        if (userInfo) {
            router.push('/')
        }
    }, [router])

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        福建协和医院癌痛智能问答系统
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        请登录以继续使用系统
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage 
