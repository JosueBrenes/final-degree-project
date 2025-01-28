const mongoose = require('mongoose');

const DeduccionSchema = new mongoose.Schema({
  concepto: { type: String, required: true },
  monto: { type: Number, required: true }
}, { _id: false });

const BonificacionSchema = new mongoose.Schema({
  concepto: { type: String, required: true },
  monto: { type: Number, required: true }
}, { _id: false });

const PeriodoSchema = new mongoose.Schema({
  inicio: { type: Date, required: true },
  fin: { type: Date, required: true }
}, { _id: false });

const PlanillaSchema = new mongoose.Schema({
  empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  periodo: { type: PeriodoSchema, required: true },
  salarioBase: { type: Number, required: true },
  horasExtras: { type: Number, default: 0 },
  deducciones: [DeduccionSchema],
  bonificaciones: [BonificacionSchema],
  totalPagar: { type: Number, required: true },
  estadoPago: { type: String, required: true }, // Ejemplo: "Pendiente", "Pagado"
  fechaPago: { type: Date }
}, { collection: 'Planillas' });

module.exports = mongoose.model('Planilla', PlanillaSchema);
