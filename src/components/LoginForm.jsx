import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const { login, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(credentials)
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full max-w-md">
        <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="p-8 flex flex-col justify-center min-h-[400px] h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Login to the Vida Underwriting Portal
            </h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <button
                type="submit"
                className="w-full"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm 