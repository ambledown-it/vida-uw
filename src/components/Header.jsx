import { UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import Menu from './Menu'

const Header = () => {
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.firstname) {
      setFirstName(user.firstname)
    }
  }, [])

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
          <span className="text-lg font-medium">
            {firstName}
          </span>
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