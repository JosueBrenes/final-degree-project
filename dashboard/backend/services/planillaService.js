const Planilla = require('../models/Planilla');

class PlanillaService {
  async createPlanilla(data) {
    const planilla = new Planilla(data);
    await planilla.save();
    return planilla;
  }

  async getPlanilla(id) {
    return await Planilla.findById(id).populate('empleadoId');
  }

  async updatePlanilla(id, data) {
    return await Planilla.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePlanilla(id) {
    return await Planilla.findByIdAndDelete(id);
  }
}

module.exports = new PlanillaService();
