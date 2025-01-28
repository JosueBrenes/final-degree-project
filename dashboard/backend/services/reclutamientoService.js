const Reclutamiento = require('../models/Reclutamiento');

class ReclutamientoService {
  async createReclutamiento(data) {
    const reclutamiento = new Reclutamiento(data);
    await reclutamiento.save();
    return reclutamiento;
  }

  async getReclutamiento(id) {
    return await Reclutamiento.findById(id).populate('responsable');
  }

  async updateReclutamiento(id, data) {
    return await Reclutamiento.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteReclutamiento(id) {
    return await Reclutamiento.findByIdAndDelete(id);
  }
}

module.exports = new ReclutamientoService();
