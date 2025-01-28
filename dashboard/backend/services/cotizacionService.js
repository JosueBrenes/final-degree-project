const Cotizacion = require('../models/Cotizacion');

class CotizacionService {
  async createCotizacion(data) {
    const cotizacion = new Cotizacion(data);
    await cotizacion.save();
    return cotizacion;
  }

  async getCotizacion(id) {
    return await Cotizacion.findById(id).populate('clienteId');
  }

  async updateCotizacion(id, data) {
    return await Cotizacion.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCotizacion(id) {
    return await Cotizacion.findByIdAndDelete(id);
  }
}

module.exports = new CotizacionService();
