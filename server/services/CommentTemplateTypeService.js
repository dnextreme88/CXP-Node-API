const db = require('../models');

class CommentTemplateTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const commentTemplateTypes = await db.CommentTemplateType.findAll({
            order: [['Id', 'ASC']],
        });

        return commentTemplateTypes;
    }

    async getById(id) {
        const commentTemplateType = await db.CommentTemplateType.findByPk(id);

        return commentTemplateType;
    }

    async createCommentTemplateType(body) {
        const values = { Name: body.Name };
        const newCommentTemplateType = await db.CommentTemplateType.create(values);

        return newCommentTemplateType;
    }

    async updateCommentTemplateType(id, body) {
        const values = { Name: body.Name };
        const updateCommentTemplateType = await db.CommentTemplateType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateCommentTemplateType[1].dataValues;
    }

    async deleteCommentTemplateType(id) {
        await db.CommentTemplateType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = CommentTemplateTypeService;
