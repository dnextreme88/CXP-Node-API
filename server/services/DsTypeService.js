const db = require('../models');

class DsTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const dsTypes = await db.DsType.findAll({
            order: [['Id', 'ASC']],
        });

        return dsTypes;
    }

    async getById(id) {
        const dsType = await db.DsType.findByPk(id);

        return dsType;
    }

    async createDsType(body) {
        const values = { Name: body.Name };
        const newDsType = await db.DsType.create(values);

        return newDsType;
    }

    async updateDsType(id, body) {
        const values = { Name: body.Name };
        const updateDsType = await db.DsType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateDsType[1].dataValues;
    }

    async deleteDsType(id) {
        await db.DsType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = DsTypeService;
