const ramos = [
  { id: 'fcp', nombre: 'Fundamentos de la Ciencia Política', abre: ['iip', 'hpich'] },
  { id: 'ngd', nombre: 'Nociones Generales de Derecho', abre: ['dc'] },
  { id: 'rlm', nombre: 'Razonamiento Lógico Matemático', abre: ['mpg'] },
  { id: 'ifp', nombre: 'Inducción a la Formación Profesional', abre: [] },
  { id: 'cle', nombre: 'Competencias Lecto-Escritoras', abre: [] },
  { id: 'to', nombre: 'Teoría de la Organización', abre: ['ta'] },
  { id: 'ta', nombre: 'Teoría de la Administración', abre: ['apc', 'gp1'] },
  { id: 'soc', nombre: 'Sociología', abre: [] },
  { id: 'dc', nombre: 'Derecho Constitucional', abre: ['da1'] },
  { id: 'mpg', nombre: 'Matemática para la Gestión', abre: ['cg', 'est', 'afe'] },
  { id: 'hpich', nombre: 'Historia Política e Institucional de Chile', abre: [] },
  { id: 'tic', nombre: 'TIC', abre: ['si'] },
  { id: 'iip', nombre: 'Ideas e Instituciones Políticas', abre: [] },
  { id: 'da1', nombre: 'Derecho Administrativo I', abre: ['da2'] },
  { id: 'est', nombre: 'Estadística', abre: ['mic', 'miq'] },
  { id: 'ing1', nombre: 'Inglés I', abre: ['ing2'] },
  { id: 'apc', nombre: 'Administración Pública Chilena', abre: ['cp', 'abs'] },
  { id: 'gp1', nombre: 'Gestión de Personas I', abre: ['gp2'] },
  { id: 'da2', nombre: 'Derecho Administrativo II', abre: ['rlsp', 'afe', 'dip'] },
  { id: 'mic', nombre: 'Microeconomía', abre: ['mac'] },
  { id: 'ing2', nombre: 'Inglés II', abre: ['ing3'] },
  { id: 'gp2', nombre: 'Gestión de Personas II', abre: ['rlsp'] },
  { id: 'cp', nombre: 'Comunicación Pública', abre: ['si'] },
  { id: 'abs', nombre: 'Administración de Bienes y Servicios', abre: [] },
  { id: 'rlsp', nombre: 'Régimen Laboral en el Sector Público', abre: ['timtd', 'tpa'] },
  { id: 'cg', nombre: 'Contabilidad General', abre: ['cgn', 'timtd'] },
  { id: 'afe', nombre: 'Administración Financiera del Estado', abre: ['cgn', 'fp', 'timtd'] },
  { id: 'mac', nombre: 'Macroeconomía', abre: ['eii', 'timtd'] },
  { id: 'miq', nombre: 'Metodología Cuantitativa', abre: ['micual', 'timtd'] },
  { id: 'ing3', nombre: 'Inglés III', abre: ['timtd'] },
  { id: 'cgn', nombre: 'Contabilidad General de la Nación', abre: ['af', 'pp1', 'gar'] },
  { id: 'fp', nombre: 'Finanzas Públicas', abre: ['pp1'] },
  { id: 'eii', nombre: 'Economía e Integración Internacional', abre: ['pp1'] },
  { id: 'micual', nombre: 'Metodología Cualitativa', abre: ['tia', 'pp1'] },
  { id: 'timtd', nombre: 'Taller Integración Modelos Toma Decisiones', abre: ['pp1', 'ticp', 'ts1'] },
  { id: 'tpa', nombre: 'Transparencia y Probidad Adm.', abre: ['cgsp', 'pp1', 'tmf'] },
  { id: 'si', nombre: 'Sistema de Información', abre: [] },
  { id: 'cgsp', nombre: 'Control de la Gestión Pública', abre: ['gp'] },
  { id: 'dip', nombre: 'Derecho Internacional Público', abre: ['ri'] },
  { id: 'pp1', nombre: 'Práctica Profesional I', abre: ['pp2'] },
  { id: 'tmf', nombre: 'Teoría y Método de la Fiscalización', abre: ['am'] },
  { id: 'ts1', nombre: 'Taller Sello UV I', abre: ['ts2'] },
  { id: 'af', nombre: 'Análisis Financiero', abre: ['dfp'] },
  { id: 'ri', nombre: 'Relaciones Internacionales', abre: [] },
  { id: 'gp', nombre: 'Gerencia Pública', abre: ['pp', 'tnrc'] },
  { id: 'gar', nombre: 'Gobierno y Administración Regional', abre: [] },
  { id: 'am', nombre: 'Administración Municipal', abre: [] },
  { id: 'ts2', nombre: 'Taller Sello UV II', abre: ['ts3'] },
  { id: 'pp', nombre: 'Políticas Públicas', abre: ['st'] },
  { id: 'tnrc', nombre: 'Taller Negociación y Resolución Conflictos', abre: ['st'] },
  { id: 'pp2', nombre: 'Práctica Profesional II', abre: ['st'] },
  { id: 'ticp', nombre: 'Taller Integración Ciclo Profesional', abre: ['st'] },
  { id: 'dfp', nombre: 'Diseño y Formulación de Proyectos', abre: ['st'] },
  { id: 'ts3', nombre: 'Taller Sello UV III', abre: ['st'] },
  { id: 'st', nombre: 'Seminario de Título', abre: [] },
  { id: 'tia', nombre: 'Taller de Investigación Aplicada', abre: [] },
  { id: 'ae', nombre: 'Asignatura Electiva', abre: [] },
];

const mallaContainer = document.getElementById('malla');
const ramosMap = {};

function crearCaja(ramo) {
  const div = document.createElement('div');
  div.classList.add('ramo');
  div.id = ramo.id;
  div.innerHTML = `<h3>${ramo.nombre}</h3><p>ID: ${ramo.id}</p>`;
  if (ramo.abre.length > 0) div.classList.add('bloqueado');
  div.addEventListener('click', () => aprobarRamo(ramo));
  mallaContainer.appendChild(div);
  ramosMap[ramo.id] = { ...ramo, div, aprobado: false, bloqueado: ramo.abre.length > 0 };
}

function aprobarRamo(ramo) {
  const estado = ramosMap[ramo.id];
  if (estado.bloqueado || estado.aprobado) return;
  estado.aprobado = true;
  estado.div.classList.add('aprobado');
  for (let id of ramo.abre) {
    const siguiente = ramosMap[id];
    if (!siguiente) continue;
    siguiente.bloqueado = false;
    siguiente.div.classList.remove('bloqueado');
  }
}

ramos.forEach(crearCaja);
