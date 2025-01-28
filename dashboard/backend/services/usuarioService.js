const Usuario = require('../models/Usuario');

class UsuarioService {
  async createUsuario(data) {
    const usuario = new Usuario(data);
    await usuario.save();
    return usuario;
  }

  async getUsuario(id) {
    return await Usuario.findById(id);
  }

  async updateUsuario(id, data) {
    return await Usuario.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUsuario(id) {
    return await Usuario.findByIdAndDelete(id);
  }
}

module.exports = new UsuarioService();
