const mongoose = require('mongoose');

const ContabilidadSchema = new mongoose.Schema({
  tipoTransaccion: { type: String, required: true }, // Ejemplo: "Ingreso" o "Egreso"
  descripcion: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, required: true },
  categoria: { type: String, required: true }, // Ejemplo: "Ventas", "Gastos", etc.
  metodoPago: { type: String, required: true }, // Ejemplo: "Efectivo", "Tarjeta", etc.
  referencia: { type: String },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  estado: { type: String, required: true } // Ejemplo: "Pendiente", "Confirmado"
}, { collection: 'Contabilidad' });

module.exports = mongoose.model('Contabilidad', ContabilidadSchema);
