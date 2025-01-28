const facturaService = require('../services/facturaService');

class FacturaController {
  async createFactura(req, res) {
    try {
      const factura = await facturaService.createFactura(req.body);
      res.status(201).json(factura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getFactura(req, res) {
    try {
      const factura = await facturaService.getFactura(req.params.id);
      if (!factura) {
        return res.status(404).json({ error: 'Factura not found' });
      }
      res.json(factura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateFactura(req, res) {
    try {
      const factura = await facturaService.updateFactura(req.params.id, req.body);
      if (!factura) {
        return res.status(404).json({ error: 'Factura not found' });
      }
      res.json(factura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteFactura(req, res) {
    try {
      const factura = await facturaService.deleteFactura(req.params.id);
      if (!factura) {
        return res.status(404).json({ error: 'Factura not found' });
      }
      res.json({ message: 'Factura deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new FacturaController();
