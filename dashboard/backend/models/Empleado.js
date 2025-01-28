const mongoose = require('mongoose');

const HorasExtraSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  horas: { type: Number, required: true },
  motivo: { type: String, required: true }
}, { _id: false });

const VacacionesSchema = new mongoose.Schema({
  inicio: { type: Date, required: true },
  fin: { type: Date, required: true },
  aprobado: { type: Boolean, default: false }
}, { _id: false });

const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  puesto: { type: String, required: true },
  departamento: { type: String, required: true },
  salario: { type: Number, required: true },
  fechaContratacion: { type: Date, default: Date.now },
  horasExtras: [HorasExtraSchema],
  vacaciones: [VacacionesSchema]
}, { collection: 'Empleados' });

module.exports = mongoose.model('Empleado', EmpleadoSchema);
