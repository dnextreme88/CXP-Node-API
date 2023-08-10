const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');

class TotalKeywordsRankedService {
    constructor(log) {
        this.log = log;
    }

    // GetForPeriod
    async getAllForPeriod(projectId, from, to) {
        const totalKeywordsRanked = await db.TotalKeywordsRanked.findAll({
            where: {
                ProjectId: projectId,
                TargetPageId: null,
                Date: { [Op.between]: [from, to] },
            },
        });

        return totalKeywordsRanked;
    }

    // GetFirstSyncDateForProject
    async getByProjectIdFirstSyncDate(projectId) {
        const firstSyncDate = await db.TotalKeywordsRanked.min('Date', {
            where: { ProjectId: projectId },
            group: ['Date'],
        });

        return firstSyncDate;
    }

    // GetLastSyncDateForProject
    async getByProjectIdLastSyncDate(projectId) {
        const lastSyncDate = await db.TotalKeywordsRanked.max('Date', {
            where: { ProjectId: projectId },
            order: [['Date', 'DESC']],
            group: ['Date'],
        });

        return lastSyncDate;
    }

    async createTotalKeywordsRanked(body) {
        const values = {
            Id: uuid(),
            Date: body.Date,
            Top3: body.Top3,
            Top10: body.Top10,
            Top100: body.Top100,
            Over100: body.Over100,
            TargetPageId: body.TargetPageId ? body.TargetPageId : null,
            ProjectId: body.ProjectId,
        };
        const newTotalKeywordsRanked = await db.TotalKeywordsRanked.create(values);

        return newTotalKeywordsRanked;
    }
}

module.exports = TotalKeywordsRankedService;
