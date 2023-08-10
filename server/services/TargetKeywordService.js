const uuid = require('uuid').v4;
const db = require('../models');

class TargetKeywordService {
    constructor(log) {
        this.log = log;
    }

    // Get
    async getAllByProjectId(projectId) {
        const metricsArray = [];
        let targetPageAndKeywordPositioningObj = {};
        let metricsObj = {};

        const targetKeywords = await db.TargetKeyword.findAll({
            where: { ProjectId: projectId },
            include: [
                // Keyword = TargetKeyword.Name
                // Page = TargetPage.Url
                { model: await db.TargetPage },
                // Position = TargetKeywordPositioning.Position
                { model: await db.TargetKeywordPositioning },
            ],
            order: [['Name', 'ASC']],
        });

        for (let i = 0; i < targetKeywords.length; i++) {
            targetPageAndKeywordPositioningObj = {
                Keyword: targetKeywords[i].Name,
                Page: targetKeywords[i].TargetPage.Url,
                Position: targetKeywords[i].TargetKeywordPositioning.Position,
            };

            metricsArray.push(targetPageAndKeywordPositioningObj);
        }
        metricsObj = metricsArray;

        return metricsObj;
    }

    // CUSTOM
    async getById(id) {
        const targetKeyword = await db.TargetKeyword.findByPk(id);

        return targetKeyword;
    }

    async createTargetKeyword(body) {
        const values = {
            Id: uuid(),
            Name: body.Name,
            TargetPageId: body.TargetPageId,
            ProjectId: body.ProjectId,
        };
        const newTargetKeyword = await db.TargetKeyword.create(values);

        return newTargetKeyword;
    }
}

module.exports = TargetKeywordService;
