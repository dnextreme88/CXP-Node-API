const db = require('../models');

class TemplateService {
    constructor(log) {
        this.log = log;
    }

    // GetById
    async getById(id) {
        const template = await db.Template.findByPk(id);

        return template;
    }

    // GetByTypeId
    async getByTemplateTypeId(templateTypeId) {
        const template = await db.Template.findOne({
            where: { TemplateTypeId: templateTypeId },
        });

        return template;
    }

    async createTemplate(body) {
        const values = {
            Name: body.Name,
            Template: body.Template,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            TenantId: body.TenantId,
            TemplateTypeId: body.TemplateTypeId,
        };
        const newTemplate = await db.Template.create(values);
        await newTemplate.setDataValue('CreatedById', body.UserId);
        await newTemplate.setDataValue('ModifiedById', body.UserId);
        await newTemplate.save();

        return newTemplate;
    }

    async updateTemplate(id, body) {
        const template = await db.Template.findByPk(id);
        let tenantId;
        let templateTypeId;
        let userId;

        if (body.TenantId) {
            tenantId = body.TenantId;
        }
        if (body.TemplateTypeId) {
            templateTypeId = body.TemplateTypeId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Name: body.Name ? body.Name : template.Name,
            Template: body.Template ? body.Template : template.Template,
            CreatedAt: template.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: template.CreatedById,
            ModifiedById: userId,
            TenantId: tenantId,
            TemplateTypeId: templateTypeId,
        };
        const updateTemplate = await db.Template.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTemplate[1].dataValues;
    }

    async deleteTemplate(id) {
        await db.Template.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = TemplateService;
