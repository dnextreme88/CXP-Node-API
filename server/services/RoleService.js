const db = require('../models');

class RoleService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const roles = await db.Role.findAll({
            include: { model: await db.UserType },
        });

        return roles;
    }

    // GetById
    async getById(id) {
        const role = await db.Role.findByPk(id);

        return role;
    }

    async createRole(body) {
        const values = {
            RoleName: body.RoleName,
            UserTypeId: body.UserTypeId,
        };
        const newRole = await db.Role.create(values);

        return newRole;
    }

    async updateRole(id, body) {
        const role = await db.Role.findByPk(id);
        let userTypeId;

        if (body.UserTypeId) {
            userTypeId = body.UserTypeId;
        }

        const values = {
            RoleName: body.RoleName ? body.RoleName : role.RoleName,
            UserTypeId: userTypeId,
        };
        const updateRole = await db.Role.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateRole[1].dataValues;
    }

    async deleteRole(id) {
        await db.Role.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = RoleService;
