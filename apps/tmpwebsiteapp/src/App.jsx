import Dashboard from './views/Dashboard'
import Login from './views/Login'
import { HashRouter as Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route index path='/' element={<Dashboard />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
