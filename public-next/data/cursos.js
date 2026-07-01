export const cursos = [
  {
    id: 'desarrollo-web',
    nombre: 'Desarrollo Web Frontend',
    categoria: 'Tecnologia',
    duracion: '12 semanas',
    modalidad: 'Virtual',
    nivel: 'Intermedio',
    resumen:
      'Aprende a construir interfaces modernas con HTML, CSS, JavaScript y componentes reutilizables.',
    descripcion:
      'Este curso introduce buenas practicas de desarrollo frontend, consumo de datos, estructura de componentes y publicacion de aplicaciones web.',
    aprendizajes: [
      'Crear paginas responsivas y accesibles.',
      'Organizar componentes para proyectos reales.',
      'Consumir datos locales o externos desde la interfaz.'
    ]
  },
  {
    id: 'base-datos',
    nombre: 'Fundamentos de Base de Datos',
    categoria: 'Datos',
    duracion: '10 semanas',
    modalidad: 'Presencial',
    nivel: 'Basico',
    resumen:
      'Domina conceptos esenciales de modelado, consultas SQL y gestion de informacion.',
    descripcion:
      'El curso cubre entidades, relaciones, normalizacion, consultas SQL y criterios para organizar datos de forma confiable.',
    aprendizajes: [
      'Disenar modelos entidad-relacion.',
      'Crear consultas SQL de lectura y filtrado.',
      'Identificar reglas basicas de integridad de datos.'
    ]
  },
  {
    id: 'marketing-digital',
    nombre: 'Marketing Digital Aplicado',
    categoria: 'Negocios',
    duracion: '8 semanas',
    modalidad: 'Virtual',
    nivel: 'Basico',
    resumen:
      'Planifica campanas digitales con objetivos claros, contenido relevante y medicion de resultados.',
    descripcion:
      'Este programa aborda canales digitales, audiencias, contenido, embudos y metricas para evaluar acciones de marketing.',
    aprendizajes: [
      'Definir objetivos medibles para campanas.',
      'Seleccionar canales segun audiencia.',
      'Interpretar indicadores basicos de rendimiento.'
    ]
  },
  {
    id: 'gestion-proyectos',
    nombre: 'Gestion de Proyectos Agiles',
    categoria: 'Gestion',
    duracion: '9 semanas',
    modalidad: 'Hibrida',
    nivel: 'Intermedio',
    resumen:
      'Organiza equipos, entregables y prioridades usando principios agiles y herramientas colaborativas.',
    descripcion:
      'El curso presenta planificacion incremental, roles, ceremonias, tableros de trabajo y seguimiento de avances.',
    aprendizajes: [
      'Priorizar requerimientos de valor.',
      'Usar tableros para seguimiento de tareas.',
      'Comunicar avances y riesgos del proyecto.'
    ]
  }
]

export function getCursoById(id) {
  return cursos.find((curso) => curso.id === id)
}
