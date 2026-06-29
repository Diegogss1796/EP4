/**
 * services/courseService.js
 * Consume el endpoint de cursos desde la API.
 * El token JWT se agrega automáticamente via el interceptor de Axios.
 */

import { apiClient } from './authService'

const DEMO_COURSES = [
  { id: 1, nombre: 'Programación Web II',      docente: 'Ing. Roberto Vega', creditos: 4, horario: 'Mar/Jue 18:00–20:00', cupos: 28, disponibles: 5  },
  { id: 2, nombre: 'Base de Datos Avanzado',   docente: 'Mg. Sandra Ríos',   creditos: 3, horario: 'Lun/Mie 15:00–17:00', cupos: 30, disponibles: 12 },
  { id: 3, nombre: 'Diseño UX/UI',             docente: 'Dis. Pedro Alva',   creditos: 3, horario: 'Vie 09:00–13:00',     cupos: 25, disponibles: 0  },
  { id: 4, nombre: 'Redes y Comunicaciones',   docente: 'Ing. Luis Torres',  creditos: 4, horario: 'Mar/Jue 07:00–09:00', cupos: 20, disponibles: 8  },
]

const courseService = {
  async getCourses() {
    const USE_DEMO_MODE = true
    if (USE_DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 800))
      return DEMO_COURSES
    }
    const response = await apiClient.get('/courses')
    return response.data
  },

  async getCourseById(id) {
    const USE_DEMO_MODE = true
    if (USE_DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 400))
      return DEMO_COURSES.find((c) => c.id === Number(id)) || null
    }
    const response = await apiClient.get(`/courses/${id}`)
    return response.data
  },

  async enroll(courseId) {
    const USE_DEMO_MODE = true
    if (USE_DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 600))
      return { success: true, message: 'Preinscripción registrada correctamente.' }
    }
    const response = await apiClient.post('/enrollments', { courseId })
    return response.data
  },
}

export default courseService
