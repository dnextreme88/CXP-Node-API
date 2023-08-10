const uuid = require('uuid').v4;
const db = require('../models');

class PodProjectService {
    constructor(log) {
        this.log = log;
    }

    // GetByPodId
    async getAllByPodId(podId) {
        const podProjects = await db.PodProject.findAll({
            where: { PodId: podId },
        });

        return podProjects;
    }

    // GetByProjectId
    async getAllByProjectId(projectId) {
        const podProjects = await db.PodProject.findAll({
            where: { ProjectId: projectId },
        });

        return podProjects;
    }

    // GetById
    async getById(id) {
        const podProject = await db.PodProject.findByPk(id);

        return podProject;
    }

    async createPodProject(body) {
        const values = {
            Id: uuid(),
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            PodId: body.PodId,
            ProjectId: body.ProjectId,
        };
        const newPodProject = await db.PodProject.create(values);
        await newPodProject.setDataValue('CreatedById', body.UserId);
        await newPodProject.setDataValue('ModifiedById', body.UserId);
        await newPodProject.save();

        return newPodProject;
    }

    async updatePodProject(id, body) {
        const podProject = await db.PodProject.findByPk(id);
        let podId;
        let projectId;
        let userId;

        if (body.PodId) {
            podId = body.PodId;
        }
        if (body.ProjectId) {
            projectId = body.ProjectId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            CreatedAt: podProject.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: podProject.CreatedById,
            ModifiedById: userId,
            PodId: podId,
            ProjectId: projectId,
        };
        const updatePodProject = await db.PodProject.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updatePodProject[1].dataValues;
    }

    async deletePodProject(id) {
        await db.PodProject.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = PodProjectService;
