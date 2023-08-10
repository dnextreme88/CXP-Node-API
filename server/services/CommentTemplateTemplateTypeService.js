/* eslint-disable max-len */
const uuid = require('uuid').v4;
const db = require('../models');

class CommentTemplateTemplateTypeService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAllByTenantId(tenantId) {
        const commentTemplateTemplateTypes = await db.CommentTemplateTemplateType.findAll({
            // Complex where clauses at the top-level
            where: { '$CommentTemplate.TenantId$': tenantId },
            include: { model: await db.CommentTemplate },
        });

        return commentTemplateTemplateTypes;
    }

    // GetByTemplateId
    async getAllByCommentTemplateId(commentTemplateId) {
        const commentTemplateTemplateTypes = await db.CommentTemplateTemplateType.findAll({
            where: { CommentTemplateId: commentTemplateId },
        });

        return commentTemplateTemplateTypes;
    }

    // GetById
    async getById(id) {
        const commentTemplateTemplateType = await db.CommentTemplateTemplateType.findByPk(id);

        return commentTemplateTemplateType;
    }

    async createCommentTemplateTemplateType(body) {
        const values = {
            Id: uuid(),
            CommentTemplateId: body.CommentTemplateId,
            CommentTemplateTypeId: body.CommentTemplateTypeId,
        };
        const newCommentTemplateTemplateType = await db.CommentTemplateTemplateType.create(values);

        return newCommentTemplateTemplateType;
    }

    async updateCommentTemplateTemplateType(id, body) {
        const commentTemplateTemplateType = await db.CommentTemplateTemplateType.findByPk(id);

        const values = {
            CommentTemplateId: body.CommentTemplateId ? body.CommentTemplateId
                : commentTemplateTemplateType.CommentTemplateId,
            CommentTemplateTypeId: body.CommentTemplateTypeId ? body.CommentTemplateTypeId
                : commentTemplateTemplateType.CommentTemplateTypeId,
        };
        const updateCommentTemplateTemplateType = await db.CommentTemplateTemplateType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateCommentTemplateTemplateType[1].dataValues;
    }

    async deleteCommentTemplateTemplateType(id) {
        await db.CommentTemplateTemplateType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = CommentTemplateTemplateTypeService;
