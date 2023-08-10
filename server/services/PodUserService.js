const uuid = require('uuid').v4;
const db = require('../models');

class PodUserService {
    constructor(log) {
        this.log = log;
    }

    // GetByPodId
    async getAllByPodId(podId) {
        const podUsers = await db.PodUser.findAll({
            where: { PodId: podId },
        });

        return podUsers;
    }

    // GetByUserId
    async getAllByUserId(userId) {
        const podUsers = await db.PodUser.findAll({
            where: { UserId: userId },
        });

        return podUsers;
    }

    // GetById
    async getById(id) {
        const podUser = await db.PodUser.findByPk(id);

        return podUser;
    }

    async createPodUser(body) {
        const values = {
            Id: uuid(),
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            PodId: body.PodId,
            UserId: body.UserId,
        };
        const newPodUser = await db.PodUser.create(values);
        await newPodUser.setDataValue('CreatedById', body.UserId);
        await newPodUser.setDataValue('ModifiedById', body.UserId);
        await newPodUser.save();

        return newPodUser;
    }

    async updatePodUser(id, body) {
        const podUser = await db.PodUser.findByPk(id);
        let podId;
        let userId;

        if (body.PodId) {
            podId = body.PodId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            CreatedAt: podUser.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: podUser.CreatedById,
            ModifiedById: userId,
            PodId: podId,
            UserId: userId,
        };
        const updatePodUser = await db.PodUser.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updatePodUser[1].dataValues;
    }

    async deletePodUser(id) {
        await db.PodUser.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = PodUserService;
