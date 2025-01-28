const usuarioService = require('../services/usuarioService');

class UsuarioController {
  async createUsuario(req, res) {
    try {
      const usuario = await usuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUsuario(req, res) {
    try {
      const usuario = await usuarioService.getUsuario(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario not found' });
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUsuario(req, res) {
    try {
      const usuario = await usuarioService.updateUsuario(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario not found' });
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUsuario(req, res) {
    try {
      const usuario = await usuarioService.deleteUsuario(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario not found' });
      }
      res.json({ message: 'Usuario deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UsuarioController();
