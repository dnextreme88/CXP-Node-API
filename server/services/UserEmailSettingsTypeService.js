const db = require('../models');

class UserEmailSettingsTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const userEmailSettingsTypes = await db.UserEmailSettingsType.findAll({
            order: [['Id', 'ASC']],
        });

        return userEmailSettingsTypes;
    }

    async getById(id) {
        const userEmailSettingsType = await db.UserEmailSettingsType.findByPk(id);

        return userEmailSettingsType;
    }

    async createUserEmailSettingsType(body) {
        const values = { Name: body.Name };
        const newUserEmailSettingsType = await db.UserEmailSettingsType.create(values);

        return newUserEmailSettingsType;
    }

    async updateUserEmailSettingsType(id, body) {
        const values = { Name: body.Name };
        const updateUserEmailSettingsType = await db.UserEmailSettingsType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateUserEmailSettingsType[1].dataValues;
    }

    async deleteUserEmailSettingsType(id) {
        await db.UserEmailSettingsType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = UserEmailSettingsTypeService;
