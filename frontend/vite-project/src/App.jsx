import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import Layout from './components/Layout.jsx'

const Login = lazy(() => import('./pages/Login.jsx'))
const SignUp = lazy(() => import('./pages/SignUp.jsx'))
const StudentDashboard = lazy(() => import('./pages/StudentDashboard.jsx'))
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard.jsx'))
const Quiz = lazy(() => import('./pages/Quiz.jsx'))
const Challenges = lazy(() => import('./pages/Challenges.jsx'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-surface">
          <Spinner aria-label="Loading" color="info" size="xl" />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/challenges" element={<Challenges />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
