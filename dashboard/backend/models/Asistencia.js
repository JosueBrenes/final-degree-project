const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
  empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  fecha: { type: Date, required: true },
  horaEntrada: { type: String, required: true },
  horaSalida: { type: String, required: true },
  observaciones: { type: String }
}, { collection: 'Asistencias' });

module.exports = mongoose.model('Asistencia', AsistenciaSchema);
