const Inventario = require('../models/Inventario');

class InventarioService {
  async createInventario(data) {
    const inventario = new Inventario(data);
    await inventario.save();
    return inventario;
  }

  async getInventario(id) {
    return await Inventario.findById(id);
  }

  async updateInventario(id, data) {
    return await Inventario.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteInventario(id) {
    return await Inventario.findByIdAndDelete(id);
  }
}

module.exports = new InventarioService();
