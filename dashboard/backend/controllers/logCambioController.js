const logCambioService = require('../services/logCambioService');

class LogCambioController {
  async createLogCambio(req, res) {
    try {
      const logCambio = await logCambioService.createLogCambio(req.body);
      res.status(201).json(logCambio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getLogCambio(req, res) {
    try {
      const logCambio = await logCambioService.getLogCambio(req.params.id);
      if (!logCambio) {
        return res.status(404).json({ error: 'LogCambio not found' });
      }
      res.json(logCambio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateLogCambio(req, res) {
    try {
      const logCambio = await logCambioService.updateLogCambio(req.params.id, req.body);
      if (!logCambio) {
        return res.status(404).json({ error: 'LogCambio not found' });
      }
      res.json(logCambio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteLogCambio(req, res) {
    try {
      const logCambio = await logCambioService.deleteLogCambio(req.params.id);
      if (!logCambio) {
        return res.status(404).json({ error: 'LogCambio not found' });
      }
      res.json({ message: 'LogCambio deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new LogCambioController();
