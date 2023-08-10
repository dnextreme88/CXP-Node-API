const db = require('../models');

class ActionAreaService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const actionAreas = await db.ActionArea.findAll({
            order: [['Id', 'ASC']],
        });

        return actionAreas;
    }

    async getById(id) {
        const actionArea = await db.ActionArea.findByPk(id);

        return actionArea;
    }

    async createActionArea(body) {
        const values = { Name: body.Name };
        const newActionArea = await db.ActionArea.create(values);

        return newActionArea;
    }

    async updateActionArea(id, body) {
        const values = { Name: body.Name };
        const updateActionArea = await db.ActionArea.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateActionArea[1].dataValues;
    }

    async deleteActionArea(id) {
        await db.ActionArea.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = ActionAreaService;
