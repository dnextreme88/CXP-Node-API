const db = require('../models');

class ProjectStatusService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const projectStatuses = await db.ProjectStatus.findAll({
            order: [['Id', 'ASC']],
        });

        return projectStatuses;
    }

    // GetById
    async getById(id) {
        const projectStatus = await db.ProjectStatus.findByPk(id);

        return projectStatus;
    }

    async createProjectStatus(body) {
        const values = { Name: body.Name };
        const newProjectStatus = await db.ProjectStatus.create(values);

        return newProjectStatus;
    }

    async updateProjectStatus(id, body) {
        const values = { Name: body.Name };
        const updateProjectStatus = await db.ProjectStatus.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateProjectStatus[1].dataValues;
    }

    async deleteProjectStatus(id) {
        await db.ProjectStatus.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = ProjectStatusService;
