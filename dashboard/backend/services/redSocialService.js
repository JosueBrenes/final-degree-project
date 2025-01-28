const RedSocial = require('../models/RedSocial');

class RedSocialService {
  async createRedSocial(data) {
    const redSocial = new RedSocial(data);
    await redSocial.save();
    return redSocial;
  }

  async getRedSocial(id) {
    return await RedSocial.findById(id);
  }

  async updateRedSocial(id, data) {
    return await RedSocial.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRedSocial(id) {
    return await RedSocial.findByIdAndDelete(id);
  }
}

module.exports = new RedSocialService();
