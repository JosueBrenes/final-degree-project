const Cliente = require('../models/Cliente');

class ClienteService {
  async createCliente(data) {
    const cliente = new Cliente(data);
    await cliente.save();
    return cliente;
  }

  async getCliente(id) {
    return await Cliente.findById(id);
  }

  async updateCliente(id, data) {
    return await Cliente.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCliente(id) {
    return await Cliente.findByIdAndDelete(id);
  }
}

module.exports = new ClienteService();
