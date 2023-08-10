const uuid = require('uuid').v4;
const db = require('../models');

class TargetPageService {
    constructor(log) {
        this.log = log;
    }

    // GetForProject
    async getAllByProjectId(projectId) {
        const targetPages = await db.TargetPage.findAll({
            where: { ProjectId: projectId },
        });

        return targetPages;
    }

    // GetAllForProjectWithKeywords
    async getAllByProjectIdWithKeywords(projectId) {
        const targetPages = await db.TargetPage.findAll({
            where: { ProjectId: projectId },
            include: { model: await db.TargetKeyword },
        });

        return targetPages;
    }

    // GetForProjectByUrlWithKeywords
    async getByProjectIdAndUrlWithKeywords(projectId, url) {
        const targetPage = await db.TargetPage.findOne({
            where: {
                ProjectId: projectId,
                Url: url,
            },
            include: { model: await db.TargetKeyword },
        });

        return targetPage;
    }

    async createTargetPage(body) {
        const values = {
            Id: uuid(),
            Name: body.Name,
            Url: body.Url,
            ProjectId: body.ProjectId,
        };
        const newTargetPage = await db.TargetPage.create(values);

        return newTargetPage;
    }

    async updateTargetPage(id, body) {
        const targetPage = await db.targetPage.findByPk(id);
        let projectId;

        if (body.ProjectId) {
            projectId = body.ProjectId;
        }

        const values = {
            Name: body.Name ? body.Name : targetPage.Name,
            Url: body.Url ? body.Url : targetPage.Url,
            ProjectId: projectId,
        };
        const updateTargetPage = await db.TargetPage.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTargetPage[1].dataValues;
    }
}

module.exports = TargetPageService;
