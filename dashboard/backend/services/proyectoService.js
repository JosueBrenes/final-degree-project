const Proyecto = require('../models/Proyecto');

class ProyectoService {
  async createProyecto(data) {
    const proyecto = new Proyecto(data);
    await proyecto.save();
    return proyecto;
  }

  async getProyecto(id) {
    return await Proyecto.findById(id).populate('responsable tareas.responsable');
  }

  async updateProyecto(id, data) {
    return await Proyecto.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProyecto(id) {
    return await Proyecto.findByIdAndDelete(id);
  }
}

module.exports = new ProyectoService();
