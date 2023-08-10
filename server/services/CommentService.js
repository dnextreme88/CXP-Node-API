/* eslint-disable prefer-template */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const Helpers = require('../lib/Helpers');
const ConstantsService = require('../lib/ConstantsService');
const PaginationService = require('../lib/PaginationService');

const helpers = new Helpers();
const constants = new ConstantsService();
const pagination = new PaginationService();
const hideAttributes = ['PasswordHash', 'PasswordSalt'];

const joinCommentType = 'LEFT OUTER JOIN "CommentType" AS "CommentType" ON "Comment"."CommentTypeId" = "CommentType"."Id"';
const joinUser = 'LEFT OUTER JOIN "User" AS "User" ON "Comment"."ModifiedById" = "User"."Id"';
const joinGoal = 'LEFT OUTER JOIN "Goal" AS "Goal" ON "Comment"."GoalId" = "Goal"."Id"';

class CommentService {
    constructor(log) {
        this.log = log;
    }

    // GetLatestCommentByGoalIdIncludeHome
    async getAllLatestCommentsByGoalIdWithHome(goalsArray, projectId, paginationParams) {
        const commentAttr = await db.Comment.rawAttributes;
        const commentFields = [];
        const joinedArray = [];
        let query;

        for (const fieldKey in commentAttr) {
            const fieldName = '"Comment"."' + commentAttr[fieldKey].field + '"';
            commentFields.push(fieldName);
        }

        for (let i = 0; i < goalsArray.length; i++) {
            const appendApostrophes = '\'' + goalsArray[i] + '\'';
            joinedArray.push(appendApostrophes);
        }

        // CommentTypeId: 1 // EQUAL TO Home
        if (joinedArray.length > 0) {
            query = 'SELECT ' + commentFields + ' FROM "Comment" AS "Comment" '
            + joinCommentType + ' ' + joinUser + ' ' + joinGoal
            + ' WHERE ("Comment"."ProjectId" = \'' + projectId
            + '\' AND ("Comment"."CommentTypeId" = 1 OR "Comment"."GoalId" IN (' + joinedArray + '))'
            + ' AND "Comment"."Active" = ' + paginationParams.Active + ')';
        } else {
            query = 'SELECT ' + commentFields + ' FROM "Comment" AS "Comment" '
            + joinCommentType + ' ' + joinUser + ' ' + joinGoal
            + ' WHERE ("Comment"."ProjectId" = \'' + projectId
            + '\' AND ("Comment"."CommentTypeId" = 1)'
            + ' AND "Comment"."Active" = ' + paginationParams.Active + ')';
        }

        if (paginationParams.Search) {
            const searchString = paginationParams.Search.toLowerCase();

            query += ' AND ("Comment"."Title" LIKE \'%' + searchString
            + '%\' OR "CommentType"."Name" LIKE \'%' + searchString
            + '%\' OR "User"."FirstLastName" LIKE \'%' + searchString + '%\')';
        }

        // Add ORDER BY, LIMIT and OFFSET params to query
        query += await pagination.orderByParams('comment', paginationParams.OrderBy, paginationParams.Direction);
        query += await pagination.pageByPagingParams(paginationParams.Take, paginationParams.Skip);

        const runQuery = await db.sequelize.query(
            query, { type: db.sequelize.QueryTypes.SELECT },
        );

        return runQuery;
    }

    // GetCurrentForProject
    async getAllCommentTypesByProjectId(projectId) {
        const commentTypes = await db.CommentType.findAll({
            include: [
                {
                    model: await db.Comment,
                    where: {
                        ProjectId: projectId,
                        Active: true,
                    },
                    include: [
                        {
                            model: await db.User,
                            attributes: { exclude: hideAttributes },
                            as: 'ModifiedBy',
                        },
                        { model: await db.CommentType },
                    ],
                },
            ],
        });

        return commentTypes;
    }

    // GetAllForProject
    async getAllForProject(projectId, paginationParams) {
        const commentAttr = await db.Comment.rawAttributes;
        const commentFields = [];
        let query;

        for (const fieldKey in commentAttr) {
            const fieldName = '"Comment"."' + commentAttr[fieldKey].field + '"';
            commentFields.push(fieldName);
        }

        query = 'SELECT ' + commentFields + ' FROM "Comment" AS "Comment" '
        + joinCommentType + ' ' + joinUser + ' '
        + ' WHERE ("Comment"."ProjectId" = \'' + projectId + '\''
        + ' AND "Comment"."Active" = ' + paginationParams.Active + ')';

        if (paginationParams.Search) {
            const searchString = paginationParams.Search.toLowerCase();

            query += ' AND ("Comment"."Title" LIKE \'%' + searchString
            + '%\' OR "CommentType"."Name" LIKE \'%' + searchString
            + '%\' OR "User"."FirstLastName" LIKE \'%' + searchString + '%\')';
        }

        // Add ORDER BY, LIMIT and OFFSET params to query
        query += await pagination.orderByParams('comment', paginationParams.OrderBy, paginationParams.Direction);
        query += await pagination.pageByPagingParams(paginationParams.Take, paginationParams.Skip);

        const runQuery = await db.sequelize.query(
            query, { type: db.sequelize.QueryTypes.SELECT },
        );

        return runQuery;
    }

    // GetCommentsNeededCountForProject
    async getAllCommentsNeededCountForProject(projectId) {
        const date12DaysAgo = helpers.dateLessFromToday(12); // CommentValidDays = 12

        const comments = await db.Comment.findAndCountAll({
            where: {
                ModifiedAt: { [Op.lte]: date12DaysAgo },
                '$Goal.ValidTo$': { [Op.gt]: new Date() },
                '$Goal.ProjectId$': projectId,
            },
            include: { model: await db.Goal },
        });

        return comments.count;
    }

    // GetLatestCommentsForGoals
    async getAllLatestCommentsForGoals(goalsArray) {
        // Returns date
        const maxComment = await db.Comment.max('ModifiedAt', {
            attributes: ['GoalId', 'CommentTypeId'],
            where: { GoalId: { [Op.in]: goalsArray } },
            group: ['GoalId', 'CommentTypeId'],
        });

        // If goal id cannot be found or there are no latest comments for goals
        if (maxComment === 0) return [];

        const comments = await db.Comment.findAll({
            limit: 1,
            where: {
                GoalId: { [Op.in]: goalsArray },
                ModifiedAt: maxComment,
            },
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'ModifiedBy',
                    include: { model: await db.UserPic },
                },
                { model: await db.CommentType },
            ],
        });

        return comments;
    }

    // GetAllCommentsForGoal
    async getAllByGoalId(goalId) {
        const comments = await db.Comment.findAll({
            where: { GoalId: goalId },
        });

        return comments;
    }

    // GetById
    async getById(id) {
        const comment = await db.Comment.findOne({
            where: { Id: id },
            include: [
                { model: await db.CommentType },
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'ModifiedBy',
                    include: { model: await db.UserPic },
                },
            ],
        });

        return comment;
    }

    // GetActiveByTypeForProject
    async getActiveByCommentTypeIdAndProjectId(commentTypeId, projectId) {
        const comment = await db.Comment.findOne({
            where: {
                Active: true,
                CommentTypeId: commentTypeId,
                ProjectId: projectId,
            },
            include: [
                {
                    model: await db.CommentType,
                },
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'ModifiedBy',
                    include: { model: await db.UserPic },
                },
            ],
        });

        return comment;
    }

    async createComment(body) {
        const values = {
            Id: uuid(),
            Title: body.Title,
            Description: body.Description,
            Active: true,
            IsDeleted: body.IsDeleted,
            CommentTypeId: body.CommentTypeId,
            ProjectId: body.ProjectId,
            GoalId: body.GoalId ? body.GoalId : null,
        };
        const newComment = await db.Comment.create(values);

        return newComment;
    }

    async updateComment(id, body) {
        const comment = await db.Comment.findByPk(id);
        let active;
        let isDeleted;
        let commentTypeId;
        let projectId;
        let goalId;
        let userId;

        if (body.Active || body.Active === false) {
            active = body.Active;
        }
        if (body.IsDeleted || body.IsDeleted === false) {
            isDeleted = body.IsDeleted;
        }
        if (body.CommentTypeId) {
            commentTypeId = body.CommentTypeId;
        }
        if (body.ProjectId) {
            projectId = body.ProjectId;
        }
        if (body.GoalId) {
            goalId = body.GoalId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Title: body.Title ? body.Title : comment.Title,
            Description: body.Description ? body.Description : comment.Description,
            Active: active,
            IsDeleted: isDeleted,
            CreatedAt: comment.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: comment.CreatedById,
            ModifiedById: userId,
            CommentTypeId: commentTypeId,
            ProjectId: projectId,
            GoalId: goalId,
        };
        const updateComment = await db.Comment.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateComment[1].dataValues;
    }

    // Deactivate
    // With force: true, records are properly deleted since we have set paranoid: true on our model
    async deactivate(id) {
        await db.Comment.destroy(
            {
                where: { Id: id },
                force: true,
            },
        );

        return 'Success';
    }

    // Delete
    async delete(id) {
        const comment = await db.Comment.findByPk(id);
        comment.IsDeleted = true;

        await this.deactivate(id);

        return comment;
    }

    // IMPLEMENTED FROM BlComment.cs
    // GetLandingUrlByCommentTypeId
    async getLandingUrlByCommentTypeId(commentTypeId) {
        const projectIdParam = 'projectId=' + constants.getProjectIdPlaceholder();
        const analytics = 'goals-and-analytics';

        // NOTE: Cases based on CommentTypeSeeder.js
        switch (commentTypeId) {
            // Constants.WebUrls.OrganicSearchTraffic
            case 2:
            case 3:
                return `${analytics}?active=organic-search-traffic&${projectIdParam}`;
            // Constants.WebUrls.TotalKeywordsRanked
            case 4:
            case 5:
                return `${analytics}?active=total-keywords-ranked&${projectIdParam}`;
            // Constants.WebUrls.TargetKeywordPositioning
            case 6:
            case 7:
                return `${analytics}?active=target-keyword-positioning&${projectIdParam}`;
            // Constants.WebUrls.GoalConversions
            case 8:
            case 9:
                return `${analytics}?active=goal-conversions&${projectIdParam}`;
            // Constants.WebUrls.ECommerce
            case 10:
            case 11:
                return `${analytics}?active=ecommerce-revenue-tracking&${projectIdParam}`;
            // Constants.WebUrls.Home
            default: return `home?${projectIdParam}`;
        }
    }

    // async getByType(projectId, commentType) {
    //     // eslint-disable-next-line no-unused-vars
    //     const comment = await db.Comment.findAll({
    //         where: {
    //             ProjectId: projectId,
    //             CommentTypeId: commentType,
    //         },
    //     });
    //     // if (comment) return JSON.parse(JSON.stringify(comment));
    //     // throw new Error('Failed to save webmaster for unknown reasons');
    //     return {
    //         projectId,
    //         commentType,
    //         content: 'Comment service method not implemented',
    //     };
    // }
}

module.exports = CommentService;
