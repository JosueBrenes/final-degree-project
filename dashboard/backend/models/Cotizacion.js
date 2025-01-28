const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
}, { _id: false });

const CotizacionSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  fechaEmision: { type: Date, default: Date.now },
  items: [ItemSchema],
  total: { type: Number, required: true },
  estado: { type: String, required: true }
}, { collection: 'Cotizaciones' });

module.exports = mongoose.model('Cotizacion', CotizacionSchema);
