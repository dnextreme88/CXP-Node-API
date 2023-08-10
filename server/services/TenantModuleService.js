const uuid = require('uuid').v4;
const db = require('../models');

class TenantModuleService {
    constructor(log) {
        this.log = log;
    }

    // GetTenantModuleByTenantId
    async getAllByTenantId(tenantId) {
        const tenantModules = await db.TenantModule.findAll({
            where: { TenantId: tenantId },
            include: { model: await db.ModuleType },
        });

        return tenantModules;
    }

    // GetTenantModuleById
    async getById(id) {
        const tenantModule = await db.TenantModule.findByPk(id);

        return tenantModule;
    }

    async createTenantModule(body) {
        const values = {
            Id: uuid(),
            TenantId: body.TenantId,
            ModuleTypeId: body.ModuleTypeId,
        };
        const newTenantModule = await db.TenantModule.create(values);

        return newTenantModule;
    }

    async bulkCreateTenantModule(valuesArray) {
        const newTenantModules = await db.TenantModule.bulkCreate(valuesArray, {
            validate: true,
            returning: true,
        });

        return newTenantModules;
    }

    async deleteTenantModule(id) {
        await db.TenantModule.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    async bulkDeleteTenantModule(idArray) {
        await db.TenantModule.destroy({
            where: { Id: idArray },
        });

        return 'Successfully deleted multiple objects';
    }
}

module.exports = TenantModuleService;
