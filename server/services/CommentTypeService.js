const db = require('../models');

class CommentTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const commentTypes = await db.CommentType.findAll({
            order: [['Id', 'ASC']],
        });

        return commentTypes;
    }

    async getById(id) {
        const commentType = await db.CommentType.findByPk(id);

        return commentType;
    }

    async createCommentType(body) {
        const values = {
            Name: body.Name,
            Description: body.Description,
            GoalTypeId: body.GoalTypeId ? body.GoalTypeId : null,
        };
        const newCommentType = await db.CommentType.create(values);

        return newCommentType;
    }

    async updateCommentType(id, body) {
        const commentType = await db.CommentType.findByPk(id);
        let goalTypeId;

        if (body.GoalTypeId) {
            goalTypeId = body.GoalTypeId;
        }

        const values = {
            Name: body.Name ? body.Name : commentType.Name,
            Description: body.Description ? body.Description : commentType.Description,
            GoalTypeId: goalTypeId,
        };
        const updateCommentType = await db.CommentType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateCommentType[1].dataValues;
    }

    async deleteCommentType(id) {
        await db.CommentType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = CommentTypeService;
