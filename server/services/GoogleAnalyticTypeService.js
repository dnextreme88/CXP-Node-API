const db = require('../models');

class GoogleAnalyticTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const googleAnalyticTypes = await db.GoogleAnalyticType.findAll({
            order: [['Id', 'ASC']],
        });

        return googleAnalyticTypes;
    }

    async getById(id) {
        const googleAnalyticType = await db.GoogleAnalyticType.findByPk(id);

        return googleAnalyticType;
    }

    async createGoogleAnalyticType(body) {
        const values = { Name: body.Name };
        const newGoogleAnalyticType = await db.GoogleAnalyticType.create(values);

        return newGoogleAnalyticType;
    }

    async updateGoogleAnalyticType(id, body) {
        const values = { Name: body.Name };
        const updateGoogleAnalyticType = await db.GoogleAnalyticType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateGoogleAnalyticType[1].dataValues;
    }

    async deleteGoogleAnalyticType(id) {
        await db.GoogleAnalyticType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = GoogleAnalyticTypeService;
