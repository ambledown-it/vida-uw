import { UserRound } from 'lucide-react'

const Header = () => {
  return (
    <header 
      className="sticky top-0 z-10 w-full h-24 bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url("/bg-wide.svg")' }}
    >
      <div className="w-full h-full px-6 flex items-center justify-between">
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
        <UserRound className="text-white w-8 h-8" />
      </div>
    </header>
  )
}

export default Header 