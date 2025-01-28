const mongoose = require('mongoose');

const AccionCorrectivaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  fechaResolucion: { type: Date },
  estado: { type: String, required: true } // Ejemplo: "Pendiente", "Completada"
}, { _id: false });

const SatisfaccionClienteSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  fechaEncuesta: { type: Date, required: true },
  calificacion: { type: Number, required: true }, // Ejemplo: Escala de 1 a 10
  comentarios: { type: String },
  recomendaria: { type: Boolean, required: true },
  accionesCorrectivas: [AccionCorrectivaSchema]
}, { collection: 'SatisfaccionClientes' });

module.exports = mongoose.model('SatisfaccionCliente', SatisfaccionClienteSchema);
