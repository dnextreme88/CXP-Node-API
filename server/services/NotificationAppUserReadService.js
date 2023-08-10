const uuid = require('uuid').v4;
const db = require('../models');

class NotificationAppUserReadService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const notificationAppUserRead = await db.NotificationAppUserRead.findAll({
            order: [['CreatedAt', 'ASC']],
        });

        return notificationAppUserRead;
    }

    async getById(id) {
        const notificationAppUserRead = await db.NotificationAppUserRead.findByPk(id);

        return notificationAppUserRead;
    }

    async createNotificationAppUserRead(body) {
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

    async updateNotificationAppUserRead(id, body) {
        const notificationAppUserRead = await db.NotificationAppUserRead.findByPk(id);
        let notificationAppId;

        if (body.NotificationAppId) {
            notificationAppId = body.NotificationAppId;
        }

        const values = {
            // Not defined as a Foreign Key
            UserId: body.UserId ? body.UserId : notificationAppUserRead.UserId,
            CreatedAt: notificationAppUserRead.CreatedAt,
            NotificationAppId: notificationAppId,
        };
        const updateNotificationAppUserRead = await db.NotificationAppUserRead.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateNotificationAppUserRead[1].dataValues;
    }

    async deleteNotificationAppUserRead(id) {
        await db.NotificationAppUserRead.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = NotificationAppUserReadService;
