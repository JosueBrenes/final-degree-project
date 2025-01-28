const contabilidadService = require('../services/contabilidadService');

class ContabilidadController {
  async createTransaccion(req, res) {
    try {
      const transaccion = await contabilidadService.createTransaccion(req.body);
      res.status(201).json(transaccion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getTransaccion(req, res) {
    try {
      const transaccion = await contabilidadService.getTransaccion(req.params.id);
      if (!transaccion) {
        return res.status(404).json({ error: 'Transacción not found' });
      }
      res.json(transaccion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateTransaccion(req, res) {
    try {
      const transaccion = await contabilidadService.updateTransaccion(req.params.id, req.body);
      if (!transaccion) {
        return res.status(404).json({ error: 'Transacción not found' });
      }
      res.json(transaccion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteTransaccion(req, res) {
    try {
      const transaccion = await contabilidadService.deleteTransaccion(req.params.id);
      if (!transaccion) {
        return res.status(404).json({ error: 'Transacción not found' });
      }
      res.json({ message: 'Transacción deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ContabilidadController();
