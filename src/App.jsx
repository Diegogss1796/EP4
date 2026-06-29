/**
 * App.jsx
 * Configura el router, el AuthProvider y todas las rutas de la aplicación.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import LoginPage       from './pages/LoginPage'
import DashboardPage   from './pages/DashboardPage'
import CoursesPage     from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import SessionPage     from './pages/SessionPage'
import StudentZonePage from './pages/StudentZonePage'
import NotFoundPage    from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protegidas (requieren JWT válido) */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/cursos" element={
            <ProtectedRoute><CoursesPage /></ProtectedRoute>
          } />
          <Route path="/cursos/:id" element={
            <ProtectedRoute><CourseDetailPage /></ProtectedRoute>
          } />
          <Route path="/sesion" element={
            <ProtectedRoute><SessionPage /></ProtectedRoute>
          } />
          <Route path="/zona-estudiante" element={
            <ProtectedRoute><StudentZonePage /></ProtectedRoute>
          } />

          {/* Redirecciones */}
          <Route path="/"  element={<Navigate to="/dashboard" replace />} />
          <Route path="*"  element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
