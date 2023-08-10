/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const UserResolverService = require('../lib/UserResolverService');
const CommentTemplateTemplateTypeService = require('./CommentTemplateTemplateTypeService');

const userResolver = new UserResolverService();
const commentTemplateTypeService = new CommentTemplateTemplateTypeService(this.log);
const hideAttributes = ['PasswordHash', 'PasswordSalt'];

class CommentTemplateService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAllByTenantId(tenantId) {
        const commentTemplates = await db.CommentTemplate.findAll({
            where: { TenantId: tenantId },
        });

        return commentTemplates;
    }

    // GetById
    async getById(id) {
        const commentTemplate = await db.CommentTemplate.findByPk(id);

        return commentTemplate;
    }

    // GetPagged
    async getPagged(body) {
        const commentTemplates = await db.CommentTemplate.findAll({
            offset: body.Skip,
            limit: body.Take,
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'ModifiedBy',
                },
                {
                    model: await db.CommentTemplateTemplateType,
                    where: {
                        CommentTemplateTypeId: { [Op.in]: body.Types },
                    },
                },
            ],
            order: [['CreatedAt', 'DESC']],
        });

        return commentTemplates;
    }

    async createCommentTemplate(body) {
        const values = {
            Id: uuid(),
            Name: body.Name,
            Title: body.Title,
            Description: body.Description,
            TenantId: await userResolver.getTenantId(),
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CreatedById: await userResolver.getUserId(),
            ModifiedById: await userResolver.getUserId(),
        };
        const newCommentTemplate = await db.CommentTemplate.create(values);

        // Create CommentTemplateTemplateType records
        for (const commentTemplateTypeId in body.Type) {
            const commentTemplateTemplateTypeValues = {
                CommentTemplateId: newCommentTemplate.Id,
                CommentTemplateTypeId: body.Type[commentTemplateTypeId],
            };

            await commentTemplateTypeService.createCommentTemplateTemplateType(commentTemplateTemplateTypeValues);
        }

        return newCommentTemplate;
    }

    async updateCommentTemplate(id, body) {
        const commentTemplate = await db.CommentTemplate.findByPk(id);

        const values = {
            Name: body.Name ? body.Name : commentTemplate.Name,
            Title: body.Title ? body.Title : commentTemplate.Title,
            Description: body.Description ? body.Description : commentTemplate.Description,
            CreatedAt: commentTemplate.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: commentTemplate.CreatedById,
            ModifiedById: await userResolver.getUserId(),
            TenantId: commentTemplate.tenantId,
        };
        const updateCommentTemplate = await db.CommentTemplate.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateCommentTemplate[1].dataValues;
    }

    async deleteCommentTemplate(id) {
        await db.CommentTemplate.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = CommentTemplateService;
