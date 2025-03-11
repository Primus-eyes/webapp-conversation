'use client'
import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
import { useUser } from '../context/user-context'
import { UserRole } from '../login/components/LoginForm'

export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  const { userInfo, logout } = useUser()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-gray-100">
      {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-4 w-4 text-gray-500" />
          </div>
        )
        : <div></div>}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className=" text-sm text-gray-800 font-bold">{title}</div>
      </div>
      <div className='flex items-center space-x-4'>
        {userInfo && (
          <div className='flex items-center space-x-2'>
            <UserCircleIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">{userInfo.displayName}</span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {userInfo.role === UserRole.Pharmacist ? '药师' : '患者'}
            </span>
          </div>
        )}
        <div
          className='flex items-center justify-center h-8 w-8 cursor-pointer'
          onClick={handleLogout}
          title="退出登录"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-500" />
        </div>
        {isMobile
          ? (
            <div className='flex items-center justify-center h-8 w-8 cursor-pointer'
              onClick={() => onCreateNewChat?.()}
            >
              <PencilSquareIcon className="h-4 w-4 text-gray-500" />
            </div>)
          : <div></div>}
      </div>
    </div>
  )
}

export default React.memo(Header)
