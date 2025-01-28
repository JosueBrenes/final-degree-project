const asistenciaService = require('../services/asistenciaService');

class AsistenciaController {
  async createAsistencia(req, res) {
    try {
      const asistencia = await asistenciaService.createAsistencia(req.body);
      res.status(201).json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAsistencia(req, res) {
    try {
      const asistencia = await asistenciaService.getAsistencia(req.params.id);
      if (!asistencia) {
        return res.status(404).json({ error: 'Asistencia not found' });
      }
      res.json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateAsistencia(req, res) {
    try {
      const asistencia = await asistenciaService.updateAsistencia(req.params.id, req.body);
      if (!asistencia) {
        return res.status(404).json({ error: 'Asistencia not found' });
      }
      res.json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteAsistencia(req, res) {
    try {
      const asistencia = await asistenciaService.deleteAsistencia(req.params.id);
      if (!asistencia) {
        return res.status(404).json({ error: 'Asistencia not found' });
      }
      res.json({ message: 'Asistencia deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new AsistenciaController();
