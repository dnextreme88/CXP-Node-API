const db = require('../models');

class TemplateTypeService {
    constructor(log) {
        this.log = log;
    }

    async getById(id) {
        const templateType = await db.TemplateType.findByPk(id);

        return templateType;
    }

    async createTemplateType(body) {
        const values = { Name: body.Name };
        const newTemplateType = await db.TemplateType.create(values);

        return newTemplateType;
    }

    async updateTemplateType(id, body) {
        const values = { Name: body.Name };
        const updateTemplateType = await db.TemplateType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTemplateType[1].dataValues;
    }

    async deleteTemplateType(id) {
        await db.TemplateType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = TemplateTypeService;
