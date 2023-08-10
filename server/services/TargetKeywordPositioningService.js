const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');

class TargetKeywordPositioningService {
    constructor(log) {
        this.log = log;
    }

    // GetForPeriod
    async getAllForPeriod(projectId, from, to) {
        const targetKeywordPositionings = await db.TargetKeywordPositioning.findAll({
            where: {
                ProjectId: projectId,
                Date: { [Op.between]: [from, to] },
            },
        });

        return targetKeywordPositionings;
    }

    // GetLastForKeyword
    async getByTargetKeywordIdLast(targetKeywordId) {
        const targetKeywordPositioning = await db.TargetKeywordPositioning.findOne({
            where: { TargetKeywordId: targetKeywordId },
            order: [['Date', 'DESC']],
        });

        return targetKeywordPositioning;
    }

    // GetFirstSyncDateForProject
    async getByProjectIdFirstSyncDate(projectId) {
        const firstSyncDate = await db.TargetKeywordPositioning.min('Date', {
            where: { ProjectId: projectId },
            order: [['Date', 'ASC']],
            group: ['Date'],
        });

        return firstSyncDate;
    }

    // GetLastSyncDateForProject
    async getByProjectIdLastSyncDate(projectId) {
        const lastSyncDate = await db.TargetKeywordPositioning.max('Date', {
            where: { ProjectId: projectId },
            order: [['Date', 'DESC']],
            group: ['Date'],
        });

        return lastSyncDate;
    }

    // GetSumForPeriod
    async getSumForPeriod(projectId, from, to) {
        const sumBetweenPeriod = await db.TargetKeywordPositioning.sum('Delta', {
            where: {
                ProjectId: projectId,
                Date: { [Op.between]: [from, to] },
            },
        });

        return sumBetweenPeriod;
    }

    async createTargetKeywordPositioning(body) {
        const values = {
            Id: uuid(),
            Date: body.Date,
            Position: body.Position,
            Delta: 0,
            TargetKeywordId: body.TargetKeywordId,
            // ProjectId: body.ProjectId ? body.ProjectId : '00000000-0000-0000-0000-000000000000'
            ProjectId: body.ProjectId,
        };
        const newTargetKeywordPositioning = await db.TargetKeywordPositioning.create(values);

        return newTargetKeywordPositioning;
    }
}

module.exports = TargetKeywordPositioningService;
