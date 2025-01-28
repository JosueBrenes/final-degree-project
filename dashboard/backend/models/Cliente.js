const mongoose = require('mongoose');

const HistorialCompraSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  monto: { type: Number, required: true },
  detalle: { type: String, required: true }
}, { _id: false });

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  historialCompras: [HistorialCompraSchema],
  fechaRegistro: { type: Date, default: Date.now }
}, { collection: 'Clientes' });

module.exports = mongoose.model('Cliente', ClienteSchema);
