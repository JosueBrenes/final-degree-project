const proveedorService = require('../services/proveedorService');

class ProveedorController {
  async createProveedor(req, res) {
    try {
      const proveedor = await proveedorService.createProveedor(req.body);
      res.status(201).json(proveedor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProveedor(req, res) {
    try {
      const proveedor = await proveedorService.getProveedor(req.params.id);
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor not found' });
      }
      res.json(proveedor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateProveedor(req, res) {
    try {
      const proveedor = await proveedorService.updateProveedor(req.params.id, req.body);
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor not found' });
      }
      res.json(proveedor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteProveedor(req, res) {
    try {
      const proveedor = await proveedorService.deleteProveedor(req.params.id);
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor not found' });
      }
      res.json({ message: 'Proveedor deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProveedorController();
