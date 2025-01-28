const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  categoria: { type: String, required: true },
  ubicacion: { type: String, required: true },
  fechaActualizacion: { type: Date, default: Date.now }
}, { collection: 'Inventario' });

module.exports = mongoose.model('Inventario', InventarioSchema);
