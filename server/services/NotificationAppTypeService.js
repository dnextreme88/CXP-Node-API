const db = require('../models');

class NotificationAppTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const notificationAppTypes = await db.NotificationAppType.findAll({
            order: [['Id', 'ASC']],
        });

        return notificationAppTypes;
    }

    async getById(id) {
        const notificationAppType = await db.NotificationAppType.findByPk(id);

        return notificationAppType;
    }
}

module.exports = NotificationAppTypeService;
