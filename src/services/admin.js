import api from "./api";

export const adminService = {
  async mostrarVoucher(estado = null) {
    const params = estado ? { estado } : {};
    const respuesta = await api.get("/api/admin/vouchers", { params });

    return respuesta.data;
  },

  async validarVoucher(idVoucher, estado) {
    const respuesta = await api.patch(`/api/admin/vouchers/${idVoucher}/validar`, { estado });
    return respuesta.data;
  },

  async mostrarEquiposPorDeporte(idDeporte) {
    const respuesta = await api.get(`/api/admin/equipos/${idDeporte}`);
    return respuesta.data;
  },
};

