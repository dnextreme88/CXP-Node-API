const uuid = require('uuid').v4;
const db = require('../models');

class UserRoleService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const userRoles = await db.UserRole.findAll({
            order: [['CreatedAt', 'ASC']],
        });

        return userRoles;
    }

    // GetByUserId
    async getAllByUserId(userId) {
        const userRoles = await db.UserRole.findAll({
            where: { UserId: userId },
            include: { model: await db.Role },
        });

        return userRoles;
    }

    // GetById
    async getById(id) {
        const userRole = await db.UserRole.findByPk(id);

        return userRole;
    }

    async createUserRole(body) {
        const values = {
            Id: uuid(),
            RoleId: body.RoleId,
            UserId: body.UserId,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CreatedById: body.UserId,
            ModifiedById: body.UserId,
        };
        const newUserRole = await db.UserRole.create(values);

        return newUserRole;
    }

    async bulkCreateUserRole(valuesArray) {
        const newValuesArray = [];
        let valuesObj = {};
        let newValuesObj = {};

        for (let i = 0; i < valuesArray.length; i++) {
            valuesObj = {
                ...valuesArray[i],
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                CreatedById: valuesArray[i].UserId,
                ModifiedById: valuesArray[i].UserId,
            };
            newValuesArray.push(valuesObj);
        }
        newValuesObj = newValuesArray;

        const newUserRoles = await db.UserRole.bulkCreate(newValuesObj, {
            validate: true,
            returning: true,
        });

        return newUserRoles;
    }

    async updateUserRole(id, body) {
        const userRole = await db.UserRole.findByPk(id);
        let roleId;
        let userId;

        if (body.RoleId) {
            roleId = body.RoleId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            RoleId: roleId,
            UserId: userId,
            CreatedAt: userRole.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: userRole.CreatedById,
            ModifiedById: userId,
        };
        const updateUserRole = await db.UserRole.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateUserRole[1].dataValues;
    }

    async deleteUserRole(id) {
        await db.UserRole.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    async bulkDeleteUserRole(idArray) {
        await db.UserRole.destroy({
            where: { Id: idArray },
        });

        return 'Successfully deleted multiple objects';
    }
}

module.exports = UserRoleService;
