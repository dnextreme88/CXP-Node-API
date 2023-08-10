const db = require('../models');

class GoalTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const goalTypes = await db.GoalType.findAll({
            order: [['Id', 'ASC']],
        });

        return goalTypes;
    }

    async getById(id) {
        const goalType = await db.GoalType.findByPk(id);

        return goalType;
    }

    async createGoalType(body) {
        const values = { Name: body.Name };
        const newGoalType = await db.GoalType.create(values);

        return newGoalType;
    }

    async updateGoalType(id, body) {
        const values = { Name: body.Name };
        const updateGoalType = await db.GoalType.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateGoalType[1].dataValues;
    }

    async deleteGoalType(id) {
        await db.GoalType.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = GoalTypeService;
