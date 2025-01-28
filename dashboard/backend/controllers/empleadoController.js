const empleadoService = require('../services/empleadoService');

class EmpleadoController {
  async createEmpleado(req, res) {
    try {
      const empleado = await empleadoService.createEmpleado(req.body);
      res.status(201).json(empleado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getEmpleado(req, res) {
    try {
      const empleado = await empleadoService.getEmpleado(req.params.id);
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado not found' });
      }
      res.json(empleado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateEmpleado(req, res) {
    try {
      const empleado = await empleadoService.updateEmpleado(req.params.id, req.body);
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado not found' });
      }
      res.json(empleado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteEmpleado(req, res) {
    try {
      const empleado = await empleadoService.deleteEmpleado(req.params.id);
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado not found' });
      }
      res.json({ message: 'Empleado deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new EmpleadoController();
