const reclutamientoService = require('../services/reclutamientoService');

class ReclutamientoController {
  async createReclutamiento(req, res) {
    try {
      const reclutamiento = await reclutamientoService.createReclutamiento(req.body);
      res.status(201).json(reclutamiento);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getReclutamiento(req, res) {
    try {
      const reclutamiento = await reclutamientoService.getReclutamiento(req.params.id);
      if (!reclutamiento) {
        return res.status(404).json({ error: 'Reclutamiento not found' });
      }
      res.json(reclutamiento);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateReclutamiento(req, res) {
    try {
      const reclutamiento = await reclutamientoService.updateReclutamiento(req.params.id, req.body);
      if (!reclutamiento) {
        return res.status(404).json({ error: 'Reclutamiento not found' });
      }
      res.json(reclutamiento);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteReclutamiento(req, res) {
    try {
      const reclutamiento = await reclutamientoService.deleteReclutamiento(req.params.id);
      if (!reclutamiento) {
        return res.status(404).json({ error: 'Reclutamiento not found' });
      }
      res.json({ message: 'Reclutamiento deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ReclutamientoController();
