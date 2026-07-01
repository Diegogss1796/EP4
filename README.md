# Gestión de Cursos e Inscripciones – Experiencia Integrada
**Programación Web II – PA4**

## Integrantes
| Nombre | Código |
|--------|--------|
| (Diego Gallardo) | — |
| (Diego Salva) | — |
| (Andrés Trujillo) | — |
| (Gabriela Fumiko Furukawa Oki) | — |
| (Misha Reuven) | — |

## Descripción
Portal del Estudiante ISIL — Parte 1 del PA4.  
Implementa autenticación con JWT, rutas protegidas con React Router y manejo de sesión con sessionStorage.

## Tecnologías
- React 18 + Vite
- React Router DOM v6
- Axios
- JWT (simulado / reemplazable por API real)

## Estructura de carpetas
```
src/
├── context/        → AuthContext.jsx (estado global de sesión)
├── services/       → authService.js, courseService.js (llamadas a la API)
├── hooks/          → useSession.js (info detallada de sesión)
├── components/     → Navbar.jsx, ProtectedRoute.jsx
├── pages/          → LoginPage, DashboardPage, CoursesPage...
├── utils/          → jwt.js (encode/decode JWT)
├── App.jsx         → Router y rutas
├── main.jsx        → Punto de entrada
└── index.css       → Estilos globales
```

## Variables de entorno
Crea un archivo `.env` en la raíz con:
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Portal del Estudiante ISIL
```
> Ver `.env.example` para referencia.

## Instalación y ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Build para producción
npm run build

# 4. Vista previa del build
npm run preview
```

## Usuarios de prueba
| Email | Contraseña | Rol |
|-------|------------|-----|
| estudiante@isil.pe | 123456   | Estudiante    |
| carlos@isil.pe     | pass123  | Estudiante    |
| admin@isil.pe      | admin123 | Administrador |

## Rutas de la aplicación
| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/login` | Pública | Formulario de inicio de sesión |
| `/dashboard` | Protegida | Panel principal del estudiante |
| `/cursos` | Protegida | Listado de cursos (consume API) |
| `/cursos/:id` | Protegida | Detalle de un curso |
| `/sesion` | Protegida | Inspector del token JWT y sesión |
| `/zona-estudiante` | Protegida (rol Estudiante) | RBAC — solo estudiantes |

## Video de sustentación
[Enlace al video en YouTube](#) ← reemplazar con el link real

## Distribución de aportes
| Integrante | Aporte |
|------------|--------|
| (Diego Gallardo) | AuthContext, useSession |
| (Diego Salva) | LoginPage, ProtectedRoute |
| (Andrés Trujillo) | CoursesPage, CourseDetailPage |
| (Gabriela Fumiko Furukawa Oki) | SessionPage, StudentZonePage |
| (Misha Reuven) | Control de variables de entorno, Documentación del repositorio (README) |
