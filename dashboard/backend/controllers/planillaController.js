const planillaService = require('../services/planillaService');

class PlanillaController {
  async createPlanilla(req, res) {
    try {
      const planilla = await planillaService.createPlanilla(req.body);
      res.status(201).json(planilla);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPlanilla(req, res) {
    try {
      const planilla = await planillaService.getPlanilla(req.params.id);
      if (!planilla) {
        return res.status(404).json({ error: 'Planilla not found' });
      }
      res.json(planilla);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updatePlanilla(req, res) {
    try {
      const planilla = await planillaService.updatePlanilla(req.params.id, req.body);
      if (!planilla) {
        return res.status(404).json({ error: 'Planilla not found' });
      }
      res.json(planilla);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletePlanilla(req, res) {
    try {
      const planilla = await planillaService.deletePlanilla(req.params.id);
      if (!planilla) {
        return res.status(404).json({ error: 'Planilla not found' });
      }
      res.json({ message: 'Planilla deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new PlanillaController();
