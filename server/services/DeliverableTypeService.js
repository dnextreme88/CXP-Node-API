const db = require('../models');

class DeliverableTypeService {
    constructor(log) {
        this.log = log;
    }

    async getAll() {
        const deliverableTypes = await db.DeliverableType.findAll({
            order: [['Id', 'ASC']],
        });

        return deliverableTypes;
    }
}

module.exports = DeliverableTypeService;
