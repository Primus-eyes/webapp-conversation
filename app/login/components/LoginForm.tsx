'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Toast from '@/app/components/base/toast'
import { useUser } from '@/app/context/user-context'

// 预设账号
const ACCOUNTS = {
  // 药师账号 (role=0)
  'pharmacist1': { password: 'pharma123', role: 0, displayName: '药师一' },
  'pharmacist2': { password: 'pharma123', role: 0, displayName: '药师二' },
  // 患者账号 (role=1)
  'patient1': { password: 'patient123', role: 1, displayName: '患者一' },
  'patient2': { password: 'patient123', role: 1, displayName: '患者二' },
}

// 角色枚举
export enum UserRole {
  Pharmacist = 0,
  Patient = 1,
}

// 用户信息类型
export interface UserInfo {
  username: string
  displayName: string
  role: UserRole
}

const LoginForm = () => {
  const router = useRouter()
  const { login } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // 简单的前端验证
    if (!username || !password) {
      setError('请输入用户名和密码')
      setIsLoading(false)
      return
    }

    // 验证账号密码
    const account = ACCOUNTS[username as keyof typeof ACCOUNTS]
    if (!account || account.password !== password) {
      setError('用户名或密码错误')
      setIsLoading(false)
      return
    }

    // 登录成功，保存用户信息到上下文
    const userInfo: UserInfo = {
      username,
      displayName: account.displayName,
      role: account.role,
    }

    // 使用上下文提供者的登录方法
    login(userInfo, rememberMe)

    // 显示成功提示
    Toast.notify({ type: 'success', message: '登录成功' })

    // 延迟跳转到主页
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="username" className="sr-only">
            用户名
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            密码
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            记住我
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : null}
          登录
        </button>
      </div>
    </form>
  )
}

export default LoginForm 
