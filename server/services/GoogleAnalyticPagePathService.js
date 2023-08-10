const uuid = require('uuid').v4;
const db = require('../models');

class GoogleAnalyticPagePathService {
    constructor(log) {
        this.log = log;
    }

    // GetByProjectAndGaType
    async getAllByProjectIdAndGoogleAnalyticTypeId(projectId, googleAnalyticTypeId) {
        const googleAnalyticPagePaths = await db.GoogleAnalyticPagePath.findAll({
            where: {
                ProjectId: projectId,
                GoogleAnalyticTypeId: googleAnalyticTypeId,
            },
        });

        return googleAnalyticPagePaths;
    }

    // GetById
    async getById(id) {
        const googleAnalyticPagePath = await db.GoogleAnalyticPagePath.findByPk(id);

        return googleAnalyticPagePath;
    }

    async createGoogleAnalyticPagePath(body) {
        const values = {
            Id: uuid(),
            ProjectId: body.ProjectId,
            GoogleAnalyticTypeId: body.GoogleAnalyticTypeId,
            Path: body.Path,
            Created: body.Created ? body.Created : new Date(),
        };
        const newGoogleAnalyticPagePath = await db.GoogleAnalyticPagePath.create(values);

        return newGoogleAnalyticPagePath;
    }

    async updateGoogleAnalyticPagePath(id, body) {
        const googleAnalyticPagePath = await db.GoogleAnalyticPagePath.findByPk(id);

        const values = {
            // Not defined as a Foreign Key
            ProjectId: body.ProjectId ? body.ProjectId : googleAnalyticPagePath.ProjectId,
            GoogleAnalyticTypeId: body.GoogleAnalyticTypeId
                ? body.GoogleAnalyticTypeId : googleAnalyticPagePath.GoogleAnalyticTypeId,
            Path: body.Path ? body.Path : googleAnalyticPagePath.Path,
            Created: googleAnalyticPagePath.Created,
        };
        const updateGoogleAnalyticPagePath = await db.GoogleAnalyticPagePath.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateGoogleAnalyticPagePath[1].dataValues;
    }

    async deleteGoogleAnalyticPagePath(id) {
        await db.GoogleAnalyticPagePath.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM
    async getByGaTypeIdAndPath(googleAnalyticTypeId, path) { // used in cronjobs
        const googleAnalyticPagePath = await db.GoogleAnalyticPagePath.findOne({
            where: {
                GoogleAnalyticTypeId: googleAnalyticTypeId,
                Path: path,
            },
        });

        return googleAnalyticPagePath;
    }
}

module.exports = GoogleAnalyticPagePathService;
