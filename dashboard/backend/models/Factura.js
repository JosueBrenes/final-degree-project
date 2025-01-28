const mongoose = require('mongoose');

const DetalleSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
}, { _id: false });

const FacturaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  fechaEmision: { type: Date, default: Date.now },
  detalle: [DetalleSchema],
  total: { type: Number, required: true },
  estadoPago: { type: String, required: true }
}, { collection: 'Facturas' });

module.exports = mongoose.model('Factura', FacturaSchema);
