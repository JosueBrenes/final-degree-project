const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  rol: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: Boolean, default: true },
  fechaRegistro: { type: Date, default: Date.now }
}, { collection: 'Usuarios' });

module.exports = mongoose.model('Usuario', UsuarioSchema);
