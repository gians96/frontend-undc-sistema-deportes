// API simulada para obtener tabla de posiciones
export const obtenerPosiciones = async (deporteId = 1) => {
  // Simulación de delay de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Datos simulados basados en simulacion-api.json
  const datosSimulados = {
    1: { // Fútsal
      id_deporte: 1,
      nombre_deporte: "Fútsal",
      torneo: "Torneo Interuniversitario 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    },
    3: { // Vóley
      id_deporte: 3,
      nombre_deporte: "Vóley",
      torneo: "Copa Universitaria de Vóley 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    },
    4: { // Ajedrez
      id_deporte: 4,
      nombre_deporte: "Ajedrez",
      torneo: "Torneo de Ajedrez Universitario 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    },
    5: { // Gincana
      id_deporte: 5,
      nombre_deporte: "Gincana",
      torneo: "Gincana Universitaria 2025",
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

