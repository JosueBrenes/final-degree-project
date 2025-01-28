const redSocialService = require('../services/redSocialService');

class RedSocialController {
  async createRedSocial(req, res) {
    try {
      const redSocial = await redSocialService.createRedSocial(req.body);
      res.status(201).json(redSocial);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRedSocial(req, res) {
    try {
      const redSocial = await redSocialService.getRedSocial(req.params.id);
      if (!redSocial) {
        return res.status(404).json({ error: 'RedSocial not found' });
      }
      res.json(redSocial);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateRedSocial(req, res) {
    try {
      const redSocial = await redSocialService.updateRedSocial(req.params.id, req.body);
      if (!redSocial) {
        return res.status(404).json({ error: 'RedSocial not found' });
      }
      res.json(redSocial);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteRedSocial(req, res) {
    try {
      const redSocial = await redSocialService.deleteRedSocial(req.params.id);
      if (!redSocial) {
        return res.status(404).json({ error: 'RedSocial not found' });
      }
      res.json({ message: 'RedSocial deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new RedSocialController();
