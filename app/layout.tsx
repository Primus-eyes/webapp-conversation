import { getLocaleOnServer } from '@/i18n/server'
import { UserProvider } from './context/user-context'

import './styles/globals.css'
import './styles/markdown.scss'

const LocaleLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <body className="h-full">
        <UserProvider>
          <div className="overflow-x-auto">
            <div className="w-screen h-screen min-w-[300px]">
              {children}
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
