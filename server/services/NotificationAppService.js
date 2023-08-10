const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const Helpers = require('../lib/Helpers');
const UserResolverService = require('../lib/UserResolverService');

const helpers = new Helpers();
const userResolver = new UserResolverService();
const hideAttributes = ['PasswordHash', 'PasswordSalt'];

class NotificationAppService {
    constructor(log) {
        this.log = log;
    }

    // GetPaged
    async getAllByTenantId(tenantId) {
        const notificationApps = await db.NotificationApp.findAll({
            where: { TenantId: tenantId },
        });

        return notificationApps;
    }

    // GetAllForWeek
    async getAllForWeek(customerId) {
        const date7DaysAgo = helpers.dateLessFromToday(7);

        const notificationApps = await db.NotificationApp.findAll({
            // Complex where clauses at the top-level
            where: {
                CreatedAt: { [Op.gte]: date7DaysAgo },
                '$Task.Project.CustomerId$': customerId,
            },
            include: [
                { model: await db.Comment },
                { model: await db.Goal },
                {
                    model: await db.Task,
                    include: { model: await db.Project },
                },
            ],
            order: [['CreatedAt', 'DESC']],
        });

        return notificationApps;
    }

    // GetPagged
    // NOTE: userId was removed, since it's not being used anyway
    async getPagged(projectId, body) {
        const notificationApps = await db.NotificationApp.findAll({
            offset: body.Skip,
            limit: body.Take,
            // Complex where clauses at the top-level
            where: {
                [Op.or]: {
                    '$Comment.ProjectId$': projectId,
                    '$Task.ProjectId$': projectId,
                    '$Goal.ProjectId$': projectId,
                },
            },
            include: [
                { model: await db.Comment },
                { model: await db.Task },
                { model: await db.Goal },
                { model: await db.NotificationAppType },
                { model: await db.NotificationAppUserRead },
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'CreatedBy',
                    include: { model: await db.UserPic },
                },
            ],
            order: [['CreatedAt', 'DESC']],
        });

        return notificationApps;
    }

    // GetById
    async getById(id) {
        const notificationApp = await db.NotificationApp.findOne({
            where: { Id: id },
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'CreatedBy',
                },
                { model: await db.Comment },
                { model: await db.Task },
            ],
        });

        return notificationApp;
    }

    // SetNotificationRead
    // Creates a NotificationAppUserRead record
    // TODO: remove create function in services/NotificationAppUserReadService
    async setNotificationRead(body) {
        const values = {
            Id: uuid(),
            UserId: body.UserId,
            CreatedAt: new Date(),
            NotificationAppId: body.NotificationAppId,
        };
        const newNotificationAppUserRead = await db.NotificationAppUserRead.create(values);
        await newNotificationAppUserRead.setDataValue('CreatedById', body.UserId);
        await newNotificationAppUserRead.save();

        return newNotificationAppUserRead;
    }

    async createNotificationApp(body) {
        const values = {
            Id: uuid(),
            Title: body.Title,
            Description: body.Description,
            Action: body.Action,
            CreatedAt: new Date(),
            NotificationAppTypeId: body.NotificationAppTypeId,
            TenantId: await userResolver.getTenantId(),
            TaskId: body.TaskId ? body.TaskId : null,
            CommentId: body.CommentId ? body.CommentId : null,
            GoalId: body.GoalId ? body.GoalId : null,
        };
        const newNotificationApp = await db.NotificationApp.create(values);
        await newNotificationApp.setDataValue('CreatedById', body.UserId);
        await newNotificationApp.save();

        return newNotificationApp;
    }

    async updateNotificationApp(id, body) {
        const notificationApp = await db.NotificationApp.findByPk(id);
        let notificationAppTypeId;
        let taskId;
        let commentId;
        let goalId;

        if (body.NotificationAppTypeId) {
            notificationAppTypeId = body.NotificationAppTypeId;
        }
        if (body.TaskId) {
            taskId = body.NotificationAppTypeId;
        }
        if (body.CommentId) {
            commentId = body.CommentId;
        }
        if (body.GoalId) {
            goalId = body.GoalId;
        }

        const values = {
            Title: body.Title ? body.Title : notificationApp.Title,
            Description: body.Description ? body.Description : notificationApp.Description,
            Action: body.Action ? body.Action : notificationApp.Action,
            CreatedAt: notificationApp.CreatedAt,
            CreatedById: notificationApp.CreatedById,
            NotificationAppTypeId: notificationAppTypeId,
            TenantId: await userResolver.getTenantId(),
            TaskId: taskId,
            CommentId: commentId,
            GoalId: goalId,
        };
        const updateNotificationApp = await db.NotificationApp.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateNotificationApp[1].dataValues;
    }

    async deleteNotificationApp(id) {
        await db.NotificationApp.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // async create(title, description) {
    //     const notification = {
    //         title,
    //         description,
    //         status: 'unread',
    //     };
    //     // const newNotification = await db.Notification.create(notification);
    //     // if (newNotification) return newNotification;
    //     return notification;
    //     // throw new Error('Failed to add notification.');
    // }
}

module.exports = NotificationAppService;
