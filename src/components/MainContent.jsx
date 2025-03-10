const MainContent = ({ children, fullHeight }) => {
  const isLoginPage = fullHeight // since fullHeight is only true on login page

  return (
    <main className={`flex-1 w-full min-h-0 ${fullHeight ? 'h-screen' : ''}`}>
      <div className="h-full w-full p-4">
        <div 
          className={`rounded-lg p-0 h-full w-full ${
            isLoginPage ? 'bg-no-repeat bg-cover bg-center' : 'bg-transparent'
          }`}
          style={isLoginPage ? { 
            backgroundImage: 'url("/bg-wide.svg")'
          } : undefined}
        >
          {children}
        </div>
      </div>
    </main>
  )
}

export default MainContent 