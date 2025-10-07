import api from "@/services/api";

const BASE_URL = '/api/admin/equipos';

export const obtenerEquiposPorDeporte = async (deporteId) => {
    try {
        const response = await api.get(`${BASE_URL}/${deporteId}`);
        return response.data;
    } catch (e) {
        console.error('Error al obtener equipos por deporte:', e);
        throw e;
    }
}

export const obtenerEnfrentamientosPorDeporte = async (deporteId) => {
    try {
        const response = await api.get(`${BASE_URL}/enfrentamientos/${deporteId}`);
        return response.data;
    } catch (e) {
        console.error('Error al obtener enfrentamientos por deporte:', e);
    }
}