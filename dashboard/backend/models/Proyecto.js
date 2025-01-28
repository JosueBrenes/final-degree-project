const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  fechaLimite: { type: Date, required: true },
  estado: { type: String, required: true }
}, { _id: false });

const ProyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  estado: { type: String, required: true },
  tareas: [TareaSchema]
}, { collection: 'Proyectos' });

module.exports = mongoose.model('Proyecto', ProyectoSchema);
