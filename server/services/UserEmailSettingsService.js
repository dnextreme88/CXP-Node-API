const db = require('../models');

class UserEmailSettingsService {
    constructor(log) {
        this.log = log;
    }

    // GetByTypeForUser
    async getByUserEmailSettingsTypeIdAndUserId(userEmailSettingsTypeId, userId) {
        const userEmailSetting = await db.UserEmailSettings.findOne({
            where: {
                UserEmailSettingsTypeId: userEmailSettingsTypeId,
                UserId: userId,
            },
        });

        return userEmailSetting;
    }

    async updateUserEmailSettings(id, body) {
        let value;
        let userEmailSettingsTypeId;
        let userId;

        if (body.Value || body.Value === false) {
            value = body.Value;
        }
        if (body.UserEmailSettingsTypeId) {
            userEmailSettingsTypeId = body.UserEmailSettingsTypeId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Value: value,
            UserEmailSettingsTypeId: userEmailSettingsTypeId,
            UserId: userId,
        };
        const updateUserEmailSettings = await db.UserEmailSettings.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateUserEmailSettings[1].dataValues;
    }
}

module.exports = UserEmailSettingsService;
