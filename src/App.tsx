import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { AuthRequired, Layout } from './components'
import { Administration, Login, NoMatch, Registration } from './pages'

export default function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route index element={<Login />} />

          {/* registration route used for dev testing */}
          <Route path='registration' element={<Registration />} />

          {/* authenticated routes */}
          <Route element={<AuthRequired />}>
            {/* protected routes */}
            <Route path='dashboard/*' element={<Administration />} />
          </Route>

          {/* no-match routes */}
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
