const Reporte = require('../models/Reporte');

class ReporteService {
  async createReporte(data) {
    const reporte = new Reporte(data);
    await reporte.save();
    return reporte;
  }

  async getReporte(id) {
    return await Reporte.findById(id).populate('generadoPor');
  }

  async updateReporte(id, data) {
    return await Reporte.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteReporte(id) {
    return await Reporte.findByIdAndDelete(id);
  }
}

module.exports = new ReporteService();
