const inventarioService = require('../services/inventarioService');

class InventarioController {
  async createInventario(req, res) {
    try {
      const inventario = await inventarioService.createInventario(req.body);
      res.status(201).json(inventario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getInventario(req, res) {
    try {
      const inventario = await inventarioService.getInventario(req.params.id);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario not found' });
      }
      res.json(inventario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateInventario(req, res) {
    try {
      const inventario = await inventarioService.updateInventario(req.params.id, req.body);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario not found' });
      }
      res.json(inventario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteInventario(req, res) {
    try {
      const inventario = await inventarioService.deleteInventario(req.params.id);
      if (!inventario) {
        return res.status(404).json({ error: 'Inventario not found' });
      }
      res.json({ message: 'Inventario deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new InventarioController();
