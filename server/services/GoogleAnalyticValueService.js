const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const Helpers = require('../lib/Helpers');
const UserResolverService = require('../lib/UserResolverService');

const userResolver = new UserResolverService();

const helpers = new Helpers();
const date30DaysAgo = helpers.dateLessFromToday(30);

class GoogleAnalyticValueService {
    constructor(log) {
        this.log = log;
    }

    // GetByRange
    async getAllByRange(tenantId, googleAnalyticTypeId, projectId, from, to) {
        if (to === null) to = from;

        const googleAnalyticValues = await db.GoogleAnalyticValue.findAll({
            where: {
                TenantId: tenantId,
                GoogleAnalyticTypeId: googleAnalyticTypeId,
                ProjectId: projectId,
                Created: { [Op.between]: [from, to] },
            },
            order: [['Created', 'ASC']],
        });

        return googleAnalyticValues;
    }

    // GetOrganicLast30Days
    async getAllOrganicLast30Days(projectId) {
        const googleAnalyticValues = await db.GoogleAnalyticValue.findAll({
            where: {
                GoogleAnalyticTypeId: 1, // EQUAL TO Organic
                ProjectId: projectId,
                Created: { [Op.gte]: date30DaysAgo },
            },
        });

        return googleAnalyticValues;
    }

    // GetECommerceLast30Days
    async getAlleCommerceLast30Days(projectId) {
        const googleAnalyticValues = await db.GoogleAnalyticValue.findAll({
            where: {
                GoogleAnalyticTypeId: 2, // EQUAL TO eCommerce
                ProjectId: projectId,
                Created: { [Op.gte]: date30DaysAgo },
            },
        });

        return googleAnalyticValues;
    }

    // GetGoalCompletionsLast30Days
    async getAllGoalCompletionsLast30Days(projectId) {
        const googleAnalyticValues = await db.GoogleAnalyticValue.findAll({
            where: {
                GoogleAnalyticTypeId: 3, // EQUAL TO Goal
                ProjectId: projectId,
                Created: { [Op.gte]: date30DaysAgo },
            },
        });

        return googleAnalyticValues;
    }

    // GetById
    async getById(id) {
        const googleAnalyticValue = await db.GoogleAnalyticValue.findByPk(id);

        return googleAnalyticValue;
    }

    // FirstProcessDate
    async getFirstProcessDate(tenantId, googleAnalyticTypeId, projectId) {
        const googleAnalyticValue = await db.GoogleAnalyticValue.findOne({
            where: {
                TenantId: tenantId,
                GoogleAnalyticTypeId: googleAnalyticTypeId,
                ProjectId: projectId,
            },
            order: [['Created', 'ASC']],
        });

        if (!googleAnalyticValue) return null;

        return googleAnalyticValue.Created;
    }

    // LastProcessDate
    async getLastProcessDate(tenantId, googleAnalyticTypeId, projectId) {
        const googleAnalyticValue = await db.GoogleAnalyticValue.findOne({
            where: {
                TenantId: tenantId,
                GoogleAnalyticTypeId: googleAnalyticTypeId,
                ProjectId: projectId,
            },
            order: [['Created', 'DESC']],
        });

        if (!googleAnalyticValue) return null;

        return googleAnalyticValue.Created;
    }

    async createGoogleAnalyticValue(body) {
        const values = {
            Id: uuid(),
            TenantId: body.TenantId,
            Data: body.Data,
            Created: body.Created,
            Filter: body.Filter,
            GoogleAnalyticTypeId: body.GoogleAnalyticTypeId,
            // ProjectId: body.ProjectId ? body.ProjectId : '00000000-0000-0000-0000-000000000000'
            ProjectId: body.ProjectId,
        };
        const newGoogleAnalyticValue = await db.GoogleAnalyticValue.create(values);

        return newGoogleAnalyticValue;
    }

    async updateGoogleAnalyticValue(id, body) {
        const googleAnalyticValue = await db.GoogleAnalyticValue.findByPk(id);
        let googleAnalyticTypeId;

        if (body.GoogleAnalyticTypeId) {
            googleAnalyticTypeId = body.GoogleAnalyticTypeId;
        }

        const values = {
            // Not defined as a Foreign Key
            TenantId: body.TenantId ? body.TenantId : googleAnalyticValue.TenantId,
            Data: body.Data ? body.Data : googleAnalyticValue.Data,
            Filter: body.Filter ? body.Filter : googleAnalyticValue.Filter,
            GoogleAnalyticTypeId: googleAnalyticTypeId,
            ProjectId: body.ProjectId ? body.ProjectId : googleAnalyticValue.ProjectId,
            Created: googleAnalyticValue.Created,
        };
        const updateGoogleAnalyticValue = await db.GoogleAnalyticValue.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateGoogleAnalyticValue[1].dataValues;
    }

    async deleteGoogleAnalyticValue(id) {
        await db.GoogleAnalyticValue.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM
    async processPagePathData(from, to, googleAnalyticTypeId, projectId, pagePath = null) {
        const res = [];

        const gaTypeIds = [1, 2, 3];
        if (!gaTypeIds.includes(googleAnalyticTypeId)) return false;

        const tenantId = await userResolver.getTenantId();

        const googleAnalyticValues = await this.getAllByRange(
            tenantId, googleAnalyticTypeId, projectId, from, to,
        );
        if (googleAnalyticValues.length > 0) {
            // Re-arrange data for better readability
            googleAnalyticValues.forEach((gaValue) => {
                const gaMetricsData = {
                    Id: gaValue.Id,
                    Created: gaValue.Created,
                    TenantId: gaValue.TenantId,
                    GoogleAnalyticTypeId: gaValue.GoogleAnalyticTypeId,
                    Filter: gaValue.Filter,
                    ProjectId: gaValue.ProjectId,
                    Data: gaValue.Data,
                };

                if (googleAnalyticTypeId === 1 || googleAnalyticTypeId === 2) {
                    const byPageData = gaValue.Data.ByPage;
                    if (pagePath) {
                        const pagePathData = byPageData.find((page) => page.pagePath === pagePath);
                        gaMetricsData.Data.ByPage = pagePathData;
                    }
                } else if (googleAnalyticTypeId === 3) {
                    const pageData = gaValue.Data;
                    const byPageData = [];
                    if (pagePath) {
                        pageData.forEach((page) => {
                            if (page.pagePath === pagePath) byPageData.push(page);
                        });
                        gaMetricsData.Data = { ByPage: byPageData };
                    }
                }
                res.push(gaMetricsData);
            });
        }

        return res;
    }
}

module.exports = GoogleAnalyticValueService;
