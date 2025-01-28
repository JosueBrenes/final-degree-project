const mongoose = require('mongoose');

const LogCambioSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  accion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  detalle: { type: String, required: true }
}, { collection: 'LogsCambios' });

module.exports = mongoose.model('LogCambio', LogCambioSchema);
