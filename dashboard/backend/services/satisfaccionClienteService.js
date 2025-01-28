const SatisfaccionCliente = require('../models/SatisfaccionCliente');

class SatisfaccionClienteService {
  async createSatisfaccion(data) {
    const satisfaccion = new SatisfaccionCliente(data);
    await satisfaccion.save();
    return satisfaccion;
  }

  async getSatisfaccion(id) {
    return await SatisfaccionCliente.findById(id)
      .populate('clienteId')
      .populate('servicioId')
      .populate('accionesCorrectivas.responsable');
  }

  async updateSatisfaccion(id, data) {
    return await SatisfaccionCliente.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSatisfaccion(id) {
    return await SatisfaccionCliente.findByIdAndDelete(id);
  }
}

module.exports = new SatisfaccionClienteService();
