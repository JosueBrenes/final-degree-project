const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
  tipoReporte: { type: String, required: true },
  contenido: { type: String, required: true },
  fechaGeneracion: { type: Date, default: Date.now },
  generadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { collection: 'Reportes' });

module.exports = mongoose.model('Reporte', ReporteSchema);
