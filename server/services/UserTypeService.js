const db = require('../models');

class UserTypeService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const userTypes = await db.UserType.findAll({
            order: [['CreatedAt', 'ASC']],
        });

        return userTypes;
    }

    // GetById
    async getById(id) {
        const userType = await db.UserType.findByPk(id);

        return userType;
    }

    async createUserType(body) {
        const values = {
            Name: body.Name,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CreatedById: body.UserId,
            ModifiedById: body.UserId,
        };
        const newUserType = await db.UserType.create(values);

        return newUserType;
    }

    async updateUserType(id, body) {
        const userType = await db.UserType.findByPk(id);
        let userId;

        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Name: body.Name ? body.Name : userType.Name,
            CreatedAt: userType.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: userType.CreatedById,
            ModifiedById: userId,
        };
        const updateUserType = await db.UserType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateUserType[1].dataValues;
    }

    async deleteUserType(id) {
        await db.UserType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = UserTypeService;
