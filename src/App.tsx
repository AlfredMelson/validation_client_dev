import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components'
import { Administration, Login, Mismatch } from './pages'

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname}>
        <Route path='/' element={<AppLayout />}>
          {/* public routes */}
          <Route index element={<Login />} />

          {/* authenticated routes */}
          {/* <Route element={<AuthRequired />}> */}
          {/* protected routes */}
          <Route path='dashboard/*' element={<Administration />} />
          {/* </Route> */}

          {/* mismatch route */}
          <Route path='*' element={<Mismatch />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
