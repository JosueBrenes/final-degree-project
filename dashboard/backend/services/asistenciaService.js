const Asistencia = require('../models/Asistencia');

class AsistenciaService {
  async createAsistencia(data) {
    const asistencia = new Asistencia(data);
    await asistencia.save();
    return asistencia;
  }

  async getAsistencia(id) {
    return await Asistencia.findById(id).populate('empleadoId');
  }

  async updateAsistencia(id, data) {
    return await Asistencia.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteAsistencia(id) {
    return await Asistencia.findByIdAndDelete(id);
  }
}

module.exports = new AsistenciaService();

