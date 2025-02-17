import './App.css'
import Header from './components/Header'
import MainContent from './components/MainContent'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      <Header />
      <MainContent>
        {/* Your content will go here */}
        <p className="text-gray-600">Content area</p>
      </MainContent>
    </div>
  )
}

export default App
