import { UserRound } from 'lucide-react'
import Menu from './Menu'
import useAppStore from '../store/useAppStore'

const Header = () => {
  const user = useAppStore(state => state.user)
  const role = useAppStore(state => state.role)
  const firstName = user?.firstname || ''

  return (
    <header 
      className="sticky top-0 z-10 w-full bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url("/bg-header.svg")' }}
    >
      {/* Main Header Content */}
      <div className="h-24 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/vida-logo-outline.png" 
            alt="Vida Logo" 
            className="h-12 w-auto"
          />
          <h2 className="font-bold text-3xl text-white">
            Vida Life Underwriting Portal
          </h2>
        </div>
        <div className="flex items-center gap-3 text-white">
          <div className="flex flex-col items-end">
            <span className="text-lg font-medium">
              {firstName}
            </span>
            <span className="text-sm text-white/70">
              {role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : 'User'}
            </span>
          </div>
          <UserRound className="w-8 h-8" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6">
        <Menu />
      </div>
    </header>
  )
}

export default Header 