import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
// import Card from './card'
import type { ConversationItem } from '@/types/app'
import { useUser } from '@/app/context/user-context'
import { UserRole } from '@/app/login/components/LoginForm'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export type ISidebarProps = {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
}) => {
  const { t } = useTranslation()
  const { userInfo, logout } = useUser()

  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className="shrink-0 flex flex-col overflow-y-auto bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px] border-r border-gray-200 tablet:h-[calc(100vh_-_3rem)] mobile:h-screen"
    >
      {/* 顶部区域 - 新增一个固定高度的顶部间距 */}
      <div className="pt-4"></div>

      {/* 新建聊天按钮 */}
      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 px-4 mb-2">
          <Button
            onClick={() => { onCurrentIdChange('-1') }}
            className="group block w-full flex-shrink-0 !justify-start !h-9 text-primary-600 items-center text-sm">
            <PencilSquareIcon className="mr-2 h-4 w-4" /> {t('app.chat.newChat')}
          </Button>
        </div>
      )}

      {/* 历史会话列表 - 增加顶部间距并设置固定高度 */}
      <nav className="flex-1 space-y-1 bg-white px-4 py-2 overflow-y-auto">
        <div className="mb-2 text-xs font-medium text-gray-500 px-2">历史会话</div>
        <div className="space-y-1 max-h-[calc(100vh_-_240px)] overflow-y-auto pr-1">
          {list.map((item) => {
            const isCurrent = item.id === currentId
            const ItemIcon
              = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
            return (
              <div
                onClick={() => onCurrentIdChange(item.id)}
                key={item.id}
                className={classNames(
                  isCurrent
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
                )}
              >
                <ItemIcon
                  className={classNames(
                    isCurrent
                      ? 'text-primary-600'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5 flex-shrink-0',
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </div>
            )
          })}
        </div>
      </nav>

      {/* 用户信息和登出按钮 */}
      {userInfo && (
        <div className="mt-auto border-t border-gray-200 p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <UserCircleIcon className="h-6 w-6 text-primary-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">{userInfo.displayName}</span>
                <span className="text-xs px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full w-fit mt-1">
                  {userInfo.role === UserRole.Pharmacist ? '药师' : '患者'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
              title="退出登录"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">退出登录</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-shrink-0 pr-4 pb-4 pl-4">
        <div className="text-gray-400 font-normal text-xs">© {copyRight} {(new Date()).getFullYear()}</div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
