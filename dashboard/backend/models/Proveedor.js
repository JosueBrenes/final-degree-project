const mongoose = require('mongoose');

const ProductoSuministradoSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true }
}, { _id: false });

const ProveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  productosSuministrados: [ProductoSuministradoSchema],
  fechaRegistro: { type: Date, default: Date.now }
}, { collection: 'Proveedores' });

module.exports = mongoose.model('Proveedor', ProveedorSchema);
