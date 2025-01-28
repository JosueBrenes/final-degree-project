const Factura = require('../models/Factura');

class FacturaService {
  async createFactura(data) {
    const factura = new Factura(data);
    await factura.save();
    return factura;
  }

  async getFactura(id) {
    return await Factura.findById(id).populate('clienteId');
  }

  async updateFactura(id, data) {
    return await Factura.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFactura(id) {
    return await Factura.findByIdAndDelete(id);
  }
}

module.exports = new FacturaService();
