// API simulada para obtener tabla de posiciones
export const obtenerPosiciones = async (deporteId = 1) => {
  // Simulación de delay de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Datos simulados basados en simulacion-api.json
  const datosSimulados = {
    1: { // Fútbol
      id_deporte: 1,
      nombre_deporte: "Fútbol",
      torneo: "Torneo Interuniversitario 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    },
    2: { // Básquet
      id_deporte: 2,
      nombre_deporte: "Básquet",
      torneo: "Copa Universitaria de Básquet 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    },
    3: { // Volleyball
      id_deporte: 3,
      nombre_deporte: "Volleyball",
      torneo: "Liga Universitaria de Volleyball 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    }
  };

  // Si no hay datos para el deporte solicitado, devolver estructura vacía
  if (!datosSimulados[deporteId]) {
    return {
      id_deporte: deporteId,
      nombre_deporte: "Deporte",
      torneo: "Sin torneo activo",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    };
  }

  return datosSimulados[deporteId];
};

// Función para obtener lista de deportes disponibles
export const obtenerDeportesDisponibles = () => {
  return [
    { id: 1, nombre: "Fútbol", icono: "fa-solid fa-futbol" },
    { id: 2, nombre: "Básquet", icono: "fa-solid fa-basketball" },
    { id: 3, nombre: "Volleyball", icono: "fa-solid fa-volleyball" }
  ];
};
