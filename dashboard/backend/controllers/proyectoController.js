const proyectoService = require('../services/proyectoService');

class ProyectoController {
  async createProyecto(req, res) {
    try {
      const proyecto = await proyectoService.createProyecto(req.body);
      res.status(201).json(proyecto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProyecto(req, res) {
    try {
      const proyecto = await proyectoService.getProyecto(req.params.id);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto not found' });
      }
      res.json(proyecto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateProyecto(req, res) {
    try {
      const proyecto = await proyectoService.updateProyecto(req.params.id, req.body);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto not found' });
      }
      res.json(proyecto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteProyecto(req, res) {
    try {
      const proyecto = await proyectoService.deleteProyecto(req.params.id);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto not found' });
      }
      res.json({ message: 'Proyecto deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProyectoController();
