const db = require('../models');

class AsanaDeliverableTypeService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const asanaDeliverableTypes = await db.AsanaDeliverableType.findAll({
            order: [['Id', 'ASC']],
        });

        return asanaDeliverableTypes;
    }

    // CUSTOM
    async getByName(name) {
        const asanaDeliverableType = await db.AsanaDeliverableType.findOne({
            where: { Name: name },
        });

        return asanaDeliverableType;
    }
}

module.exports = AsanaDeliverableTypeService;
