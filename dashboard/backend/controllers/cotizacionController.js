const cotizacionService = require('../services/cotizacionService');

class CotizacionController {
  async createCotizacion(req, res) {
    try {
      const cotizacion = await cotizacionService.createCotizacion(req.body);
      res.status(201).json(cotizacion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCotizacion(req, res) {
    try {
      const cotizacion = await cotizacionService.getCotizacion(req.params.id);
      if (!cotizacion) {
        return res.status(404).json({ error: 'Cotizacion not found' });
      }
      res.json(cotizacion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCotizacion(req, res) {
    try {
      const cotizacion = await cotizacionService.updateCotizacion(req.params.id, req.body);
      if (!cotizacion) {
        return res.status(404).json({ error: 'Cotizacion not found' });
      }
      res.json(cotizacion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteCotizacion(req, res) {
    try {
      const cotizacion = await cotizacionService.deleteCotizacion(req.params.id);
      if (!cotizacion) {
        return res.status(404).json({ error: 'Cotizacion not found' });
      }
      res.json({ message: 'Cotizacion deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CotizacionController();
