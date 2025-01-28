const satisfaccionClienteService = require('../services/satisfaccionClienteService');

class SatisfaccionClienteController {
  async createSatisfaccion(req, res) {
    try {
      const satisfaccion = await satisfaccionClienteService.createSatisfaccion(req.body);
      res.status(201).json(satisfaccion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getSatisfaccion(req, res) {
    try {
      const satisfaccion = await satisfaccionClienteService.getSatisfaccion(req.params.id);
      if (!satisfaccion) {
        return res.status(404).json({ error: 'Satisfacción not found' });
      }
      res.json(satisfaccion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateSatisfaccion(req, res) {
    try {
      const satisfaccion = await satisfaccionClienteService.updateSatisfaccion(req.params.id, req.body);
      if (!satisfaccion) {
        return res.status(404).json({ error: 'Satisfacción not found' });
      }
      res.json(satisfaccion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteSatisfaccion(req, res) {
    try {
      const satisfaccion = await satisfaccionClienteService.deleteSatisfaccion(req.params.id);
      if (!satisfaccion) {
        return res.status(404).json({ error: 'Satisfacción not found' });
      }
      res.json({ message: 'Satisfacción deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new SatisfaccionClienteController();
