const uuid = require('uuid').v4;
const db = require('../models');

class PodService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAllByTenantId(tenantId) {
        const pods = await db.Pod.findAll({
            where: { TenantId: tenantId },
            order: [['CreatedAt', 'ASC']],
        });

        return pods;
    }

    // GetById
    async getById(id) {
        const pod = await db.Pod.findByPk(id);

        return pod;
    }

    async createPod(body) {
        const values = {
            Id: uuid(),
            Active: body.Active, // might be true = based on PodController.cs
            Name: body.Name,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            TenantId: body.TenantId,
        };
        const newPod = await db.Pod.create(values);
        await newPod.setDataValue('CreatedById', body.UserId);
        await newPod.setDataValue('ModifiedById', body.UserId);
        await newPod.save();

        return newPod;
    }

    async updatePod(id, body) {
        const pod = await db.Pod.findByPk(id);
        let active;

        if (body.Active || body.Active === false) {
            active = body.Active;
        }

        const values = {
            Active: active,
            Name: body.Name ? body.Name : pod.Name,
            CreatedAt: pod.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: pod.CreatedById,
            ModifiedById: pod.ModifiedById, // userId
            TenantId: pod.TenantId, // tenantId
        };
        const updatePod = await db.Pod.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updatePod[1].dataValues;
    }

    async deletePod(id) {
        await db.Pod.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = PodService;
