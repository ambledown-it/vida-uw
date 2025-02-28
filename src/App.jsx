import './App.css'
import Header from './components/Header'
import MainContent from './components/MainContent'
import LoginForm from './components/LoginForm'
import ApplicationsTable from './components/ApplicationsTable'
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard.jsx'
import { useAuth } from './hooks/useAuth'
import useAppStore from './store/useAppStore'

function App() {
  const { user } = useAuth()
  const activeMenuItem = useAppStore(state => state.activeMenuItem)

  // Render content based on active menu item
  const renderContent = () => {
    if (!user) {
      return <LoginForm />
    }

    switch (activeMenuItem) {
      case 'applications':
        return (
          <div className="h-full">
            <ApplicationsTable />
          </div>
        )
      case 'analytics':
        return (
          <div className="h-full">
            <AnalyticsDashboard />
          </div>
        )
      default:
        return (
          <div className="h-full">
            <ApplicationsTable />
          </div>
        )
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      {user && <Header />}
      <MainContent fullHeight={!user}>
        {renderContent()}
      </MainContent>
    </div>
  )
}

export default App
