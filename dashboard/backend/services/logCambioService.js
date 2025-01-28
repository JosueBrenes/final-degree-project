const LogCambio = require('../models/LogCambio');

class LogCambioService {
  async createLogCambio(data) {
    const logCambio = new LogCambio(data);
    await logCambio.save();
    return logCambio;
  }

  async getLogCambio(id) {
    return await LogCambio.findById(id).populate('usuarioId');
  }

  async updateLogCambio(id, data) {
    return await LogCambio.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteLogCambio(id) {
    return await LogCambio.findByIdAndDelete(id);
  }
}

module.exports = new LogCambioService();
