const Proveedor = require('../models/Proveedor');

class ProveedorService {
  async createProveedor(data) {
    const proveedor = new Proveedor(data);
    await proveedor.save();
    return proveedor;
  }

  async getProveedor(id) {
    return await Proveedor.findById(id);
  }

  async updateProveedor(id, data) {
    return await Proveedor.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProveedor(id) {
    return await Proveedor.findByIdAndDelete(id);
  }
}

module.exports = new ProveedorService();
