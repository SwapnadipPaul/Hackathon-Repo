import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

// Lazy load components for better performance
const Login = lazy(() => import('./pages/Login'))
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'))
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'))

export default function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}
