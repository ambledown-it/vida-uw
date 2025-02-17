const MainContent = ({ children }) => {
  return (
    <main className="flex-1 w-full min-h-0">
      <div className="h-full w-full p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full w-full">
          {children}
        </div>
      </div>
    </main>
  )
}

export default MainContent 