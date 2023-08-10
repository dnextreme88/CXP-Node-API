const db = require('../models');

class ModuleTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const moduleTypes = await db.ModuleType.findAll({
            order: [['Id', 'ASC']],
        });

        return moduleTypes;
    }

    async getById(id) {
        const moduleType = await db.ModuleType.findByPk(id);

        return moduleType;
    }

    async createModuleType(body) {
        const values = { Name: body.Name };
        const newModuleType = await db.ModuleType.create(values);

        return newModuleType;
    }

    async updateModuleType(id, body) {
        const values = { Name: body.Name };
        const updateModuleType = await db.ModuleType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateModuleType[1].dataValues;
    }

    async deleteModuleType(id) {
        await db.ModuleType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = ModuleTypeService;
