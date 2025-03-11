'use client'
import type { FC } from 'react'
import React from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'
import AuthGuard from './components/auth-guard'

const App: FC<IMainProps> = ({
  params,
}: any) => {
  return (
    <AuthGuard>
      <Main params={params} />
    </AuthGuard>
  )
}

export default React.memo(App)
