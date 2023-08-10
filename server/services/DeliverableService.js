const uuid = require('uuid').v4;
const db = require('../models');

const hideAttributes = ['PasswordHash', 'PasswordSalt'];

class DeliverableService {
    constructor(log) {
        this.log = log;
    }

    // GetForProject
    async getAllByProjectId(projectId) {
        const deliverables = await db.Deliverable.findAll({
            where: { ProjectId: projectId },
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'CreatedBy',
                },
                {
                    model: await db.DeliverableType,
                },
            ],
        });

        return deliverables;
    }

    // GetById
    // TODO: To include bool isVictoriousUser param in function
    async getById(id, customerId) {
        const deliverable = await db.Deliverable.findOne({
            // Complex where clauses at the top-level
            where: {
                Id: id,
                '$Project.CustomerId$': customerId,
            },
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'CreatedBy',
                },
                { model: await db.DeliverableType },
                { model: await db.Project },
            ],
        });

        return deliverable;
    }

    // CUSTOM
    async getByAsanaGid(asanaGid) {
        const deliverable = await db.Deliverable.findOne({
            where: { AsanaGid: asanaGid },
            include: {
                model: await db.User,
                attributes: { exclude: hideAttributes },
                as: 'CreatedBy',
            },
        });

        return deliverable;
    }

    async createDeliverable(body) {
        const values = {
            Id: uuid(),
            AsanaGid: body.AsanaGid,
            Name: body.Name,
            Host: body.Host,
            PermanentUrl: body.PermanentUrl,
            ViewUrl: body.ViewUrl,
            CreatedAt: new Date(),
            CreatedById: body.CreatedById,
            TaskId: body.TaskId,
            ProjectId: body.ProjectId,
            DeliverableTypeId: body.DeliverableTypeId ? body.DeliverableTypeId : null,
        };
        const newDeliverable = await db.Deliverable.create(values);

        return newDeliverable;
    }
}

module.exports = DeliverableService;
