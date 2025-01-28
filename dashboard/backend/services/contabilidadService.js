const Contabilidad = require('../models/Contabilidad');

class ContabilidadService {
  async createTransaccion(data) {
    const transaccion = new Contabilidad(data);
    await transaccion.save();
    return transaccion;
  }

  async getTransaccion(id) {
    return await Contabilidad.findById(id).populate('responsable');
  }

  async updateTransaccion(id, data) {
    return await Contabilidad.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTransaccion(id) {
    return await Contabilidad.findByIdAndDelete(id);
  }
}

module.exports = new ContabilidadService();
