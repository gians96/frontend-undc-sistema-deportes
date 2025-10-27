import api from "@/services/api";

let posicionesCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

const sportMap = {
  1: "futsal",
  2: "basquet",
  3: "voley",
  4: "ajedrez",
  5: "gincana",
};

// Mapeo de IDs de deporte a sus nombres para mantener la estructura anterior
const sportNameMap = {
  1: "Fútsal",
  2: "Básquet",
  3: "Vóley",
  4: "Ajedrez",
  5: "Gincana",
};

async function fetchPosiciones() {
  const now = Date.now();
  if (posicionesCache && now - lastFetchTime < CACHE_DURATION) {
    return posicionesCache;
  }

  try {
    const response = await api.get("/api/posiciones");
    posicionesCache = response.data;
    lastFetchTime = now;
    return posicionesCache;
  } catch (error) {
    console.error(
      "Error al obtener la tabla de posiciones desde la API:",
      error
    );
    posicionesCache = null;
    lastFetchTime = 0;
    throw error;
  }
}

export const obtenerPosiciones = async (deporteId = 1) => {
  try {
    const allPosiciones = await fetchPosiciones();

    const sportKey = sportMap[deporteId];

    if (!sportKey || !allPosiciones || !allPosiciones[sportKey]) {
      return {
        id_deporte: deporteId,
        nombre_deporte: sportNameMap[deporteId] || "Deporte Desconocido",
        torneo: "Sin torneo activo",
        fecha_actualizacion: new Date().toISOString(),
        posiciones: [],
      };
    }

    // Se obtienen las posiciones para el deporte solicitado
    const posicionesFromApi = allPosiciones[sportKey];

    const posiciones = posicionesFromApi.map((item) => ({
      ...item,
      pe: item.pj - item.pg - item.pp,
    }));

    return {
      id_deporte: deporteId,
      nombre_deporte: sportNameMap[deporteId],
      torneo: "Semana Sistémica 2025",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: posiciones,
    };
  } catch (error) {
    const message = error.response?.data?.mensaje || "Error al cargar torneo";
    return {
      id_deporte: deporteId,
      nombre_deporte: sportNameMap[deporteId] || "Deporte",
      torneo: message,
      fecha_actualizacion: new Date().toISOString(),
      posiciones: [],
    };
  }
};
