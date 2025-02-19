import './App.css'
import Header from './components/Header'
import MainContent from './components/MainContent'
import LoginForm from './components/LoginForm'
import ApplicationsTable from './components/ApplicationsTable'
import { useAuth } from './contexts/AuthContext'
import { ManualUnderwritingProvider } from './contexts/ManualUnderwritingContext'

function App() {
  const { user } = useAuth()

  return (
    <ManualUnderwritingProvider>
      <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
        {user && <Header />}
        <MainContent fullHeight={!user}>
          {!user ? (
            <LoginForm />
          ) : (
            <div className="h-full">
              <ApplicationsTable />
            </div>
          )}
        </MainContent>
      </div>
    </ManualUnderwritingProvider>
  )
}

export default App
