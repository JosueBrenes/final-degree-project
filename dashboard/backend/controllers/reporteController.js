const reporteService = require('../services/reporteService');

class ReporteController {
  async createReporte(req, res) {
    try {
      const reporte = await reporteService.createReporte(req.body);
      res.status(201).json(reporte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getReporte(req, res) {
    try {
      const reporte = await reporteService.getReporte(req.params.id);
      if (!reporte) {
        return res.status(404).json({ error: 'Reporte not found' });
      }
      res.json(reporte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateReporte(req, res) {
    try {
      const reporte = await reporteService.updateReporte(req.params.id, req.body);
      if (!reporte) {
        return res.status(404).json({ error: 'Reporte not found' });
      }
      res.json(reporte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteReporte(req, res) {
    try {
      const reporte = await reporteService.deleteReporte(req.params.id);
      if (!reporte) {
        return res.status(404).json({ error: 'Reporte not found' });
      }
      res.json({ message: 'Reporte deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ReporteController();
