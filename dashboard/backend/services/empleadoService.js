const Empleado = require('../models/Empleado');

class EmpleadoService {
  async createEmpleado(data) {
    const empleado = new Empleado(data);
    await empleado.save();
    return empleado;
  }

  async getEmpleado(id) {
    return await Empleado.findById(id);
  }

  async updateEmpleado(id, data) {
    return await Empleado.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteEmpleado(id) {
    return await Empleado.findByIdAndDelete(id);
  }
}

module.exports = new EmpleadoService();
