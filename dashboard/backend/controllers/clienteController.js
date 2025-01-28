const clienteService = require('../services/clienteService');

class ClienteController {
  async createCliente(req, res) {
    try {
      const cliente = await clienteService.createCliente(req.body);
      res.status(201).json(cliente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCliente(req, res) {
    try {
      const cliente = await clienteService.getCliente(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente not found' });
      }
      res.json(cliente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCliente(req, res) {
    try {
      const cliente = await clienteService.updateCliente(req.params.id, req.body);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente not found' });
      }
      res.json(cliente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteCliente(req, res) {
    try {
      const cliente = await clienteService.deleteCliente(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente not found' });
      }
      res.json({ message: 'Cliente deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ClienteController();
