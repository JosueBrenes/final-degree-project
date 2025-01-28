const mongoose = require('mongoose');

const InteraccionesSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  comentarios: { type: Number, default: 0 },
  compartidos: { type: Number, default: 0 }
}, { _id: false });

const RedSocialSchema = new mongoose.Schema({
  plataforma: { type: String, required: true },
  contenido: { type: String, required: true },
  fechaPublicacion: { type: Date, required: true },
  interacciones: { type: InteraccionesSchema, default: {} }
}, { collection: 'RedesSociales' });

module.exports = mongoose.model('RedSocial', RedSocialSchema);
